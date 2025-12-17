/**
 * TypeScript Game Development System
 * キャンバス管理
 */

import type { GameContext } from "./types";
import { int } from "./utils";

/**
 * キャンバスを初期化
 */
export const initCanvas = (ctx: GameContext): void => {
  const { config, canvas } = ctx;

  let winW = window.innerWidth;
  let winH = window.innerHeight;
  ctx.window.bakW = winW;
  ctx.window.bakH = winH;

  // アスペクト比を維持してサイズ調整
  if (winH < (winW * config.height) / config.width) {
    winW = int((winH * config.width) / config.height);
  } else {
    winH = int((config.height * winW) / config.width);
  }

  canvas.width = winW;
  canvas.height = winH;

  ctx.window.winW = winW;
  ctx.window.winH = winH;

  ctx.scale = winW / config.width;
  ctx.ctx.scale(ctx.scale, ctx.scale);

  // テキスト描画のセンタリング設定
  ctx.ctx.textAlign = "center";
  ctx.ctx.textBaseline = "middle";
};

/**
 * キャンバスサイズを変更
 */
export const canvasSize = (ctx: GameContext, width: number, height: number): void => {
  ctx.config.width = width;
  ctx.config.height = height;
  initCanvas(ctx);
};

/**
 * ウィンドウサイズが変更されたかチェック
 */
export const checkWindowResize = (ctx: GameContext): boolean => {
  return ctx.window.bakW !== window.innerWidth || ctx.window.bakH !== window.innerHeight;
};

/**
 * リサイズ時の処理
 */
export const handleResize = (ctx: GameContext): void => {
  if (checkWindowResize(ctx)) {
    initCanvas(ctx);
    // 線の太さを再設定
    ctx.ctx.lineWidth = ctx.lineWidth;
    ctx.ctx.lineCap = "round";
    ctx.ctx.lineJoin = "round";
  }
};
