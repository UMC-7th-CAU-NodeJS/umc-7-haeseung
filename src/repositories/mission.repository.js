import { prisma } from "../db.config.js";

// 사용자에게 미션 추가
export const addMissionToUser = async (data) => {
  const created = await prisma.userMission.create(
    {
      data: {
        userId: data.userId,
        missionId: missionId,
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
export const getMission = async (missionId) => {
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