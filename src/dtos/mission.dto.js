export const bodyToUserMission = (body, missionId) => {
  return {
    userId: BigInt(body.requesterId),
    missionId: BigInt(missionId)
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