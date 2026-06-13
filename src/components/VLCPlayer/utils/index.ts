import { Skia, TextAlign } from "@shopify/react-native-skia";

interface DanmukuOptions {
  fontSize?: number;
  padding?: number;
  safeDistance?: number;
  trackHeight?: number;
  maxTracks?: number;
}

/**
 * 根据当前屏幕状态计算并生成弹幕对象
 * @param danmu 原始弹幕数据
 * @param canvasHeight 画布高度
 * @param screenWidth 屏幕宽度
 * @param currentDanmakus 当前屏幕上已有的弹幕数组
 */
export const generateDanmukuWithTrack = (
  danmu: any,
  canvasHeight: number,
  screenWidth: number,
  currentDanmakus: any[],
  font: any, // 必须传入 font 对象
  options?: DanmukuOptions,
  customFontMgr?: any,
) => {
  const FONT_SIZE = options?.fontSize || 16; // 字体大小
  const PADDING = options?.padding || 3; // 弹幕轨道内边距
  const TOP_SAFETY = 2; // 顶部安全距离，避免与文字重叠
  const TRACK_HEIGHT = FONT_SIZE + PADDING; // 弹幕轨道高度
  const SAFE_DISTANCE = options?.safeDistance || 5; // 安全距离，避免与弹幕重叠

  const maxTracks =
    options?.maxTracks ||
    Math.floor((canvasHeight - TOP_SAFETY * 2) / TRACK_HEIGHT); // 最大弹幕轨道数
  const trackOccupancy = new Array(maxTracks).fill(false);

  currentDanmakus.forEach((d) => {
    const trackIndex = Math.floor((d.y - TOP_SAFETY) / TRACK_HEIGHT);
    if (trackIndex >= 0 && trackIndex < maxTracks) {
      // 核心：使用该弹幕的实际宽度来判断危险区
      // 这里你需要存储弹幕的宽度，或者重新测量（若弹幕很多，建议在创建时把 width 存进对象里）

      const dWidth = d.width || 500; // 建议在生成弹幕时就存好 width

      const isDangerous = d.x > screenWidth - dWidth - SAFE_DISTANCE;
      if (isDangerous) {
        trackOccupancy[trackIndex] = true;
      }
    }
  });

  let textWidth = 0;
  const createBulletText = (text: string, color: string) => {
    if (!customFontMgr) return;
    const paragraphStyle = {
      textAlign: TextAlign.Start,
    };

    const textStyle = {
      fontSize: FONT_SIZE,
      shadows: [
        {
          color: Skia.Color(`rgba(0, 0, 0, 0.5)`),
          blurRadius: 0,
          offset: { x: -1, y: 0 },
        },
        {
          color: Skia.Color(`rgba(0, 0, 0, 0.5)`),
          blurRadius: 0,
          offset: { x: 1, y: 0 },
        },
        {
          color: Skia.Color(`rgba(0, 0, 0, 0.5)`),
          blurRadius: 0,
          offset: { x: 0, y: -1 },
        },
        {
          color: Skia.Color(`rgba(0, 0, 0, 0.5)`),
          blurRadius: 0,
          offset: { x: 0, y: 1 },
        },
        {
          color: Skia.Color(`rgba(0, 0, 0, 0.2)`),
          blurRadius: 2,
          offset: { x: 1, y: 1 },
        },
      ],
    };

    // 填充画笔（白色）
    const fillPaint = Skia.Paint();
    fillPaint.setColor(Skia.Color(color || "white"));

    const paragraph = Skia.ParagraphBuilder.Make(paragraphStyle, customFontMgr)
      .pushStyle(textStyle, fillPaint)
      .addText(text)
      .pop()
      .build();
    paragraph.layout(5000);
    textWidth = paragraph.getLongestLine() + SAFE_DISTANCE;
    return paragraph;
  };

  // 按顺序轮询找空位
  for (let i = 0; i < maxTracks; i++) {
    if (!trackOccupancy[i]) {
      const paragraph = createBulletText(danmu.txt, danmu.color);
      return {
        ...danmu,
        x: screenWidth,
        y: TOP_SAFETY + i * TRACK_HEIGHT,
        width: textWidth,
        paragraph,
      };
    }
  }

  return null; // 没空位就略过
};
