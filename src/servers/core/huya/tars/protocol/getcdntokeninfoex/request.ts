import Tars from '@tars/stream';
/**
 * CDN 令牌请求结构 发送打包加密 VipListReq
 */
export class GetCdnTokenInfoExReq {
  public sFlvUrl: string = '';
  public sStreamName: string = '';
  public iLoopTime: number = 0;
  public tId: UserId = new UserId();
  public iAppId: number = 66;

  static _class() {
    return GetCdnTokenInfoExReq;
  }

  _writeTo(os: Tars.TarsOutputStream) {
    os.writeString(0, this.sFlvUrl);
    os.writeString(1, this.sStreamName);
    os.writeInt32(2, this.iLoopTime);
    os.writeStruct(3, this.tId);
    os.writeInt32(4, this.iAppId);
  }
}

// 用户ID结构
export class UserId {
  public lUid: number = 0;
  public sGuid = '';
  public sToken = '';
  public sHuYaUA = '';
  public sCookie = '';
  public iTokenType: number = 0;
  public sDeviceInfo = '';
  public sQIMEI = '';

  static _class() {
    return UserId;
  }

  static _readFrom(is: Tars.TarsInputStream) {
    const data = new UserId();
    data.lUid = is.readInt64(0, false);
    data.sGuid = is.readString(1, false);
    data.sToken = is.readString(2, false);
    data.sHuYaUA = is.readString(3, false);
    data.sCookie = is.readString(4, false);
    data.iTokenType = is.readInt32(5, false);
    data.sDeviceInfo = is.readString(6, false);
    data.sQIMEI = is.readString(7, false);
    return data;
  }

  _writeTo(os: Tars.TarsOutputStream) {
    os.writeInt64(0, this.lUid);
    os.writeString(1, this.sGuid);
    os.writeString(2, this.sToken);
    os.writeString(3, this.sHuYaUA);
    os.writeString(4, this.sCookie);
    os.writeInt32(5, this.iTokenType);
    os.writeString(6, this.sDeviceInfo);
    os.writeString(7, this.sQIMEI);
  }
}
