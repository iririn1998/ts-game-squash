/**
 * TypeScript Game Development System
 * コンテキスト管理
 */

import type {
  GameConfig,
  GameContext,
  ImageState,
  InputState,
  MainLoopState,
  SoundState,
  WindowState,
} from "./types";
import { DeviceType, defaultConfig } from "./types";

/**
 * 入力状態の初期値を作成
 */
const createInputState = (): InputState => {
  return {
    tapX: 0,
    tapY: 0,
    tapC: 0,
    inkey: 0,
    key: new Array(256).fill(0),
    acX: 0,
    acY: 0,
    acZ: 0,
  };
};

/**
 * サウンド状態の初期値を作成
 */
const createSoundState = (): SoundState => {
  return {
    initialized: 0,
    isBgm: -1,
    bgmNo: 0,
    waitSe: 0,
    seNo: -1,
    soundFiles: new Array(256),
    soundFileNames: new Array(256),
    soundLoaded: 0,
  };
};

/**
 * 画像状態の初期値を作成
 */
const createImageState = (): ImageState => {
  return {
    images: new Array(256),
    loaded: new Array(256).fill(false),
  };
};

/**
 * メインループ状態の初期値を作成
 */
const createMainLoopState = (): MainLoopState => {
  return {
    idx: 0,
    tmr: 0,
    stopFlg: false,
  };
};

/**
 * ウィンドウ状態の初期値を作成
 */
const createWindowState = (): WindowState => {
  return {
    winW: 0,
    winH: 0,
    bakW: 0,
    bakH: 0,
  };
};

/**
 * デバイスタイプを検出
 */
const detectDeviceType = (): DeviceType => {
  const ua = navigator.userAgent;

  if (ua.indexOf("Android") > 0) {
    return DeviceType.Android;
  } else if (ua.indexOf("iPhone") > 0 || ua.indexOf("iPod") > 0 || ua.indexOf("iPad") > 0) {
    return DeviceType.iOS;
  } else if (ua.indexOf("Silk") > 0) {
    return DeviceType.Kindle;
  }

  return DeviceType.PC;
};

/**
 * タッチイベントがサポートされているか判定
 */
const detectTouchSupport = (): boolean => {
  return "ontouchend" in document;
};

/**
 * GameContextを作成
 */
export const createContext = (config: Partial<GameConfig> = {}): GameContext | null => {
  const mergedConfig: GameConfig = { ...defaultConfig, ...config };

  const canvas = document.getElementById(mergedConfig.canvasId) as HTMLCanvasElement | null;
  if (!canvas) {
    console.error(`Canvas element with id "${mergedConfig.canvasId}" not found`);
    return null;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Failed to get 2D context from canvas");
    return null;
  }

  const context: GameContext = {
    canvas,
    ctx,
    scale: 1.0,
    lineWidth: 1,

    input: createInputState(),
    sound: createSoundState(),
    image: createImageState(),
    mainLoop: createMainLoopState(),
    window: createWindowState(),

    deviceType: detectDeviceType(),
    supportTouch: detectTouchSupport(),

    config: mergedConfig,
  };

  return context;
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
 * FPSを設定
 */
export const setFPS = (ctx: GameContext, fps: number): void => {
  ctx.config.fps = fps;
};

/**
 * キャンバスサイズを設定
 */
export const setCanvasSize = (ctx: GameContext, width: number, height: number): void => {
  ctx.config.width = width;
  ctx.config.height = height;
};
