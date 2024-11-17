export const bodyToUserMission = (body, missionId) => {
  return {
    userId: BigInt(body.requesterId),
    missionId: BigInt(missionId)
  }
}

export const responseFromUserMission = (userMission) => {
  return {
    userId: userMission.userId,
    missionId: userMission.missionId,
    status: userMission.status
  }
}

export const responseFromMission = (mission) => {
  return {
    restaurantId: mission.restaurantId,
    content: mission.content,
    deadline: mission.deadline,
    point: mission.point
  }
}

export const responseFromMissionList = (missionList) => {
  const list = [];
  for (const mission of missionList) {
    list.push(responseFromMission(mission));
  }

  return list;
}