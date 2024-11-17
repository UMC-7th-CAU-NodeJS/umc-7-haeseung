import { responseFromUserMission } from "../dtos/mission.dto.js";
import { AlreadyExistUserMission, MemberNotExist, MissionNotExist, UserMissionAlreadyCleared, UserMissionNotExist } from "../errors.js";
import { 
  addMissionToUser,
  getMissionById,
  getUserMission,
  getUserMissionByUserIdAndMissionId,
  setUserMissionClear
} from "../repositories/mission.repository.js";
import { getUserById } from "../repositories/user.repository.js"

// 사용자에게 가게의 미션을 추가
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

// 미션의 상태 클리어로 변경
export const changeMissionStatusToClear = async (userMissionId) => {
  // validation: 사용자 미션 존재 유무, 현재 상태
  const userMission = await getUserMission(userMissionId);
  if (!userMission) {
    throw new UserMissionNotExist({userMissionId: userMissionId});
  } else if (userMission.status == "clear") {
    throw new UserMissionAlreadyCleared({userMissionId: userMissionId});
  }

  // business logic
  const updatedUserMission = await setUserMissionClear(userMissionId);

  // response
  return responseFromUserMission(updatedUserMission);
}