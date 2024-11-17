export const otherErrors = {
  RestaurantNotExist: {
    description: "존재하지 않는 레스토랑",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "R001" },
                reason: { type: "string", example: "존재하지 않는 레스토랑입니다." },
                data: {
                  type: "object",
                  properties: {
                    restaurantId: { type: "string", example: "0" },
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
  LocationNotExist: {
    description: "등록되지 않은 장소",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "L001" },
                reason: { type: "string", example: "등록되지 않은 장소입니다." },
                data: {
                  type: "object",
                  properties: {
                    location: { type: "string", example: "OO동" },
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
  CategoryNotExist: {
    description: "등록되지 않은 카테고리",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "C001" },
                reason: { type: "string", example: "등록되지 않은 카테고리입니다." },
                data: {
                  type: "object",
                  properties: {
                    category: { type: "string", example: "O식" },
                  },
                },
              },
            },
            success: { type: "object", nullable: true, example: null },
          },
        },
      },
    },
  }
}