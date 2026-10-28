import { DatasetState } from '@/settings/constant';
import { Howl, Howler } from 'howler';
import { MP3List } from './config';
import { SoundName } from './type';

/** Howler 全域物件上未列入型別定義、但恢復音訊時需要的內部成員 */
type HowlerInternal = {
  ctx?: AudioContext;
  /** Howler 內部狀態機：'suspended' | 'suspending' | 'running' */
  state?: string;
};

const howlerInternal = (): HowlerInternal => Howler as unknown as HowlerInternal;

/** 回前景後若 AudioContext 仍未 running，改等使用者手勢的等待時間（ms） */
const RESUME_FALLBACK_DELAY = 500;

/** 可用來解鎖 AudioContext 的使用者手勢事件 */
const GESTURE_EVENTS = ['touchend', 'mousedown', 'click', 'keydown'] as const;

/**
 * 判定音軌「其實已經死了」的播放位置容差（秒）。
 * iOS 中斷後 source node 失效，但 Howler 的 _paused 仍是 false、playing() 仍回傳 true，
 * 唯一可靠的跡象是播放位置完全沒有前進。
 */
const STALLED_SEEK_TOLERANCE = 0.05;

type SoundTrackProps = {
  baseURI?: string;
  onload?: (type: PreloadType) => void;
  onError?: (message: string) => void;
};

export type PreloadType = 'onStart';

/**
 * Howler.js 音效管理類別。
 * 初始化時預載 bgm 與按鈕音效，進入旅程場景時依場景名稱切換對應的背景音樂。
 * 支援 play / pause / mute 操作。
 */

export default class Sounds {
  public track: Record<
    SoundName,
    { src: string[]; loop: boolean; onload: boolean; track: Howl | null; preloadType: PreloadType }
  > = {
    bgm: {
      src: [MP3List.bgm],
      loop: true,
      onload: false,
      track: null,
      preloadType: 'onStart',
    },
    click: {
      src: [MP3List.click],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onStart',
    },
    correct: {
      src: [MP3List.correct],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onStart',
    },
    wrong: {
      src: [MP3List.wrong],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onStart',
    },
    levelUp: {
      src: [MP3List.levelUp],
      loop: false,
      onload: false,
      track: null,
      preloadType: 'onStart',
    },
  };

  private onload: (type: PreloadType) => void;
  private onError: (message: string) => void;
  private isMuted = false;

  /** 目前應該持續播放的循環音軌，App 切回前景時據此恢復 */
  private currentLoop: SoundName | null = null;

  /** 是否已掛上等待使用者手勢的解鎖監聽，避免重複註冊 */
  private isGestureArmed = false;

  /** 切到背景當下循環音軌的播放位置（秒），回前景時用來判斷音軌是否已失效並接續播放 */
  private loopSeekAtHide: number | null = null;

  /** AudioContext 已確定救不回來，等使用者下一個手勢就整組重建 */
  private pendingRebuild = false;

  constructor(props: SoundTrackProps) {
    this.onload = props.onload || (() => {});
    this.onError = props.onError || (() => {});
    this.init(props.baseURI);
    this.preload('onStart');
    this.bindLifecycle();
  }

  /**
   * 監聽回到前景的時機。
   * 瀏覽器在 App 切走時會把 AudioContext 打成 suspended（iOS 為 interrupted），
   * 而 Howler 只在 play() 與首次手勢解鎖時才會 _autoResume()，本身不監聽 visibilitychange，
   * 因此必須由這裡負責喚醒，否則循環播放的背景音樂切回來就再也不會響。
   */
  private bindLifecycle(): void {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    window.addEventListener('pagehide', this.handleBackground);
    window.addEventListener('pageshow', this.handleForeground);
    window.addEventListener('focus', this.handleForeground);
  }

  private handleVisibilityChange = (): void => {
    if (document.visibilityState === 'visible') this.resume();
    else this.snapshotLoop();
  };

  private handleForeground = (): void => {
    if (document.visibilityState !== 'visible') return;
    this.resume();
  };

  private handleBackground = (): void => {
    this.snapshotLoop();
  };

  /** 取得目前循環音軌的 Howl 實例 */
  private getLoopTrack(): Howl | null {
    const name = this.currentLoop;
    if (!name) return null;

    const trackInfo = this.track[name];
    if (!trackInfo || !trackInfo.onload || !trackInfo.track) return null;

    return trackInfo.track;
  }

  /** 記下切到背景當下的播放位置，回前景時用來比對音軌是否還活著 */
  private snapshotLoop(): void {
    const track = this.getLoopTrack();
    if (!track) {
      this.loopSeekAtHide = null;
      return;
    }

    const seek = track.seek();
    this.loopSeekAtHide = typeof seek === 'number' ? seek : null;
  }

  /** 從指定位置重新播放循環音軌；stop 會把 seek 歸零，所以順序必須是 stop → seek → play */
  private replayLoopFrom(track: Howl, position: number | null): void {
    track.stop();
    if (position !== null && position > 0) track.seek(position);
    track.play();
  }

  /**
   * 恢復目前的循環音軌。
   * 不能只看 track.playing()：iOS 中斷後 source node 已失效，但 Howler 仍認定在播放，
   * 這時 Safari 網址列還會顯示音訊 icon 卻完全沒有聲音。
   * 因此改以「播放位置有沒有從切到背景時前進」來判斷音軌是否真的還活著。
   */
  private restoreLoop(): void {
    const track = this.getLoopTrack();
    if (!track) return;

    const previous = this.loopSeekAtHide;
    const current = track.seek();

    if (!track.playing()) {
      this.replayLoopFrom(track, previous);
      this.loopSeekAtHide = null;
      return;
    }

    // 沒有比對基準就不動它，以免把正常播放中的音軌打斷
    if (previous === null) return;

    const isStalled =
      typeof current !== 'number' || Math.abs(current - previous) < STALLED_SEEK_TOLERANCE;

    if (isStalled) this.replayLoopFrom(track, previous);
    this.loopSeekAtHide = null;
  }

  /** AudioContext 無法自行恢復時（iOS 常見），改掛一次性監聽等使用者的下一個手勢 */
  private armGestureResume(): void {
    if (this.isGestureArmed) return;
    this.isGestureArmed = true;

    const unlock = (): void => {
      GESTURE_EVENTS.forEach((event) => document.removeEventListener(event, unlock, true));
      this.isGestureArmed = false;

      if (this.pendingRebuild) {
        this.pendingRebuild = false;
        this.rebuildAudio();
        return;
      }

      this.resume();
    };

    GESTURE_EVENTS.forEach((event) => document.addEventListener(event, unlock, true));
  }

  /** 建立單一音軌的 Howl，不觸發外部傳入的 onload callback（重建流程專用） */
  private createTrack(name: SoundName, onLoaded?: () => void): void {
    const trackInfo = this.track[name];

    trackInfo.track = new Howl({
      src: trackInfo.src,
      loop: trackInfo.loop,
      onload: () => {
        trackInfo.onload = true;
        if (this.isMuted) trackInfo.track?.mute(true);
        onLoaded?.();
      },
      onloaderror: () => this.onError(`音軌 ${name} 重新載入失敗`),
    });
  }

  /**
   * 重建整組音訊。
   *
   * iOS 切換 App 後 AudioContext 的音訊裝置會起不來，此時 ctx.resume() 會以
   * InvalidStateError（Failed to start the audio device）失敗，該 context 已無法復原。
   * Howler.unload() 會 close 舊的 ctx 並建立全新的一個，同時卸載所有 Howl，
   * 所以只能整組重建再把循環音軌接回原本的位置。
   *
   * 新的 AudioContext 在 iOS 上需要使用者手勢才能啟動，因此這個方法只在手勢事件中被呼叫。
   */
  private rebuildAudio(): void {
    const loopName = this.currentLoop;
    const position = this.loopSeekAtHide;
    const loadedNames = (Object.keys(this.track) as SoundName[]).filter(
      (name) => this.track[name].onload,
    );

    Howler.unload();

    Object.values(this.track).forEach((trackInfo) => {
      trackInfo.track = null;
      trackInfo.onload = false;
    });

    // 音檔載入是非同步的，等到 onload 時早已離開手勢的呼叫堆疊，
    // 屆時 play() 內部的 _autoResume() 又會是一次沒接住的 ctx.resume()。
    // 所以趁還在手勢裡，先把新的 context 叫起來。
    const freshCtx = howlerInternal().ctx;
    if (freshCtx && freshCtx.state !== 'running') {
      freshCtx.resume().catch(() => this.onError('新的 AudioContext 啟動失敗'));
    }

    loadedNames.forEach((name) => {
      const isLoopTrack = name === loopName;

      this.createTrack(name, () => {
        if (!isLoopTrack) return;

        const track = this.track[name].track;
        if (!track) return;

        this.replayLoopFrom(track, position);
        this.loopSeekAtHide = null;
      });
    });
  }

  /**
   * 喚醒 Howler 的 AudioContext 並接回循環音軌。
   * 注意必須操作 Howler.ctx，自行 new 一個 AudioContext 來 resume 是無效的。
   */
  public resume(): void {
    // 沒有循環音軌在播就不必搶著喚醒；單次音效由 Howler 的 play() 自行 _autoResume
    if (!this.currentLoop) return;

    const howler = howlerInternal();
    const ctx = howler.ctx;

    if (!ctx) {
      this.restoreLoop();
      return;
    }

    if (ctx.state === 'running') {
      this.restoreLoop();
      return;
    }

    // 不呼叫 Howler 的 _autoResume()：它內部的 ctx.resume() 沒有 rejection handler，
    // 在 iOS 上會直接炸成 Unhandled Promise Rejection，這裡自己接。
    ctx.resume().then(
      () => {
        howler.state = 'running';
        this.restoreLoop();
      },
      () => {
        // InvalidStateError: Failed to start the audio device
        // → 音訊裝置起不來，這個 context 已經死了，只能整組重建
        this.pendingRebuild = true;
        this.armGestureResume();
      },
    );

    // iOS 上 resume() 有時既不 resolve 也不 reject，補一道保險
    window.setTimeout(() => {
      if (this.pendingRebuild || this.isGestureArmed) return;

      if (ctx.state === 'running') this.restoreLoop();
      else this.armGestureResume();
    }, RESUME_FALLBACK_DELAY);
  }

  /** 卸載所有音軌並移除生命週期監聽 */
  public destroy(): void {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('pagehide', this.handleBackground);
    window.removeEventListener('pageshow', this.handleForeground);
    window.removeEventListener('focus', this.handleForeground);

    this.currentLoop = null;
    this.loopSeekAtHide = null;
    Object.values(this.track).forEach((trackInfo) => {
      trackInfo.track?.unload();
      trackInfo.track = null;
      trackInfo.onload = false;
    });
  }

  init(baseURI?: string) {
    Object.entries(this.track).forEach(([key, trackInfo]) => {
      this.track[key as SoundName].src = trackInfo.src.map(
        (src) => `${baseURI || DatasetState.dataset.baseUri}${src}`,
      );
    });
  }

  private recreateTrack(name: SoundName): void {
    const trackInfo = this.track[name];
    if (!trackInfo) return;

    // 停止並清理舊的音軌
    if (trackInfo.track) {
      try {
        trackInfo.track.stop();
        trackInfo.track.unload();
      } catch {
        this.onError(`清理音軌 ${name} 失敗`);
      }
    }

    // 創建新的音軌
    trackInfo.track = new Howl({
      src: trackInfo.src,
      loop: trackInfo.loop,
      // html5: false, // 在移動設備上，Web Audio API 通常更穩定
      preload: true,
      onload: () => {
        trackInfo.onload = true;
      },
      onloaderror: () => {
        this.onError(`音軌 ${name} 重新載入失敗`);
      },
    });
  }

  preload(type: PreloadType, onload?: (type: PreloadType) => void) {
    this.onload = onload || this.onload;

    const isLoadedBefore = Object.values(this.track)
      .filter((value) => value.preloadType === type)
      .every((value) => value.onload);

    if (isLoadedBefore) {
      this.checkIsLoaded(type);
      return;
    }

    Object.entries(this.track)
      .filter((track) => track[1].preloadType === type)
      .forEach(([key, value]) => {
        this.track[key as SoundName].track = new Howl({
          src: value.src,
          loop: value.loop,
          onload: () => {
            value.onload = true;
            this.checkIsLoaded(type);
            if (this.isMuted) this.track[key as SoundName].track?.mute(true);
          },
        });
      });
  }

  checkIsLoaded(type: PreloadType) {
    const isOnStartLoaded = Object.values(this.track)
      .filter((value) => value.preloadType === type)
      .every((value) => value.onload);
    if (isOnStartLoaded) {
      this.onload(type);
    }
  }

  preloadByName(name: string[], preload: PreloadType, onload?: (type: PreloadType) => void) {
    this.onload = onload || this.onload;
    name.forEach((n) => {
      const soundName = n as SoundName;
      if (this.track[soundName] && !this.track[soundName].onload) {
        this.track[soundName].track = new Howl({
          src: this.track[soundName].src,
          loop: this.track[soundName].loop,
          html5: true,
          onload: () => {
            this.track[soundName].onload = true;
            if (onload) onload(preload);
            if (this.isMuted) this.track[soundName].track?.mute(true);
          },
          onloaderror: () => {
            this.onError(`音軌 ${n} 重新載入失敗`);
          },
        });
      }
    });
  }

  play(name: SoundName, volume = 1, canPlayTwice = true) {
    const trackInfo = this.track[name];

    if (!trackInfo || !trackInfo.onload || !trackInfo.track) {
      this.onError(`音頻 ${name} 尚未載入或不存在`);
      return;
    }

    const track = trackInfo.track;

    if (!canPlayTwice && track.playing()) {
      this.onError(`該語音已在播放中，無法重複播放`);
      return;
    }

    try {
      // 設定音量並播放
      track.volume(volume);
      track.play();
      if (trackInfo.loop) this.currentLoop = name;
    } catch {
      this.onError(`播放 ${name} 失敗，嘗試重新創建`);
      // 如果播放失敗，嘗試重新創建音軌
      this.recreateTrack(name as SoundName);

      // 重新嘗試播放
      setTimeout(() => {
        if (this.track[name].track) {
          try {
            this.track[name].track!.volume(volume);
            this.track[name].track!.play();
            if (this.track[name].loop) this.currentLoop = name;
          } catch (retryError) {
            this.onError(`重試播放 ${name} 也失敗: ${retryError}`);
          }
        }
      }, 100);
    }
  }

  stop(name: SoundName) {
    // alert(`${this.track[name]}, ${this.track[name]?.track}, ${this.track[name].onload}`);
    if (this.currentLoop === name) {
      this.currentLoop = null;
      this.loopSeekAtHide = null;
    }
    if (this.track[name] && this.track[name].onload && this.track[name].track) {
      this.track[name].track!.stop();
    }
  }

  stopAll() {
    this.currentLoop = null;
    this.loopSeekAtHide = null;
    Object.values(this.track).forEach((trackInfo) => {
      if (trackInfo.onload && trackInfo.track) {
        trackInfo.track.stop();
      }
    });
  }

  fadeOut(name: SoundName, duration = 1000) {
    if (this.currentLoop === name) {
      this.currentLoop = null;
      this.loopSeekAtHide = null;
    }
    if (this.track[name] && this.track[name].onload && this.track[name].track) {
      const track = this.track[name].track!;
      const currentVolume = track.volume();
      track.fade(currentVolume, 0, duration);
      setTimeout(() => {
        track.stop();
        track.volume(currentVolume); // 恢復原始音量以便下次播放
      }, duration);
    }
  }

  public checkIsMuted() {
    return this.isMuted;
  }

  public mute() {
    this.isMuted = true;
    Object.values(this.track).forEach((trackInfo) => {
      if (trackInfo.onload && trackInfo.track) {
        trackInfo.track.mute(true);
      }
    });
  }

  public unmute() {
    this.isMuted = false;
    Object.values(this.track).forEach((trackInfo) => {
      if (trackInfo.onload && trackInfo.track) {
        trackInfo.track.mute(false);
      }
    });
  }

  /** 音訊狀態快照，供除錯「有音訊 icon 卻沒聲音」這類問題時檢視 */
  public checkAudioStatus(): {
    available: boolean;
    context: string;
    currentLoop: SoundName | null;
    playing: boolean;
    seek: number | null;
    seekAtHide: number | null;
  } {
    const ctx = (Howler as unknown as HowlerInternal).ctx;
    const track = this.getLoopTrack();
    const seek = track?.seek();

    return {
      available: !document.hidden && ctx?.state === 'running',
      context: ctx?.state || 'unknown',
      currentLoop: this.currentLoop,
      playing: track?.playing() ?? false,
      seek: typeof seek === 'number' ? seek : null,
      seekAtHide: this.loopSeekAtHide,
    };
  }
}
