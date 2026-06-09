export interface ClassOptionResponseDto {
  msg?: string;
  status?: number;
  data?: Datum[];
  updateTime?: number;
  type?: number;
}

export interface Datum {
  gid?: number;
  totalCount?: number;
  profileNum?: number;
  gameFullName?: string;
  gameHostName?: string;
  gameType?: number;
  bussType?: number;
  isHide?: number;
}
