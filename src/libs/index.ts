/**
 * TypeScript Game Development System
 * エントリーポイント - すべてのモジュールを再エクスポート
 */

// キャンバス
export {
  canvasSize,
  checkWindowResize,
  handleResize,
  initCanvas,
} from "./canvas";
// コンテキスト
export { clearKey, createContext, setCanvasSize, setFPS } from "./context";
// グラフィックス
export {
  colorRGB,
  // 画像描画
  drawImg,
  drawImgC,
  drawImgLR,
  drawImgR,
  drawImgS,
  drawImgTS,
  // 円
  fCir,
  // 矩形
  fill,
  // 多角形
  fPol,
  fRect,
  // テキスト
  fText,
  fTextN,
  // 三角形
  fTri,
  line,
  // 線
  lineW,
  // 画像読み込み
  loadImg,
  measureTextWidth,
  sCir,
  // 色と透明度
  setAlpha,
  sPol,
  sRect,
  sTri,
} from "./graphics";
// 入力
export {
  clearKey as clearInputKey,
  getAcceleration,
  getInkey,
  getKeyState,
  getTapPosition,
  getTapState,
  setupInputListeners,
} from "./input";
// メインループ
export {
  type DateInfo,
  getDate,
  getMainIndex,
  getMainTimer,
  setDebug,
  startGame,
} from "./mainloop";
// サウンド
export {
  isSoundEnabled,
  loadSound,
  loadSoundSmartPhone,
  pauseBgm,
  playBgm,
  playSE,
  setPlaybackRate,
  setSoundEnabled,
  setupVisibilityHandler,
  stopBgm,
  updateSoundWait,
} from "./sound";
// ストレージ
export {
  clearAllLS,
  clearLS,
  loadLS,
  saveLS,
  setStorageKeyName,
  testLocalStorage,
} from "./storage";
export type {
  GameConfig,
  GameContext,
  ImageState,
  InputState,
  KeyCode,
  MainLoopState,
  SoundState,
  WindowState,
} from "./types";
// 型
export {
  DeviceType,
  defaultConfig,
} from "./types";
// ユーティリティ
export {
  abs,
  cos,
  digit0,
  eID,
  getDis,
  int,
  log,
  rnd,
  rndLCM,
  setRSeed,
  sin,
  str,
} from "./utils";
