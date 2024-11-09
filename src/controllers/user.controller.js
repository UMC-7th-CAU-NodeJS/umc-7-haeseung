import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { getReviewsOfUser, userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleGetUserReviewList = async (req, res, next) => {
  console.log("작성한 리뷰 조회를 요청했습니다!");
  console.log("req:", req.params.userId);

  const reviewList = await getReviewsOfUser(req.params.userId);
  res.status(StatusCodes.OK).json(
    {
      result: JSON.parse(
        JSON.stringify(
          reviewList, (key, value) => typeof value === 'bigint' ? value.toString() : value
        )
      ),
    }
  );
};