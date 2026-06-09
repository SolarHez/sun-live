import { useEffect, useRef, useState } from "react";
import { View, Button } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [htmlSource, setHtmlSource] = useState<string | null>(null);

  const initWebView = async () => {
    try {
      // 1. 获取脚本
      const res = await axios.get(
        `https://www.douyu.com/swf_api/homeH5Enc?rids=63136`,
      );
      const jsCode = res.data.data.room63136;

      // 2. 动态生成 HTML
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
          </head>
          <body>
            <script>${jsCode}</script>
            <script>
              // 确保在 CryptoJS 加载完成后再执行
              window.document.addEventListener('message', function(e) {
                try {
                  const { room_id, did, time } = JSON.parse(e.data);
                  
                  // 调试用：检查 CryptoJs 是否存在
                  if (typeof CryptoJS === 'undefined') {
                    window.ReactNativeWebView.postMessage("Error: CryptoJS still not defined");
                    return;
                  }

                  const result = window.ub98484234(room_id, did, time);
                  window.ReactNativeWebView.postMessage(result);
                } catch (err) {
                  window.ReactNativeWebView.postMessage("Exec Error: " + err.message);
                }
              });
            </script>
          </body>
        </html>
      `;
      setHtmlSource(html);
    } catch (e) {
      console.error("加载脚本失败", e);
    }
  };

  useEffect(() => {
    initWebView();
  }, []);

  const runDecrypt = () => {
    const params = {
      room_id: 63136,
      did: "10000000000000000000000000001501",
      time: Math.floor(Date.now() / 1000),
    };
    webViewRef.current?.postMessage(JSON.stringify(params));
  };

  const getUrl = async (sgin: string) => {
    const { data } = await axios.post(
      "https://www.douyu.com/lapi/live/getH5Play/63136",
      sgin,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.43",
          referer: `https://www.douyu.com/63136`,
        },
      },
    );
    console.log(data.data.rtmp_url + "/" + data.data.rtmp_live + "&rate=0");
  };

  return (
    <View style={{ flex: 1 }}>
      {htmlSource && (
        <WebView
          ref={webViewRef}
          source={{ html: htmlSource }}
          onMessage={async (event) => {
            console.log("解密结果:", event.nativeEvent.data);
            await getUrl(event.nativeEvent.data);
          }}
          style={{ height: 0, width: 0 }}
        />
      )}
      <Button title="运行解密" onPress={runDecrypt} />
    </View>
  );
}
