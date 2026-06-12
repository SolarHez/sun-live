/**
 * 格式化热度/人数数值
 * @param count 原始数值
 * @returns 格式化后的字符串
 */
export function formatHotValue(count: number | string): string {
  const num = typeof count === "string" ? parseFloat(count) : count;

  // 健壮性检查：如果不是合法数字，返回原样
  if (isNaN(num)) return String(count);

  if (num >= 10000) {
    // 除以 10000，并保留 1 位小数
    const wan = (num / 10000).toFixed(1);
    // 如果小数点后是 0（比如 400.0），可以考虑去掉 .0，视审美而定
    return `${wan.replace(/\.0$/, "")}万`;
  }

  return String(num);
}
