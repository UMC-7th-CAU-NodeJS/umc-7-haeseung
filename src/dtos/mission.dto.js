export const bodyToUserMission = (body, missionId) => {
  return {
    userId: body.requesterId,
    missionId: missionId
  }
}

export const responseFromUserMission = (userMission) => {
  return {
    userId: userMission.userId,
    missionId: userMission.missionId,
    status: userMission.status
  }
}