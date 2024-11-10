import { responseFromUserMission } from "../dtos/mission.dto.js";
import { AlreadyExistUserMission, MemberNotExist, MissionNotExist } from "../errors.js";
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
    throw new MemberNotExist({userId: data.userId});
  }
  if (!await getMissionById(data.missionId)) {
    throw new MissionNotExist({missionId: data.missionId});
  }
  if (await getUserMissionByUserIdAndMissionId(data.userId, data.missionId)) {
    throw new AlreadyExistUserMission({
      userId: data.userId,
      missionId: data.missionId
    });
  }

  // business logic
  const joinUserMisisonId = await addMissionToUser(data);

  // response
  const userMission = await getUserMission(joinUserMisisonId);
  return responseFromUserMission(userMission);
}