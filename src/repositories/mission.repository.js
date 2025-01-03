import { prisma } from "../db.config.js";

// 사용자에게 미션 추가
export const addMissionToUser = async (data) => {
  const created = await prisma.userMission.create(
    {
      data: {
        userId: data.userId,
        missionId: data.missionId,
        status: "not_clear"
      }
    }
  );

  return created.id;
};

// 사용자 미션 조회
export const getUserMission = async (userMissionId) => {
  const userMission = await prisma.userMission.findFirst(
    {
      where: {id: userMissionId}
    }
  );

  return userMission;
}

// 미션 조회
export const getMissionById = async (missionId) => {
  const mission = await prisma.mission.findFirst(
    {
      where: {id: missionId}
    }
  );

  return mission;
}

// 사용자 미션 조회 (by user id, mission id)
export const getUserMissionByUserIdAndMissionId = async (userId, missionId) => {
  const userMission = await prisma.userMission.findFirst(
    {
      where: {
        userId: userId,
        missionId: missionId
      }
    }
  );

  return userMission;
}

export const getMissionByRestaurantId = async (restaurantId) => {
  const restaurantMission = await prisma.mission.findMany(
    {
      where: {
        restaurantId: restaurantId
      }
    }
  );

  return restaurantMission;
}

// 사용자 미션 클리어로 변환
export const setUserMissionClear = async (userMissionId) => {
  const userMission = await prisma.userMission.update(
    {
      where: {id: userMissionId},
      data: {status: "clear"}
    }
  );

  return userMission;
}