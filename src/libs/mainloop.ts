/**
 * TypeScript Game Development System
 * メインループと初期化
 */

import { handleResize, initCanvas } from "./canvas";
import { fill, fText, fTextN, lineW } from "./graphics";
import { clearKey, setupInputListeners } from "./input";
import { setupVisibilityHandler, updateSoundWait } from "./sound";
import { testLocalStorage } from "./storage";
import type { GameContext } from "./types";
import { DeviceType } from "./types";
import { int } from "./utils";

/**
 * 日時情報
 */
export interface DateInfo {
  year: number;
  month: number;
  date: number;
  day: number;
  hour: number;
  min: number;
  sec: number;
}

/**
 * 現在の日時を取得
 */
export const getDate = (): DateInfo => {
  const d = new Date();
  return {
    year: d.getFullYear(),
    month: d.getMonth(), // 1月は0
    date: d.getDate(),
    day: d.getDay(), // 日曜は0
    hour: d.getHours(),
    min: d.getMinutes(),
    sec: d.getSeconds(),
  };
};

/**
 * ローカルストレージ警告画面を描画
 */
const drawStorageWarning = (ctx: GameContext): void => {
  const x = int(ctx.config.width / 2);
  const y = int(ctx.config.height / 6);
  const fs = int(ctx.config.height / 16);

  fill(ctx, "black");
  fText(ctx, "※セーブデータが保存されません※", x, y / 2, fs, "yellow");
  fTextN(
    ctx,
    "iOS端末をお使いの場合は\nSafariのプライベートブラウズ\nをオフにして起動して下さい。",
    x,
    y * 2,
    y,
    fs,
    "yellow"
  );
  fTextN(
    ctx,
    "その他の機種（ブラウザ）では\nローカルストレージへの保存を\n許可する設定にして下さい。",
    x,
    y * 4,
    y,
    fs,
    "yellow"
  );
  fText(ctx, "このまま続けるには画面をタップ", x, y * 5.5, fs, "lime");
};

/**
 * デバッグ情報を描画
 */
const drawDebugInfo = (ctx: GameContext, processTime: number): void => {
  const x = 240;

  fText(ctx, `処理時間=${processTime}`, x, 50, 16, "lime");
  fText(ctx, `deviceType=${ctx.deviceType}`, x, 100, 16, "yellow");
  fText(ctx, `isBgm=${ctx.sound.isBgm}(${ctx.sound.bgmNo})`, x, 150, 16, "yellow");
  fText(
    ctx,
    `winW=${ctx.window.winW} winH=${ctx.window.winH} SCALE=${ctx.scale}`,
    x,
    200,
    16,
    "yellow"
  );
  fText(
    ctx,
    `${ctx.mainLoop.idx}:${ctx.mainLoop.tmr}(${ctx.input.tapX},${ctx.input.tapY})${ctx.input.tapC}`,
    x,
    250,
    16,
    "cyan"
  );
  fText(ctx, `加速度 ${ctx.input.acX} : ${ctx.input.acY} : ${ctx.input.acZ}`, x, 300, 16, "pink");

  // キー状態表示
  for (let i = 0; i < 256; i++) {
    const kx = i % 16;
    const ky = int(i / 16);
    fText(ctx, String(ctx.input.key[i]), 15 + 30 * kx, 15 + 30 * ky, 12, "white");
  }
};

/**
 * メインループ処理
 */
const sysMain = (ctx: GameContext): void => {
  const startTime = Date.now();

  // ウィンドウサイズ変更チェック
  handleResize(ctx);
  lineW(ctx, ctx.lineWidth);

  ctx.mainLoop.tmr++;

  switch (ctx.mainLoop.idx) {
    case 0: // 初期化
      if (ctx.setup) {
        ctx.setup(ctx);
      }
      clearKey(ctx);
      ctx.mainLoop.idx = 2;

      // ローカルストレージのチェック
      if (ctx.config.checkLocalStorage && !testLocalStorage()) {
        ctx.mainLoop.idx = 1;
      }
      break;

    case 1: // ローカルストレージの警告
      drawStorageWarning(ctx);
      if (ctx.input.tapC !== 0) {
        ctx.mainLoop.idx = 2;
      }
      break;

    case 2: // メイン処理
      if (!ctx.mainLoop.stopFlg) {
        if (ctx.mainloop) {
          ctx.mainloop(ctx);
        }
      } else {
        clearKey(ctx);
        ctx.mainLoop.tmr--;
      }
      updateSoundWait(ctx);
      break;
  }

  let processTime = Date.now() - startTime;
  if (processTime < 0) processTime = 0;
  const frameTime = int(1000 / ctx.config.fps);
  if (processTime > frameTime) processTime = frameTime;

  // デバッグ情報表示
  if (ctx.config.debug) {
    drawDebugInfo(ctx, processTime);
  }

  // 次フレームをスケジュール
  setTimeout(() => sysMain(ctx), frameTime - processTime);
};

/**
 * システム初期化
 */
const sysInit = (ctx: GameContext): void => {
  // キャンバス初期化
  initCanvas(ctx);

  // iOSの場合はURLバーを消す
  if (ctx.deviceType === DeviceType.iOS) {
    window.scrollTo(0, 1);
  }

  // 入力イベントリスナー設定
  setupInputListeners(ctx);

  // 表示状態変更ハンドラ設定
  setupVisibilityHandler(ctx);

  // メインループ開始
  sysMain(ctx);
};

/**
 * ゲームを開始
 */
export const startGame = (
  ctx: GameContext,
  setup: (ctx: GameContext) => void,
  mainloop: (ctx: GameContext) => void
): void => {
  ctx.setup = setup;
  ctx.mainloop = mainloop;

  // DOMContentLoadedまたはloadイベントで初期化
  if (document.readyState === "loading") {
    window.addEventListener("load", () => sysInit(ctx));
  } else {
    sysInit(ctx);
  }
};

/**
 * メインループのタイマー値を取得
 */
export const getMainTimer = (ctx: GameContext): number => {
  return ctx.mainLoop.tmr;
};

/**
 * メインループの状態インデックスを取得
 */
export const getMainIndex = (ctx: GameContext): number => {
  return ctx.mainLoop.idx;
};

/**
 * デバッグモードを設定
 */
export const setDebug = (ctx: GameContext, debug: boolean): void => {
  ctx.config.debug = debug;
};
