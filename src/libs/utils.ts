/**
 * TypeScript Game Development System
 * ユーティリティ関数
 */

/**
 * 整数を返す（小数点以下を切り捨て）
 */
export const int = (val: number): number => {
  return parseInt(String(val), 10);
};

/**
 * 数を文字列に変換
 */
export const str = (val: number): string => {
  return String(val);
};

/**
 * 乱数（0からmax-1までの整数）
 */
export const rnd = (max: number): number => {
  return int(Math.random() * max);
};

/**
 * 絶対値
 */
export const abs = (val: number): number => {
  return Math.abs(val);
};

/**
 * 三角関数 sin（度数法）
 */
export const sin = (angle: number): number => {
  return Math.sin((Math.PI * 2 * angle) / 360);
};

/**
 * 三角関数 cos（度数法）
 */
export const cos = (angle: number): number => {
  return Math.cos((Math.PI * 2 * angle) / 360);
};

/**
 * 2点間の距離
 */
export const getDis = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};

/**
 * 数値を指定桁数で0埋め
 */
export const digit0 = (val: number, length: number): string => {
  const s = `0000000000000000${val}`;
  return s.substring(s.length - length, s.length);
};

/**
 * コンソールログ出力
 */
export const log = (message: unknown): void => {
  console.log(message);
};

/**
 * 要素IDから要素を取得
 */
export const eID = <T extends HTMLElement = HTMLElement>(id: string): T | null => {
  return document.getElementById(id) as T | null;
};

// 線形合同法による一様乱数
let rndSeed = 13;

/**
 * 乱数の種をセット
 */
export const setRSeed = (val: number): void => {
  rndSeed = val;
};

/**
 * 線形合同法で乱数を生成
 */
export const rndLCM = (max: number): number => {
  rndSeed = (rndSeed * 109 + 1021) % 65536;
  return rndSeed % max;
};
