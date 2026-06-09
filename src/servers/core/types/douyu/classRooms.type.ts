export interface ClassRoomsResponseDto {
  code?: number;
  msg?: string;
  data?: Data;
}

export interface Data {
  rl?: Rl[];
  userRecommendRec?: boolean;
}

export interface Rl {
  type?: number;
  rid?: number;
  rn?: string;
  uid?: number;
  nn?: string;
  cid1?: number;
  cid2?: number;
  cid2_display?: number;
  cid3?: number;
  av?: string;
  ol?: number;
  c2url?: C2URL;
  c2url_display?: C2URL;
  c2name?: C2Name;
  c2name_display?: C2Name;
  rs16?: string;
  rs16_cover_id?: number;
  rs16_avif?: string;
  rs_ext?: RsEXT[];
  chanid?: number;
  icv3?: Icv3[] | null;
  authInfo?: AuthInfo;
  dot?: number;
  edot?: number;
  rst?: number;
  rsst?: number;
  url?: string;
  dotV1?: DotV1;
  isBigRec?: number;
  roomLabel?: string[];
  rt?: number;
}

export interface AuthInfo {
  type?: number;
  desc?: Desc;
  descV2?: string;
}

export enum Desc {
  Empty = "",
  MdI世界冠军 = "MDI世界冠军",
}

export enum C2Name {
  魔兽世界 = "魔兽世界",
}

export enum C2URL {
  DirectoryGameWOW = "/directory/game/WOW",
}

export interface DotV1 {
  _rec_t?: string;
  _rank?: string;
  _rpos?: string;
  _rec_pos?: string;
  _rt_s?: string;
  _rt_ss?: string;
  _expose_cardid?: string;
}

export interface Icv3 {
  cfgType?: number;
  cfgRich?: CFGRich;
  iconId?: string;
}

export interface CFGRich {
  addr?: string;
  backColor?: string;
  rightBackColor?: string;
  text?: string;
  fontColor?: string;
}

export interface RsEXT {
  type?: Type;
  rs16?: string;
  ratio?: number;
}

export enum Type {
  ImageAvif = "image/avif",
  ImageWebp = "image/webp",
}
