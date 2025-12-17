/**
 * TypeScript Game Development System
 * グラフィックス関数（図形、画像、テキスト）
 */

import type { GameContext } from "./types";
import { int } from "./utils";

// ========== 透明度・色 ==========

/**
 * 透明度を設定（0-100）
 */
export const setAlpha = (ctx: GameContext, percent: number): void => {
  ctx.ctx.globalAlpha = percent / 100;
};

/**
 * RGB値から色文字列を生成
 */
export const colorRGB = (r: number, g: number, b: number): string => {
  return `rgb(${int(r)},${int(g)},${int(b)})`;
};

// ========== 線 ==========

/**
 * 線の太さを設定
 */
export const lineW = (ctx: GameContext, width: number): void => {
  ctx.lineWidth = width;
  ctx.ctx.lineWidth = width;
  ctx.ctx.lineCap = "round";
  ctx.ctx.lineJoin = "round";
};

/**
 * 線を描画
 */
export const line = (
  ctx: GameContext,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color: string
): void => {
  ctx.ctx.strokeStyle = color;
  ctx.ctx.beginPath();
  ctx.ctx.moveTo(x0, y0);
  ctx.ctx.lineTo(x1, y1);
  ctx.ctx.stroke();
};

// ========== 矩形 ==========

/**
 * キャンバス全体を塗りつぶし
 */
export const fill = (ctx: GameContext, color: string): void => {
  ctx.ctx.fillStyle = color;
  ctx.ctx.fillRect(0, 0, ctx.config.width, ctx.config.height);
};

/**
 * 矩形（塗りつぶし）
 */
export const fRect = (
  ctx: GameContext,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
): void => {
  ctx.ctx.fillStyle = color;
  ctx.ctx.fillRect(x, y, w, h);
};

/**
 * 矩形（線）
 */
export const sRect = (
  ctx: GameContext,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
): void => {
  ctx.ctx.strokeStyle = color;
  ctx.ctx.strokeRect(x, y, w, h);
};

// ========== 円 ==========

/**
 * 円（塗りつぶし）
 */
export const fCir = (ctx: GameContext, x: number, y: number, r: number, color: string): void => {
  ctx.ctx.fillStyle = color;
  ctx.ctx.beginPath();
  ctx.ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.ctx.closePath();
  ctx.ctx.fill();
};

/**
 * 円（線）
 */
export const sCir = (ctx: GameContext, x: number, y: number, r: number, color: string): void => {
  ctx.ctx.strokeStyle = color;
  ctx.ctx.beginPath();
  ctx.ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.ctx.closePath();
  ctx.ctx.stroke();
};

// ========== 三角形 ==========

/**
 * 三角形（塗りつぶし）
 */
export const fTri = (
  ctx: GameContext,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string
): void => {
  ctx.ctx.fillStyle = color;
  ctx.ctx.beginPath();
  ctx.ctx.moveTo(x0, y0);
  ctx.ctx.lineTo(x1, y1);
  ctx.ctx.lineTo(x2, y2);
  ctx.ctx.closePath();
  ctx.ctx.fill();
};

/**
 * 三角形（線）
 */
export const sTri = (
  ctx: GameContext,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string
): void => {
  ctx.ctx.strokeStyle = color;
  ctx.ctx.beginPath();
  ctx.ctx.moveTo(x0, y0);
  ctx.ctx.lineTo(x1, y1);
  ctx.ctx.lineTo(x2, y2);
  ctx.ctx.closePath();
  ctx.ctx.stroke();
};

// ========== 多角形 ==========

/**
 * 多角形（塗りつぶし）
 * @param xy 座標配列 [x0, y0, x1, y1, ...]
 */
export const fPol = (ctx: GameContext, xy: number[], color: string): void => {
  ctx.ctx.fillStyle = color;
  ctx.ctx.beginPath();
  ctx.ctx.moveTo(xy[0], xy[1]);
  for (let i = 2; i < xy.length; i += 2) {
    ctx.ctx.lineTo(xy[i], xy[i + 1]);
  }
  ctx.ctx.closePath();
  ctx.ctx.fill();
};

/**
 * 多角形（線）
 * @param xy 座標配列 [x0, y0, x1, y1, ...]
 */
export const sPol = (ctx: GameContext, xy: number[], color: string): void => {
  ctx.ctx.strokeStyle = color;
  ctx.ctx.beginPath();
  ctx.ctx.moveTo(xy[0], xy[1]);
  for (let i = 2; i < xy.length; i += 2) {
    ctx.ctx.lineTo(xy[i], xy[i + 1]);
  }
  ctx.ctx.closePath();
  ctx.ctx.stroke();
};

// ========== 画像読み込み ==========

/**
 * 画像を読み込み
 */
export const loadImg = (ctx: GameContext, n: number, filename: string): void => {
  ctx.image.loaded[n] = false;
  ctx.image.images[n] = new Image();
  ctx.image.images[n].onload = () => {
    ctx.image.loaded[n] = true;
  };
  ctx.image.images[n].src = filename;
};

// ========== 画像描画 ==========

/**
 * 画像を描画
 */
export const drawImg = (ctx: GameContext, n: number, x: number, y: number): void => {
  if (ctx.image.loaded[n]) {
    ctx.ctx.drawImage(ctx.image.images[n], x, y);
  }
};

/**
 * 画像を左右反転して描画
 */
export const drawImgLR = (ctx: GameContext, n: number, x: number, y: number): void => {
  if (ctx.image.loaded[n]) {
    const img = ctx.image.images[n];
    const w = img.width;
    const h = img.height;
    ctx.ctx.save();
    ctx.ctx.translate(x + w / 2, y + h / 2);
    ctx.ctx.scale(-1, 1);
    ctx.ctx.drawImage(img, -w / 2, -h / 2);
    ctx.ctx.restore();
  }
};

/**
 * 画像をセンタリングして描画
 */
export const drawImgC = (ctx: GameContext, n: number, x: number, y: number): void => {
  if (ctx.image.loaded[n]) {
    const img = ctx.image.images[n];
    ctx.ctx.drawImage(img, x - int(img.width / 2), y - int(img.height / 2));
  }
};

/**
 * 画像を拡大縮小して描画
 */
export const drawImgS = (
  ctx: GameContext,
  n: number,
  x: number,
  y: number,
  w: number,
  h: number
): void => {
  if (ctx.image.loaded[n]) {
    ctx.ctx.drawImage(ctx.image.images[n], x, y, w, h);
  }
};

/**
 * 画像を切り出し＋拡大縮小して描画
 */
export const drawImgTS = (
  ctx: GameContext,
  n: number,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  cx: number,
  cy: number,
  cw: number,
  ch: number
): void => {
  if (ctx.image.loaded[n]) {
    ctx.ctx.drawImage(ctx.image.images[n], sx, sy, sw, sh, cx, cy, cw, ch);
  }
};

/**
 * 画像を回転して描画
 */
export const drawImgR = (
  ctx: GameContext,
  n: number,
  x: number,
  y: number,
  angle: number
): void => {
  if (ctx.image.loaded[n]) {
    const img = ctx.image.images[n];
    const w = img.width;
    const h = img.height;
    ctx.ctx.save();
    ctx.ctx.translate(x, y);
    ctx.ctx.rotate((Math.PI * angle) / 180);
    ctx.ctx.drawImage(img, -w / 2, -h / 2);
    ctx.ctx.restore();
  }
};

// ========== テキスト描画 ==========

/**
 * テキストを描画（影付き）
 */
export const fText = (
  ctx: GameContext,
  text: string,
  x: number,
  y: number,
  size: number,
  color: string
): void => {
  ctx.ctx.font = `${int(size)}px bold monospace`;
  ctx.ctx.fillStyle = "black";
  ctx.ctx.fillText(text, x + 1, y + 1);
  ctx.ctx.fillStyle = color;
  ctx.ctx.fillText(text, x, y);
};

/**
 * 複数行テキストを描画（改行対応）
 */
export const fTextN = (
  ctx: GameContext,
  text: string,
  x: number,
  y: number,
  h: number,
  size: number,
  color: string
): void => {
  const lines = text.split("\n");
  ctx.ctx.font = `${int(size)}px bold monospace`;

  let lineHeight = h;
  let startY = y;

  if (lines.length === 1) {
    lineHeight = 0;
  } else {
    startY = y - int(h / 2);
    lineHeight = int(h / (lines.length - 1));
  }

  for (let i = 0; i < lines.length; i++) {
    ctx.ctx.fillStyle = "black";
    ctx.ctx.fillText(lines[i], x + 1, startY + lineHeight * i + 1);
    ctx.ctx.fillStyle = color;
    ctx.ctx.fillText(lines[i], x, startY + lineHeight * i);
  }
};

/**
 * テキストの幅を測定
 */
export const measureTextWidth = (ctx: GameContext, text: string): number => {
  return ctx.ctx.measureText(text).width;
};
