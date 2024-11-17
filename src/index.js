import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleGetUserRestaurantReviewList, handleUserSignUp } from "./controllers/user.controller.js";
import { handleRestaurantAppend, handleRestaurantReviewAppend } from "./controllers/restaurant.controller.js";
import { handleUserMissionAppend } from "./controllers/mission.controller.js";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});