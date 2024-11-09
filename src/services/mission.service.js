import { responseFromUserMission } from "../dtos/mission.dto.js";
import { 
  addMissionToUser,
  getMissionById,
  getUserMission,
  getUserMissionByUserIdAndMissionId
} from "../repositories/mission.repository.js";
import { getUserById } from "../repositories/user.repository.js"

export const addUserMission = async (data) => {
  // validation: 사용자 존재 유무, 미션 존재 유무, 수락 완료된 미션 여부
  if (!await getUserById(data.userId)) {
    throw new Error("없는 사용자입니다.");
  }
  if (!await getMissionById(data.missionId)) {
    throw new Error("없는 미션입니다.");
  }
  if (await getUserMissionByUserIdAndMissionId(data.userId, data.missionId)) {
    throw new Error("이미 수행 중이거나 완료 설정된 미션입니다.");
  }

  // business logic
  const joinUserMisisonId = await addMissionToUser(data);

  // response
  const userMission = await getUserMission(joinUserMisisonId);
  return responseFromUserMission(userMission);
}