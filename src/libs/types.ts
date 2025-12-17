/**
 * TypeScript Game Development System
 * 型定義
 */

/**
 * デバイスタイプ
 */
export const DeviceType = {
  PC: "pc",
  Android: "android",
  iOS: "ios",
  Kindle: "kindle",
} as const;

export type DeviceType = (typeof DeviceType)[keyof typeof DeviceType];

/**
 * キー入力定数
 * @typedef {'enter' | 'space' | 'left' | 'up' | 'right' | 'down' | 'a' | 'z'} KeyCode
 * ゲームで使用可能なキーコード
 */
export type KeyCode = "enter" | "space" | "left" | "up" | "right" | "down" | "a" | "z";

/**
 * ゲーム設定
 * @typedef {Object} GameConfig
 * @property {string} canvasId - Canvas要素のID
 * @property {number} width - キャンバスの幅（ピクセル）
 * @property {number} height - キャンバスの高さ（ピクセル）
 * @property {number} fps - フレームレート（FPS）
 * @property {boolean} soundOn - サウンドを有効にするかどうか
 * @property {boolean} debug - デバッグモードを有効にするかどうか
 * @property {boolean} checkLocalStorage - LocalStorageのチェックを行うかどうか
 * @property {string} localStorageKeyName - LocalStorageに保存する際のキー名
 */
export type GameConfig = {
  /** Canvas要素のID */
  canvasId: string;
  /** キャンバスの幅（ピクセル） */
  width: number;
  /** キャンバスの高さ（ピクセル） */
  height: number;
  /** フレームレート（FPS） */
  fps: number;
  /** サウンドを有効にするかどうか */
  soundOn: boolean;
  /** デバッグモードを有効にするかどうか */
  debug: boolean;
  /** LocalStorageのチェックを行うかどうか */
  checkLocalStorage: boolean;
  /** LocalStorageに保存する際のキー名 */
  localStorageKeyName: string;
};

/**
 * 入力状態
 * @typedef {Object} InputState
 * @property {number} tapX - タップ/クリック位置のX座標
 * @property {number} tapY - タップ/クリック位置のY座標
 * @property {number} tapC - タップ/クリック回数
 * @property {number} inkey - 現在押されているキーのコード
 * @property {number[]} key - 各キーの状態を保持する配列
 * @property {number} acX - 加速度センサーのX軸値
 * @property {number} acY - 加速度センサーのY軸値
 * @property {number} acZ - 加速度センサーのZ軸値
 */
export type InputState = {
  /** タップ/クリック位置のX座標 */
  tapX: number;
  /** タップ/クリック位置のY座標 */
  tapY: number;
  /** タップ/クリック回数 */
  tapC: number;
  /** 現在押されているキーのコード */
  inkey: number;
  /** 各キーの状態を保持する配列 */
  key: number[];
  /** 加速度センサーのX軸値 */
  acX: number;
  /** 加速度センサーのY軸値 */
  acY: number;
  /** 加速度センサーのZ軸値 */
  acZ: number;
};

/**
 * サウンド状態
 * @typedef {Object} SoundState
 * @property {number} initialized - サウンドシステムの初期化状態（0: 未初期化, 1: 初期化済み）
 * @property {number} isBgm - BGMが再生中かどうか（0: 停止, 1: 再生中）
 * @property {number} bgmNo - 現在再生中のBGM番号
 * @property {number} waitSe - SEの待機状態
 * @property {number} seNo - 現在再生中のSE番号
 * @property {HTMLAudioElement[]} soundFiles - 読み込まれたサウンドファイルの配列
 * @property {string[]} soundFileNames - サウンドファイル名の配列
 * @property {number} soundLoaded - 読み込み済みのサウンドファイル数
 */
export type SoundState = {
  /** サウンドシステムの初期化状態（0: 未初期化, 1: 初期化済み） */
  initialized: number;
  /** BGMが再生中かどうか（0: 停止, 1: 再生中） */
  isBgm: number;
  /** 現在再生中のBGM番号 */
  bgmNo: number;
  /** SEの待機状態 */
  waitSe: number;
  /** 現在再生中のSE番号 */
  seNo: number;
  /** 読み込まれたサウンドファイルの配列 */
  soundFiles: HTMLAudioElement[];
  /** サウンドファイル名の配列 */
  soundFileNames: string[];
  /** 読み込み済みのサウンドファイル数 */
  soundLoaded: number;
};

/**
 * 画像状態
 * @typedef {Object} ImageState
 * @property {HTMLImageElement[]} images - 読み込まれた画像要素の配列
 * @property {boolean[]} loaded - 各画像の読み込み完了状態の配列
 */
export type ImageState = {
  /** 読み込まれた画像要素の配列 */
  images: HTMLImageElement[];
  /** 各画像の読み込み完了状態の配列 */
  loaded: boolean[];
};

/**
 * メインループ状態
 * @typedef {Object} MainLoopState
 * @property {number} idx - ループインデックス
 * @property {number} tmr - タイマー値
 * @property {boolean} stopFlg - ループ停止フラグ
 */
export type MainLoopState = {
  /** ループインデックス */
  idx: number;
  /** タイマー値 */
  tmr: number;
  /** ループ停止フラグ */
  stopFlg: boolean;
};

/**
 * ウィンドウ状態
 * @typedef {Object} WindowState
 * @property {number} winW - ウィンドウの幅（ピクセル）
 * @property {number} winH - ウィンドウの高さ（ピクセル）
 * @property {number} bakW - バックアップされた幅（ピクセル）
 * @property {number} bakH - バックアップされた高さ（ピクセル）
 */
export type WindowState = {
  /** ウィンドウの幅（ピクセル） */
  winW: number;
  /** ウィンドウの高さ（ピクセル） */
  winH: number;
  /** バックアップされた幅（ピクセル） */
  bakW: number;
  /** バックアップされた高さ（ピクセル） */
  bakH: number;
};

/**
 * ゲームコンテキスト全体
 * ゲームの実行に必要なすべての状態と設定を保持する
 * @typedef {Object} GameContext
 * @property {HTMLCanvasElement} canvas - Canvas要素
 * @property {CanvasRenderingContext2D} ctx - Canvasの2D描画コンテキスト
 * @property {number} scale - スケール係数
 * @property {number} lineWidth - 線の幅
 * @property {InputState} input - 入力状態
 * @property {SoundState} sound - サウンド状態
 * @property {ImageState} image - 画像状態
 * @property {MainLoopState} mainLoop - メインループ状態
 * @property {WindowState} window - ウィンドウ状態
 * @property {DeviceType} deviceType - デバイスタイプ
 * @property {boolean} supportTouch - タッチ操作をサポートしているかどうか
 * @property {GameConfig} config - ゲーム設定
 * @property {Function} [setup] - 初期化時に呼び出されるコールバック関数
 * @property {Function} [mainloop] - メインループで呼び出されるコールバック関数
 */
export type GameContext = {
  /** Canvas要素 */
  canvas: HTMLCanvasElement;
  /** Canvasの2D描画コンテキスト */
  ctx: CanvasRenderingContext2D;
  /** スケール係数 */
  scale: number;
  /** 線の幅 */
  lineWidth: number;

  /** 入力状態 */
  input: InputState;
  /** サウンド状態 */
  sound: SoundState;
  /** 画像状態 */
  image: ImageState;
  /** メインループ状態 */
  mainLoop: MainLoopState;
  /** ウィンドウ状態 */
  window: WindowState;

  /** デバイスタイプ */
  deviceType: DeviceType;
  /** タッチ操作をサポートしているかどうか */
  supportTouch: boolean;

  /** ゲーム設定 */
  config: GameConfig;

  /**
   * 初期化時に呼び出されるコールバック関数
   * @param {GameContext} ctx - ゲームコンテキスト
   */
  setup?: (ctx: GameContext) => void;
  /**
   * メインループで呼び出されるコールバック関数
   * @param {GameContext} ctx - ゲームコンテキスト
   */
  mainloop?: (ctx: GameContext) => void;
};

/**
 * デフォルト設定
 * ゲームのデフォルト設定値
 * @type {GameConfig}
 */
export const defaultConfig: GameConfig = {
  canvasId: "canvas",
  width: 800,
  height: 600,
  fps: 30,
  soundOn: true,
  debug: false,
  checkLocalStorage: false,
  localStorageKeyName: "SAVEDATA",
};
