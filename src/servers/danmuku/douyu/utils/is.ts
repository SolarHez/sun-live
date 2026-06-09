/**
 * 健壮的空值判断工具
 */
export function isEmpty<T>(
  value: T | null | undefined,
): value is null | undefined {
  // 1. null 或 undefined
  if (value === null || value === undefined) {
    return true;
  }

  // 2. 数组或字符串
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0;
  }

  // 3. Map 或 Set
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  // 4. 普通对象
  if (typeof value === "object") {
    // 排除掉 Date 或 RegExp 等特殊对象（如果业务需要）
    if (value instanceof Date || value instanceof RegExp) {
      return false;
    }
    return Object.keys(value).length === 0;
  }

  return false;
}

/**
 * 将标准 URL 参数格式转换为自定义格式
 * 逻辑: & 替换为 $, = 替换为 -
 * @param str 标准格式字符串 (如: vod_d_id=123&vurl_id=456)
 * @returns 自定义格式字符串 (如: vod_d_id-123$vurl_id-456)
 */
export const toCustomFormat = (str: string | undefined | null): string => {
  if (!str) return "";

  return str.replace(/&/g, "$").replace(/=/g, "-");
};
