/**
 * TypeScript Game Development System
 * サウンド制御（BGM、効果音、可視性）
 */

import type { GameContext } from "./types";
import { log } from "./utils";

/**
 * スマートフォン用サウンド読み込み
 * ユーザーインタラクション時に呼び出す必要がある
 */
export const loadSoundSmartPhone = (ctx: GameContext): void => {
  for (let i = 0; i < ctx.sound.soundLoaded; i++) {
    try {
      ctx.sound.soundFiles[i] = new Audio(ctx.sound.soundFileNames[i]);
      ctx.sound.soundFiles[i].load();
    } catch (_e) {
      // サウンド読み込みエラーは無視
    }
  }
  ctx.sound.initialized = 2; // スマホでサウンドを読み込んだ
};

/**
 * サウンドファイルを登録
 */
export const loadSound = (ctx: GameContext, n: number, filename: string): void => {
  ctx.sound.soundFileNames[n] = filename;
  ctx.sound.soundLoaded++;
};

/**
 * 効果音を再生
 */
export const playSE = (ctx: GameContext, n: number): void => {
  if (!ctx.config.soundOn) return;
  if (ctx.sound.isBgm === 2) return; // BGM再出力待ち中は再生しない

  if (ctx.sound.waitSe === 0) {
    ctx.sound.seNo = n;
    ctx.sound.soundFiles[n].currentTime = 0;
    ctx.sound.soundFiles[n].loop = false;
    ctx.sound.soundFiles[n].play();
    ctx.sound.waitSe = 3; // ブラウザに負荷をかけないため連続して流さない
  }
};

/**
 * BGMを再生
 */
export const playBgm = (ctx: GameContext, n: number): void => {
  if (!ctx.config.soundOn) return;

  log(`BGM${n}出力`);
  ctx.sound.bgmNo = n;
  ctx.sound.soundFiles[n].loop = true;
  ctx.sound.soundFiles[n].play();
  ctx.sound.isBgm = 1; // BGM流れている
};

/**
 * BGMを一時停止
 */
export const pauseBgm = (ctx: GameContext): void => {
  ctx.sound.soundFiles[ctx.sound.bgmNo].pause();
  ctx.sound.isBgm = 0; // BGM停止している
};

/**
 * BGMを停止（先頭に戻す）
 */
export const stopBgm = (ctx: GameContext): void => {
  ctx.sound.soundFiles[ctx.sound.bgmNo].pause();
  ctx.sound.soundFiles[ctx.sound.bgmNo].currentTime = 0;
  ctx.sound.isBgm = 0; // BGM停止している
};

/**
 * BGMの再生速度を設定
 */
export const setPlaybackRate = (ctx: GameContext, rate: number): void => {
  ctx.sound.soundFiles[ctx.sound.bgmNo].playbackRate = rate;
};

/**
 * SE待機カウンターを減少
 */
export const updateSoundWait = (ctx: GameContext): void => {
  if (ctx.sound.waitSe > 0) {
    ctx.sound.waitSe--;
  }
};

/**
 * ブラウザの表示状態変更時の処理を設定
 */
export const setupVisibilityHandler = (ctx: GameContext): void => {
  document.addEventListener("visibilitychange", () => {
    log("visibilitychange");

    if (document.visibilityState === "hidden") {
      ctx.mainLoop.stopFlg = true;

      if (ctx.sound.isBgm === 1) {
        pauseBgm(ctx);
        ctx.sound.isBgm = 2; // BGM再出力待ち
      }
    } else if (document.visibilityState === "visible") {
      ctx.mainLoop.stopFlg = false;

      if (ctx.sound.isBgm === 2) {
        playBgm(ctx, ctx.sound.bgmNo);
      }
    }
  });
};

/**
 * サウンドのオン/オフを設定
 */
export const setSoundEnabled = (ctx: GameContext, enabled: boolean): void => {
  ctx.config.soundOn = enabled;
};

/**
 * サウンドが有効かどうかを取得
 */
export const isSoundEnabled = (ctx: GameContext): boolean => {
  return ctx.config.soundOn;
};
