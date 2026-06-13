import { Platform, useWindowDimensions } from "react-native";
import {
  Canvas,
  Picture,
  Skia,
  useFont,
  useFonts,
} from "@shopify/react-native-skia";
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useFrameCallback,
} from "react-native-reanimated";
import { useEffect } from "react";
import { generateDanmukuWithTrack } from "../utils";

export function SkiaDanmuku({ danmu }: { danmu?: any }) {
  const { width: screenWidth } = useWindowDimensions();
  const canvasSize = useSharedValue({ width: 0, height: 0 });
  const time = useSharedValue(0);
  const danmakus = useSharedValue<any[]>([]);
  const fontSize = 16; // 字体大小
  const opacity = 1;
  const speed = 1.5;
  const maxTracks = 10;
  const font = useFont(
    require("../../../../assets/fonts/NotoSansSC-Medium.ttf"),
    fontSize,
  );
  const customFontMgr = useFonts({
    Roboto: [require("../../../../assets/fonts/NotoSansSC-Bold.ttf")],
  });

  useEffect(() => {
    if (!danmu.txt) return;
    if (!canvasSize.value.height || !canvasSize.value.width) return;
    const newDanmuku = generateDanmukuWithTrack(
      danmu,
      canvasSize.value.height,
      screenWidth,
      danmakus.value,
      font,
      {
        fontSize,
        maxTracks,
      },
      customFontMgr,
    );
    if (newDanmuku) {
      danmakus.value = [...danmakus.value, newDanmuku];
    }
  }, [danmu]);

  useFrameCallback(() => {
    // 核心：处理所有的移动逻辑
    const data = danmakus.value;
    const next = [];

    for (let i = 0; i < data.length; i++) {
      if (!data[i].paragraph) continue;
      if (data[i].x < -data[i].width) continue;
      data[i].x = data[i].x - speed;
      next.push(data[i]);
    }

    danmakus.value = next;
  });

  useEffect(() => {
    time.value = withRepeat(
      withTiming(1, { duration: 10000, easing: Easing.linear }),
      -1, // 无限循环
      false,
    );
  }, [time]);

  const picture = useDerivedValue(() => {
    const recorder = Skia.PictureRecorder();
    // 初始化画布大小
    const { width, height } = canvasSize.value;
    const canvas = recorder.beginRecording(
      Skia.XYWHRect(0, 0, width || 0, height || 0),
    );

    time.value = time.value - 1;
    danmakus.value.forEach((d) => {
      if (!d.paragraph) return;
      d.paragraph.paint(canvas, d.x, d.y);
    });

    return recorder.finishRecordingAsPicture();
  }, [time, font, canvasSize, opacity]);

  return (
    <Canvas
      onSize={canvasSize}
      style={{ flex: 1, pointerEvents: "none", opacity }}
    >
      <Picture picture={picture} />
    </Canvas>
  );
}
