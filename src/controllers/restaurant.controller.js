import { StatusCodes } from "http-status-codes";
import { bodyToRestaurant } from "../dtos/restaurant.dto.js";
import { addRestaurant, addReview, getRestaurantMissionList } from "../services/restaurant.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

export const handleRestaurantAppend = async (req, res, next) => {
  /*
    #swagger.summary = "레스토랑 추가 API";
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              category: { type: "string" },
              location: { type: "string" },
              address: { type: "string" },
              status: { type: "string", example: "open" }
            }  
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "레스토랑 추가 성공",
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
                      name: { type: "string" },
                      category: { type: "string" },
                      location: { type: "string" },
                      address: { type: "string" },
                      status: { type: "string", example: "open" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400-1] = { $ref: "#/components/responses/LocationNotExist" };
    #swagger.responses[400-2] = { $ref: "#/components/responses/CategoryNotExist" };
  */
  console.log("레스토랑 등록을 요청했습니다!");
  console.log("body:", req.body);

  const restaurant = await addRestaurant(bodyToRestaurant(req.body))
  res.status(StatusCodes.OK).success({ result: restaurant });
}

export const handleRestaurantReviewAppend = async (req, res, next) => {
  /*
    #swagger.summary = "레스토랑 리뷰 추가 API";
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              authorId: { type: "number" },
              body: { type: "string" },
              stars: { type: "number", example: "4.5" }
            }  
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "레스토랑 리뷰 추가 성공",
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
                      authorId: { type: "string", example: "0" },
                      restaurantId: { type: "string", example: "0" },
                      body: { type: "string" },
                      stars: { type: "number", example: "4.5" }
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
    #swagger.responses[400-2] = { $ref: "#/components/responses/RestaurantNotExist" };
  */
  console.log("리뷰 등록을 요청했습니다.");
  console.log("body:", req.body);
  console.log("restaurant_id:", req.params.restaurantId);

  const review = await addReview(bodyToReview(req.body, req.params.restaurantId));
  res.status(StatusCodes.OK).success(
    {
      result: JSON.parse(
        JSON.stringify(
          review, (key, value) => typeof value === 'bigint' ? value.toString() : value
        )
      ),
    }
  );
};

export const handleGetRestaurantMissionList = async (req, res, next) => {
  /*
    #swagger.summary = "레스토랑 리뷰 조회 API";
    #swagger.responses[200] = {
      description: "레스토랑 리뷰 조회 성공",
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
                        restaurantId:  { type: "string", example: "0" },
                        content:  { type: "string"},
                        deadline:  { type: "string", example: "2000-02-03T00:00:00.000Z" },
                        point:  { type: "number" }
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
    #swagger.responses[400-2] = { $ref: "#/components/responses/RestaurantNotExist" };
  */
  console.log("레스토랑 미션 조회를 요청했습니다.");
  console.log("restaurant_id:", req.params.restaurantId);

  const missionList = await getRestaurantMissionList(req.params.restaurantId);
  res.status(StatusCodes.OK).success(
    {
      result: JSON.parse(
        JSON.stringify(
          missionList, (key, value) => typeof value === 'bigint' ? value.toString() : value
        )
      ),
    }
  );
};