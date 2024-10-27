import { StatusCodes } from "http-status-codes";
import { bodyToRestaurant } from "../dtos/restaurant.dto.js";
import { addRestaurant } from "../services/reataurant.service.js";

export const handleRestaurantAppend = async (req, res, next) => {
  console.log("레스토랑 등록을 요청했습니다!");
  console.log("body:", req.body);

  const restaurant = await addRestaurant(bodyToRestaurant(req.body))
  res.status(StatusCodes.OK).json({ result: restaurant });
}