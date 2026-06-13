import {
  Skia,
  Canvas,
  Picture,
  matchFont,
  TextAlign,
  useFonts,
} from "@shopify/react-native-skia";
import { View, Button } from "react-native";
import { useState } from "react";

export default function MyParagraph() {
  const [picture, setPicture] = useState<any>(null);

  const customFontMgr = useFonts({
    Roboto: [require("../../../assets/fonts/NotoSansSC-Medium.ttf")],
  });

  const addText = () => {
    const recorder = Skia.PictureRecorder();
    const canvas = recorder.beginRecording(Skia.XYWHRect(0, 0, 256, 256));

    if (!customFontMgr) return;
    const paragraphStyle = {
      textAlign: TextAlign.Center,
    };
    const textStyle = {
      color: Skia.Color("black"),
      fontSize: 10,
    };
    const paragraph = Skia.ParagraphBuilder.Make(paragraphStyle, customFontMgr)
      .pushStyle(textStyle)
      .addText("Say Hello to Skia 🙂")
      .pop()
      .build();

    paragraph.layout(256);
    paragraph.paint(canvas, 10, 100);

    // 完成录制并更新状态
    const pic = recorder.finishRecordingAsPicture();
    setPicture(pic);
  };

  // Render the paragraph
  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ width: 256, height: 256 }}>
        {picture && <Picture picture={picture} />}
      </Canvas>
      <Button title="添加文字" onPress={addText} />
    </View>
  );
}
