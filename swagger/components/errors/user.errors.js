// user.errors.js
export const userErrors = {
  MemberNotExist: {
    description: "존재하지 않는 사용자",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U002" },
                reason: { type: "string", example: "존재하지 않는 유저입니다." },
                data: {
                  type: "object",
                  properties: {
                    userId: { type: "string", example: "0" },
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
  AlreadyExistUserEmail: {
    description: "이미 존재하는 사용자 이메일",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U001" },
                reason: { type: "string", example: "이미 존재하는 이메일입니다." },
                data: {
                  type: "object",
                  properties: {
                    userEmail: { type: "string", example: "____@___.___" },
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
