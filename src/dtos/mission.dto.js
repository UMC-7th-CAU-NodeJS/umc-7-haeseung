export const bodyToUserMission = (body, missionId) => {
  return {
    userId: body.userId,
    missionId: missionId
  }
}

export const responseFromUserMission = (userMission) => {
  return {
    userId: userMission[0].userId,
    missionId: userMission[0].missionId,
    status: userMission[0].status
  }
}