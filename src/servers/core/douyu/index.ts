import { getClassOption } from "./lib/getClassOption";
import { getClassRooms } from "./lib/getClassRooms";
import { getHomeRooms } from "./lib/getHomeRooms";
import { getPlayUrl } from "./lib/getPlayUrl";
import { getRoomInfo } from "./lib/getRoomInfo";
import { searchRoom } from "./lib/searchRoom";

const douyu = {
  getRoomInfo,
  getClassOption,
  searchRoom,
  getHomeRooms,
  getClassRooms,
  getPlayUrl,
};

export default douyu;
