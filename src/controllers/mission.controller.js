import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/mission.dto.js";
import { addUserMission, changeMissionStatusToClear } from "../services/mission.service.js";

export const handleUserMissionAppend = async (req, res, next) => {
  console.log("미션 추가를 요청했습니다!");
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
  res.status(StatusCodes.OK).json(
    {
      result: JSON.parse(
        JSON.stringify(
          userMission, (key, value) => typeof value === 'bigint' ? value.toString() : value
        )
      ),
    }
  );
}