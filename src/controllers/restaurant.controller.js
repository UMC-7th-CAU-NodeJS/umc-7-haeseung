import { StatusCodes } from "http-status-codes";
import { bodyToRestaurant } from "../dtos/restaurant.dto.js";
import { addRestaurant, addReview } from "../services/reataurant.service.js";
import { bodyToReview } from "../dtos/review.dto.js";

export const handleRestaurantAppend = async (req, res, next) => {
  console.log("레스토랑 등록을 요청했습니다!");
  console.log("body:", req.body);

  const restaurant = await addRestaurant(bodyToRestaurant(req.body))
  res.status(StatusCodes.OK).json({ result: restaurant });
}

export const handleRestaurantReviewAppend = async (req, res, next) => {
  console.log("리뷰 등록을 요청했습니다.");
  console.log("body:", req.body);
  console.log("restaurant_id:", req.params.restaurantId);

  const review = await addReview(bodyToReview(req.body, req.params.restaurantId));
  res.status(StatusCodes.OK).json({ result: review });
}