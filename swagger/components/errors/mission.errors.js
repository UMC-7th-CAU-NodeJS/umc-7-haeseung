// mission.errors.js
export const missionErrors = {
  MissionNotExist: {
    description: "존재하지 않는 미션",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "M001" },
                reason: { type: "string", example: "없는 미션입니다." },
                data: {
                  type: "object",
                  properties: {
                    missionId: { type: "string", example: "0" },
                  },
                },
              },
            },
            success: { type: "object", nullable: true, example: null },
          },
        },
      },
    },
  },
  AlreadyExistUserMission: {
    description: "이미 수행 중이거나 완료된 미션",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "M002" },
                reason: { type: "string", example: "이미 수행 중이거나 완료 설정된 미션입니다." },
                data: {
                  type: "object",
                  properties: {
                    missionId: { type: "string", example: "0" },
                  },
                },
              },
            },
            success: { type: "object", nullable: true, example: null },
          },
        },
      },
    },
  },
  UserMissionNotExist: {
    description: "존재하지 않는 유저 미션",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "M003" },
                reason: { type: "string", example: "존재하지 않는 유저 미션 입니다." },
                data: {
                  type: "object",
                  properties: {
                    userMissionId: { type: "string", example: "0" },
                  },
                },
              },
            },
            success: { type: "object", nullable: true, example: null },
          },
        },
      },
    },
  },
  UserMissionAlreadyCleared: {
    description: "이미 수행 완료 상태인 미션",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "M004" },
                reason: { type: "string", example: "이미 수행 완료 상태인 미션입니다." },
                data: {
                  type: "object",
                  properties: {
                    userMissionId: { type: "string", example: "0" },
                  },
                },
              },
            },
            success: { type: "object", nullable: true, example: null },
          },
        },
      },
    },
  },
};
