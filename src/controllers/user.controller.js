import { StatusCodes } from "http-status-codes";
import { bodyToUser, updateBodyToUser } from "../dtos/user.dto.js";
import { getReviewsOfUserAndRestaurant, updateUserProfile, userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = "회원가입 API";
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string", example: "test@test.test" },
              name: { type: "string", example: "test" },
              gender: { type: "string", example: "남성" },
              birth: { type: "string", example: "2000-01-01" },
              address: { type: "string" },
              phoneNumber: { type: "string", example: "010-0000-0000" },
              preferences: { 
                type: "array",
                items: { type: "string" }
              }
            }  
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원가입 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: { 
                type: "object",
                properties: {
                  result: {
                    type: "object",
                    properties: {
                      email: { type: "string", example: "test@test.test" },
                      name: { type: "string", example: "test" },
                      gender: { type: "string", example: "남성" },
                      birth: { type: "string", example: "2000-01-01" },
                      address: { type: "string" },
                      preferences: { 
                        type: "array",
                        items: { type: "string" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400-1] = { $ref: "#/components/responses/DuplicateUserEmailError" };
  */
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success({ result: user });
};

export const handleGetUserRestaurantReviewList = async (req, res, next) => {
  /*
    #swagger.summary = "특정 식당에 대한 나의 리뷰 조회 API";
    #swagger.responses[200] = {
      description: "나의 리뷰 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: { 
                type: "object",
                properties: {
                  result: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        authorId: { type: "string", example: "0" },
                        authorName: { type: "string"},
                        restaurantId: { type: "string", example: "0" },
                        body: { type: "string"},
                        stars: { type: "number", example: 4.5 },
                        updatedAt: { type: "string", example: "2024-11-09T16:24:12.849Z" },
                        isAnswered: { type: "boolean" },
                        answer: { type: "string"},
                        answeredAt: { type: "string", example: "2024-11-09T16:24:12.849Z" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400-1] = { $ref: "#/components/responses/MemberNotExist" };
  */
  console.log("작성한 리뷰 조회를 요청했습니다!");

  const reviewList = await getReviewsOfUserAndRestaurant(req.user.id, req.params.restaurantId);
  res.status(StatusCodes.OK).success(
    {
      result: JSON.parse(
        JSON.stringify(
          reviewList, (key, value) => typeof value === 'bigint' ? value.toString() : value
        )
      ),
    }
  );
};

export const handleUpdateUserInfo = async (req, res, next) => {
  /*
    #swagger.summary = "사용자 정보 갱신 API";
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              gender: { type: "string", example: "남성" },
              birth: { type: "string", example: "2000-01-01" },
              address: { type: "string" },
              phoneNumber: { type: "string", example: "010-0000-0000" },
              preferences: { 
                type: "array",
                items: { type: "string" }
              }
            }  
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원가입 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: { 
                type: "object",
                properties: {
                  result: {
                    type: "object",
                    properties: {
                      email: { type: "string", example: "test@test.test" },
                      name: { type: "string", example: "test" },
                      gender: { type: "string", example: "남성" },
                      birth: { type: "string", example: "2000-01-01" },
                      address: { type: "string" },
                      preferences: { 
                        type: "array",
                        items: { type: "string" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400-1] = { $ref: "#/components/responses/DuplicateUserEmailError" };
  */
  console.log("사용자 프로필 갱신을 요청했습니다!");

  const user = await updateUserProfile(updateBodyToUser(req.user.id, req.body));
  res.status(StatusCodes.OK).success(
    {
      result: JSON.parse(
        JSON.stringify(
          user, (key, value) => typeof value === 'bigint' ? value.toString() : value
        )
      ),
    }
  );
}