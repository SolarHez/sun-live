import Tars from '@tars/stream';
/**
 * CDN 令牌请求结构 发送打包加密 VipListReq
 */
export class GetVipBarListReq {
  public tUserId: UserId = new UserId();
  public lTid: number = 0;
  public lSid: number = 0;
  public iStart: number = 0;
  public iCount: number = 0;
  public lPid: number = 0;
  public iUidNum: number = 0;

  static _class() {
    return GetVipBarListReq;
  }

  static _readFrom(is: Tars.TarsInputStream) {
    const data = new GetVipBarListReq();
    data.tUserId = is.readStruct(0, false, UserId);
    data.lTid = is.readInt64(1, false);
    data.lSid = is.readInt64(2, false);
    data.iStart = is.readInt32(3, false);
    data.iCount = is.readInt32(4, false);
    data.lPid = is.readInt64(5, false);
    data.iUidNum = is.readInt32(6, false);
    return data;
  }

  _writeTo(os: Tars.TarsOutputStream) {
    os.writeStruct(0, this.tUserId);
    os.writeInt64(1, this.lTid);
    os.writeInt64(2, this.lSid);
    os.writeInt32(3, this.iStart);
    os.writeInt32(4, this.iCount);
    os.writeInt64(5, this.lPid);
    os.writeInt32(6, this.iUidNum);
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
