import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/mission.dto.js";
import { addUserMission, changeMissionStatusToClear } from "../services/mission.service.js";

export const handleUserMissionAppend = async (req, res, next) => {
  /*
    #swagger.summary = "사용자-미션 추가 API";
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              requesterId: { type: "number" }
            }  
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "사용자 미션 할당 성공",
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
                      "uesrMissionId": { type: "string", example: "0" },
                      "userId": { type: "string", example: "0" },
                      "missionId": { type: "string", example: "0" },
                      "status": { type: "string", example: "not_clear" }
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
    #swagger.responses[400-2] = { $ref: "#/components/responses/MissionNotExist" };
    #swagger.responses[400-3] = { $ref: "#/components/responses/AlreadyExistUserMission" };
  */
  console.log("사용자 미션 할당을 요청했습니다!");
  console.log("body:", req.body);
  console.log("mission_id:", req.params.missionId);

  const userMission = await addUserMission(bodyToUserMission(req.body, req.params.missionId));
  res.status(StatusCodes.OK).success( 
    {
      result: JSON.parse(
        JSON.stringify(
          userMission, (key, value) => typeof value === 'bigint' ? value.toString() : value
        )
      ),
    }
  );
};

export const handleClearUserMission = async (req, res, next) => {
  /*
    #swagger.summary = "사용자-미션 클리어 API";
    #swagger.responses[200] = {
      description: "사용자 미션 성공",
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
                      "uesrMissionId": { type: "string", example: "0" },
                      "userId": { type: "string", example: "0" },
                      "missionId": { type: "string", example: "0" },
                      "status": { type: "string", example: "clear" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400-1] = { $ref: "#/components/responses/UserMissionNotExist" };
    #swagger.responses[400-2] = { $ref: "#/components/responses/UserMissionAlreadyCleared" };
  */
  console.log("미션 상태를 클리어로 변경 요청했습니다!");
  console.log("userMissionId:", req.params.userMissionId);

  const userMission = await changeMissionStatusToClear(req.params.userMissionId);
  res.status(StatusCodes.OK).success(
    {
      result: JSON.parse(
        JSON.stringify(
          userMission, (key, value) => typeof value === 'bigint' ? value.toString() : value
        )
      ),
    }
  );
};