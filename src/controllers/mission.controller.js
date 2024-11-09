import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/mission.dto.js";
import { addUserMission } from "../services/mission.service.js";

export const handleUserMissionAppend = async (req, res, next) => {
  console.log("사용자 미션 할당을 요청했습니다!");
  console.log("body:", req.body);
  console.log("mission_id:", req.params.missionId);

  const userMission = await addUserMission(bodyToUserMission(req.body, req.params.missionId));
  res.status(StatusCodes.OK).json( 
    {
      result: JSON.parse(
        JSON.stringify(
          userMission, (key, value) => typeof value === 'bigint' ? value.toString() : value
          )
      ),
    }
  );
};