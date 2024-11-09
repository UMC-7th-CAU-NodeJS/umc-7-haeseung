import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleGetUserRestaurantReviewList, handleUserSignUp } from "./controllers/user.controller.js";
import { handleRestaurantAppend, handleRestaurantReviewAppend } from "./controllers/restaurant.controller.js";
import { handleClearUserMission, handleUserMissionAppend } from "./controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// auth 관련 api
app.post("/api/users/signup", handleUserSignUp);

// 사용자 관련 api
app.get("/api/users/:userId/restaurants/:restaurantId/reviews", handleGetUserRestaurantReviewList);

// restaurant 관련 api
app.post("/api/restaurants/:restaurantId/reviews", handleRestaurantReviewAppend);
app.post("/api/restaurants", handleRestaurantAppend);

// 미션 관련 api
app.post("/api/missions/:missionId", handleUserMissionAppend);
app.patch("/api/user-missions/:userMissionId", handleClearUserMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});