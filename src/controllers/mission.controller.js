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
    #swagger.responses[400] = {
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
                      userId: { type: "string", example: "0" },
                      missionId: { type: "string", example: "0" }
                    }
                  }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
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