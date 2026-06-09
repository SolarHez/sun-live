import Tars from '@tars/stream';

// 获取VipBarList响应结构
export class GetCdnTokenInfoExRsp {
  public sFlvToken: string = '';
  public iExpireTime: number = 0;

  static _class() {
    return GetCdnTokenInfoExRsp;
  }

  static _readFrom(is: Tars.TarsInputStream) {
    const data = new GetCdnTokenInfoExRsp();
    data.sFlvToken = is.readString(0, false);
    data.iExpireTime = is.readInt32(1, false);
    return data;
  }
}
