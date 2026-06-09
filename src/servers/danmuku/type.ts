export interface LiveDanmuItem {
  type: "danmu" | "online";
  name?: string;
  avatar?: string;
  txt?: string;
  color?: string | undefined;
  counts?: any;
  vip?: number;
  hot?: number;
  id?: string;
}
