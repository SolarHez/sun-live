export interface HomeRoomsResponseDto {
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
  c2url?: string;
  c2url_display?: string;
  c2name?: string;
  c2name_display?: string;
  rs16?: string;
  rs16_cover_id?: number;
  rs16_avif?: string;
  rs_ext?: RsEXT[];
  chanid?: number;
  icv3?: Icv3[] | null;
  authInfo?: AuthInfo;
  roomLabel?: string[];
  dot?: number;
  edot?: number;
  rt?: number;
  rst?: number;
  rsst?: number;
  url?: string;
  dotV1?: DotV1;
  isBigRec?: number;
}

export interface AuthInfo {
  type?: number;
  desc?: Desc;
  descV2?: DescV2;
}

export enum Desc {
  Empty = "",
  和平小店掌柜 = "和平小店掌柜",
  斗鱼和平带货达人 = "斗鱼和平带货达人",
  新游全能攻略 = "新游全能攻略",
}

export enum DescV2 {
  Empty = "",
  S30赛季巅峰榜第1 = "S30赛季巅峰榜第1",
  知名游戏主播 = "知名游戏主播",
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
  fontColor?: FontColor;
}

export enum FontColor {
  Ffffff = "#FFFFFF",
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
