import { View, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function Test() {
  const singleTap = Gesture.Tap()
    .onEnd(() => {
      console.log("singleTap");
    })
    .runOnJS(true);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      console.log("doubleTap");
    })
    .runOnJS(true);

  const gesture = Gesture.Exclusive(doubleTap, singleTap);

  return (
    <View>
      <GestureDetector gesture={gesture}>
        <View style={{ width: 100, height: 100, backgroundColor: "red" }}>
          <Text>Test</Text>
        </View>
      </GestureDetector>
    </View>
  );
}
