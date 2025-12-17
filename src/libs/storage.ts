/**
 * TypeScript Game Development System
 * ローカルストレージ操作
 */

import type { GameContext } from "./types";

/**
 * ローカルストレージに保存
 */
export const saveLS = (ctx: GameContext, keyNo: number, value: string | number): void => {
  try {
    localStorage.setItem(ctx.config.localStorageKeyName + keyNo, String(value));
  } catch (_e) {
    // ローカルストレージへのアクセスができない場合は無視
  }
};

/**
 * ローカルストレージから読み込み
 * 文字列、数値をそのまま保存し、元の状態（型）で読み込めるようにしてある
 */
export const loadLS = (ctx: GameContext, keyNo: number): string | number | null => {
  let val: string | null = null;

  try {
    val = localStorage.getItem(ctx.config.localStorageKeyName + keyNo);
  } catch (_e) {
    // ローカルストレージへのアクセスができない場合は無視
  }

  if (val === null) return val;
  if (val === "") return val;
  if (Number.isNaN(Number(val))) return val;

  // 数値として返す
  return Number(val);
};

/**
 * ローカルストレージから指定キーを削除
 */
export const clearLS = (ctx: GameContext, keyNo: number): void => {
  try {
    localStorage.removeItem(ctx.config.localStorageKeyName + keyNo);
  } catch (_e) {
    // エラーは無視
  }
};

/**
 * ローカルストレージを全てクリア
 */
export const clearAllLS = (): void => {
  try {
    localStorage.clear();
  } catch (_e) {
    // エラーは無視
  }
};

/**
 * ローカルストレージが使用可能かテスト
 * Safari プライベートブラウズなどで使用不可の場合がある
 */
export const testLocalStorage = (): boolean => {
  try {
    localStorage.setItem("_save_test", "testdata");
    localStorage.removeItem("_save_test");
    return true;
  } catch (_e) {
    return false;
  }
};

/**
 * キー名を設定
 */
export const setStorageKeyName = (ctx: GameContext, keyName: string): void => {
  ctx.config.localStorageKeyName = keyName;
};
