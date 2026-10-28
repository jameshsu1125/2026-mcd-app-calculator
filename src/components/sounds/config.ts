import click from './mp3/mp3-click.mp3';
import correct from './mp3/mp3-correct.mp3';
import levelUp from './mp3/mp3-levelUp.mp3';
import success from './mp3/mp3-success.mp3';
import wrong from './mp3/mp3-wrong.mp3';
import hungry from './mp3/mp3-hungry.mp3';
import bird from './mp3/mp3-bird.mp3';
import script from './mp3/mp3-script.mp3';

/**
 * 所有音效設定。
 * src 由 Vite 依 VITE_IMAGE_SOURCE 決定：local 為打包後的本機路徑，cdn 為 Bunny CDN 網址。
 * 新增音效時：把 mp3 放進 ./mp3，在這裡 import 並加一筆即可，SoundName 會自動帶出。
 */
export const SoundList = {
  click: { src: click, loop: false },
  correct: { src: correct, loop: false },
  wrong: { src: wrong, loop: false },
  levelUp: { src: levelUp, loop: false },
  success: { src: success, loop: false },
  hungry: { src: hungry, loop: false },
  bird: { src: bird, loop: false },
  script: { src: script, loop: false },
} satisfies Record<string, { src: string; loop: boolean }>;
