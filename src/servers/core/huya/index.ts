import { getClassOption } from "./lib/getClassOption";
import { getClassRooms } from "./lib/getClassRooms";
import { getHomeRooms } from "./lib/getHomeRooms";
import { getPlayUrl } from "./lib/getPlayUrl";
import { getRoomInfo } from "./lib/getRoomInfo";
import { getVipOnline } from "./lib/getVipOnline";
import { searchRoom } from "./lib/searchRoom";

const huya = {
  getRoomInfo,
  getClassOption,
  searchRoom,
  getHomeRooms,
  getClassRooms,
  getPlayUrl,
  getVipOnline,
};

export default huya;
