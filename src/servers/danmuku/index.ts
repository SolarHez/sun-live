import { DouyuSocketClient } from "./douyu";
import { HuyaSocketClient } from "./huya";

interface DanmukuApi {
  huya: typeof HuyaSocketClient;
  douyu: typeof DouyuSocketClient;
}

export const danmukuApi: DanmukuApi = {
  huya: HuyaSocketClient,
  douyu: DouyuSocketClient,
};

export default danmukuApi;
