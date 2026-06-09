import Tars from '@tars/stream';

// 获取VipBarList响应结构
export class GetVipBarListRsp {
  //public iStart: number = 0;
  //public iCount: number = 0;
  public iTotal = 0;
  //public vVipBarItem: [];
  public sBadgeName: string = '';
  //public iChangedHighestRank: number = 0;
  public lPid: number = 0;
  //public sVLogo: string = '';
  //public vVipBarUids = [];
  public iTotalNum = 0;
  //public sAvatarUrl = '';
  //public sCardIamge = '';

  static _class() {
    return GetVipBarListRsp;
  }

  static _readFrom(is: Tars.TarsInputStream) {
    const data = new GetVipBarListRsp();
    //data.iStart = is.readInt32(1, false);
    //data.iCount = is.readInt32(2, false);
    data.iTotal = is.readInt32(3, false);
    //data.vVipBarItem = is.readVector(4, false);
    data.sBadgeName = is.readString(5, false);
    //data.iChangedHighestRank = is.readInt32(6, false);
    data.lPid = is.readInt64(7, false);
    //data.sVLogo = is.readString(8, false);
    //data.vVipBarUids = is.readVector(9, false);
    data.iTotalNum = is.readInt32(10, false);
    //data.sAvatarUrl = is.readString(11, false);
    //data.sCardIamge = is.readString(12, false);
    return data;
  }

  _writeTo(os: Tars.TarsOutputStream) {
    //os.writeInt32(1, this.iStart);
    //os.writeInt32(2, this.iCount);
    os.writeInt32(3, this.iTotal);
    //os.writeVector(4, this.vVipBarItem);
    os.writeString(5, this.sBadgeName);
    //os.writeInt32(6, this.iChangedHighestRank);
    os.writeInt64(7, this.lPid);
    //os.writeString(8, this.sVLogo);
    //os.writeVector(9, this.vVipBarUids);
    os.writeInt32(10, this.iTotalNum);
    //os.writeString(11, this.sAvatarUrl);
    //os.writeString(12, this.sCardIamge);
  }
}
