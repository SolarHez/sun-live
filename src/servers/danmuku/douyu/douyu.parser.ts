// 协议解析 (处理 Buffer/JSON)

/**
 * 编码字符串为符合ws接收格式
 * @param {需要发送的字符串} str
 * @returns
 */
export function WebSocket_Packet(str: string) {
  const MSG_TYPE = 689;
  let bytesArr = stringToByte(str);
  let buffer = new Uint8Array(bytesArr.length + 4 + 4 + 2 + 1 + 1 + 1);
  let p_content = new Uint8Array(bytesArr.length); // 消息内容
  for (let i = 0; i < p_content.length; i++) {
    p_content[i] = bytesArr[i];
  }
  let p_length = new Uint32Array([bytesArr.length + 4 + 2 + 1 + 1 + 1]); // 消息长度
  let p_type = new Uint32Array([MSG_TYPE]); // 消息类型

  buffer.set(new Uint8Array(p_length.buffer), 0);
  buffer.set(new Uint8Array(p_length.buffer), 4);
  buffer.set(new Uint8Array(p_type.buffer), 8);
  buffer.set(p_content, 12);

  return buffer;
}

/**
 * 字符串转字节
 * @param {字符串} str
 * @returns
 */
export function stringToByte(str: string) {
  let bytes = [];
  let len, c;
  len = str.length;
  for (let i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10ffff) {
      bytes.push(((c >> 18) & 0x07) | 0xf0);
      bytes.push(((c >> 12) & 0x3f) | 0x80);
      bytes.push(((c >> 6) & 0x3f) | 0x80);
      bytes.push((c & 0x3f) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00ffff) {
      bytes.push(((c >> 12) & 0x0f) | 0xe0);
      bytes.push(((c >> 6) & 0x3f) | 0x80);
      bytes.push((c & 0x3f) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007ff) {
      bytes.push(((c >> 6) & 0x1f) | 0xc0);
      bytes.push((c & 0x3f) | 0x80);
    } else {
      bytes.push(c & 0xff);
    }
  }
  return bytes;
}
