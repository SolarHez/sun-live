/**
 * 生成随机数
 * @param min 最小值
 * @param max 最大值
 * @returns 随机数
 */
export function getRandom(min: number, max: number) {
  return String(Math.floor(Math.random() * (max - min) + min));
}
