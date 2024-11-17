export const bodyToUserMission = (body, missionId) => {
  return {
    userId: body.requesterId,
    missionId: missionId
  }
}

export const responseFromUserMission = (userMission) => {
  return {
    uesrMissionId: userMission.id,
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