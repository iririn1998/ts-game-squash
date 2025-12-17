/**
 * TypeScript Game Development System
 * 入力処理（キーボード、マウス、タッチ、加速度センサー）
 */

import { loadSoundSmartPhone } from "./sound";
import type { GameContext } from "./types";
import { DeviceType } from "./types";
import { int } from "./utils";

/**
 * 実座標から仮想座標への変換
 */
const transformXY = (ctx: GameContext): void => {
  ctx.input.tapX = int(ctx.input.tapX / ctx.scale);
  ctx.input.tapY = int(ctx.input.tapY / ctx.scale);
};

/**
 * キーダウンハンドラを作成
 */
const createKeyDownHandler = (ctx: GameContext): ((e: KeyboardEvent) => void) => {
  return (e: KeyboardEvent) => {
    // サウンドの読み込み（ユーザーインタラクション時に必要）
    if (ctx.sound.initialized === 0) {
      loadSoundSmartPhone(ctx);
    }
    ctx.input.inkey = e.keyCode;
    ctx.input.key[e.keyCode]++;
  };
};

/**
 * キーアップハンドラを作成
 */
const createKeyUpHandler = (ctx: GameContext): ((e: KeyboardEvent) => void) => {
  return (e: KeyboardEvent) => {
    ctx.input.inkey = 0;
    ctx.input.key[e.keyCode] = 0;
  };
};

/**
 * マウスダウンハンドラを作成
 */
const createMouseDownHandler = (ctx: GameContext): ((e: MouseEvent) => void) => {
  return (e: MouseEvent) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    ctx.input.tapX = e.clientX - rect.left;
    ctx.input.tapY = e.clientY - rect.top;
    ctx.input.tapC = 1;
    transformXY(ctx);

    if (ctx.sound.initialized === 0) {
      loadSoundSmartPhone(ctx);
    }
  };
};

/**
 * マウスムーブハンドラを作成
 */
const createMouseMoveHandler = (ctx: GameContext): ((e: MouseEvent) => void) => {
  return (e: MouseEvent) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    ctx.input.tapX = e.clientX - rect.left;
    ctx.input.tapY = e.clientY - rect.top;
    transformXY(ctx);
  };
};

/**
 * マウスアップハンドラを作成
 */
const createMouseUpHandler = (ctx: GameContext): ((e: MouseEvent) => void) => {
  return (_e: MouseEvent) => {
    ctx.input.tapC = 0;
  };
};

/**
 * マウスアウトハンドラを作成
 */
const createMouseOutHandler = (ctx: GameContext): ((e: MouseEvent) => void) => {
  return (_e: MouseEvent) => {
    ctx.input.tapC = 0;
  };
};

/**
 * タッチスタートハンドラを作成
 */
const createTouchStartHandler = (ctx: GameContext): ((e: TouchEvent) => void) => {
  return (e: TouchEvent) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    ctx.input.tapX = e.touches[0].clientX - rect.left;
    ctx.input.tapY = e.touches[0].clientY - rect.top;
    ctx.input.tapC = 1;
    transformXY(ctx);

    if (ctx.sound.initialized === 0) {
      loadSoundSmartPhone(ctx);
    }
  };
};

/**
 * タッチムーブハンドラを作成
 */
const createTouchMoveHandler = (ctx: GameContext): ((e: TouchEvent) => void) => {
  return (e: TouchEvent) => {
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    ctx.input.tapX = e.touches[0].clientX - rect.left;
    ctx.input.tapY = e.touches[0].clientY - rect.top;
    transformXY(ctx);
  };
};

/**
 * タッチエンドハンドラを作成
 */
const createTouchEndHandler = (ctx: GameContext): ((e: TouchEvent) => void) => {
  return (e: TouchEvent) => {
    e.preventDefault();
    ctx.input.tapC = 0;
  };
};

/**
 * タッチキャンセルハンドラを作成
 */
const createTouchCancelHandler = (ctx: GameContext): ((e: TouchEvent) => void) => {
  return (_e: TouchEvent) => {
    ctx.input.tapX = -1;
    ctx.input.tapY = -1;
    ctx.input.tapC = 0;
  };
};

/**
 * 加速度センサーハンドラを作成
 */
const createDeviceMotionHandler = (ctx: GameContext): ((e: DeviceMotionEvent) => void) => {
  return (e: DeviceMotionEvent) => {
    const aIG = e.accelerationIncludingGravity;
    if (aIG) {
      ctx.input.acX = int(aIG.x ?? 0);
      ctx.input.acY = int(aIG.y ?? 0);
      ctx.input.acZ = int(aIG.z ?? 0);

      // AndroidとiOSで正負が逆になる
      if (ctx.deviceType === DeviceType.Android) {
        ctx.input.acX = -ctx.input.acX;
        ctx.input.acY = -ctx.input.acY;
        ctx.input.acZ = -ctx.input.acZ;
      }
    }
  };
};

/**
 * 入力イベントリスナーを設定
 */
export const setupInputListeners = (ctx: GameContext): void => {
  // キーボードイベント
  window.addEventListener("keydown", createKeyDownHandler(ctx));
  window.addEventListener("keyup", createKeyUpHandler(ctx));

  // タッチまたはマウスイベント
  if (ctx.supportTouch) {
    ctx.canvas.addEventListener("touchstart", createTouchStartHandler(ctx));
    ctx.canvas.addEventListener("touchmove", createTouchMoveHandler(ctx));
    ctx.canvas.addEventListener("touchend", createTouchEndHandler(ctx));
    ctx.canvas.addEventListener("touchcancel", createTouchCancelHandler(ctx));
  } else {
    ctx.canvas.addEventListener("mousedown", createMouseDownHandler(ctx));
    ctx.canvas.addEventListener("mousemove", createMouseMoveHandler(ctx));
    ctx.canvas.addEventListener("mouseup", createMouseUpHandler(ctx));
    ctx.canvas.addEventListener("mouseout", createMouseOutHandler(ctx));
  }

  // 加速度センサー
  window.addEventListener("devicemotion", createDeviceMotionHandler(ctx));
};

/**
 * キー入力状態をクリア
 */
export const clearKey = (ctx: GameContext): void => {
  ctx.input.inkey = 0;
  for (let i = 0; i < 256; i++) {
    ctx.input.key[i] = 0;
  }
};

/**
 * タップ座標を取得
 */
export const getTapPosition = (ctx: GameContext): { x: number; y: number } => {
  return { x: ctx.input.tapX, y: ctx.input.tapY };
};

/**
 * タップ状態を取得
 */
export const getTapState = (ctx: GameContext): number => {
  return ctx.input.tapC;
};

/**
 * キー状態を取得
 */
export const getKeyState = (ctx: GameContext, keyCode: number): number => {
  return ctx.input.key[keyCode];
};

/**
 * 最後に押されたキーコードを取得
 */
export const getInkey = (ctx: GameContext): number => {
  return ctx.input.inkey;
};

/**
 * 加速度を取得
 */
export const getAcceleration = (ctx: GameContext): { x: number; y: number; z: number } => {
  return {
    x: ctx.input.acX,
    y: ctx.input.acY,
    z: ctx.input.acZ,
  };
};
