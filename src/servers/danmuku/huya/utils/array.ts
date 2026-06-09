/**
 * 将 base64 字符串转换为 Uint8Array
 * @param base64 base64 字符串
 * @returns Uint8Array
 */
export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * 文本替换工具：将 "@A" 替换为 "@"
 * 兼容性：所有浏览器及环境
 */
export const replaceAtA = (text: string | null | undefined): string => {
  // 1. 处理空值，防止程序崩溃
  if (text == null) return "";

  // 2. 使用全局正则进行替换
  // '/@A/g' 在任何现代打包工具（Webpack/Vite/Rollup）下都无需特殊 polyfill
  return text.replace(/@A/g, "@");
};
