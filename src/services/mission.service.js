import { responseFromUserMission } from "../dtos/mission.dto.js";
import { 
  addMissionToUser,
  getUserMission
} from "../repositories/mission.repository.js";

export const addUserMission = async (data) => {
  const joinUserMisisonId = await addMissionToUser(data);
  if (joinUserMisisonId === null) {
    throw new Error("오류가 발생했습니다.");
  }

  const userMission = await getUserMission(joinUserMisisonId);

  return responseFromUserMission(userMission);
}