export class PlayUrlBase {
  rid: number = 0; // 直播间ID
  url: string = ""; // 播放地址
  platform: string = ""; // 平台类型

  static fromDouyu(raw: any) {
    const dto = new PlayUrlBase();
    dto.rid = raw.room_id;
    dto.url = raw.rtmp_url
      ? raw.rtmp_url + "/" + raw.rtmp_live + "&rate=0"
      : "";
    dto.platform = "douyu";
    return dto;
  }

  static fromHuya(raw: any) {
    const dto = new PlayUrlBase();
    dto.rid = raw.room_id;
    dto.url = raw.url;
    dto.platform = "huya";
    return dto;
  }
}
