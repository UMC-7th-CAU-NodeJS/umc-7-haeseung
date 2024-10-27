import { pool } from "../db.config.js";

// Review 데이터 삽입
export const addReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    // 존재하는 사용자인지 확인
    const [confirmUser] = await conn.query(
      `SELECT EXISTS(SELECT * FROM user WHERE id = ?) as UserExist;`,
      data.userId
    )

    // 존재하는 가게인지 확인
    const [confirmRestaurant] = await conn.query(
      `SELECT EXISTS(SELECT * FROM restaurant WHERE id = ?) as Restaurant;`,
      data.restaurantId
    )


    const [result] = await conn.query(
      `INSERT INTO review (body, author_id, restaurant_id, stars, is_answered) VALUES (?, ?, ?, ?, ?)`,
      [
        data.body,
        data.author_id,
        data.restaurantId,
        data.stars,
        false
      ]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
}

// 리뷰 정보 get
export const getReview = async (reviewId) => {

  const conn = await pool.getConnection();

  try {
    const [review, ] = await conn.query(
      `SELECT * FROM review WHERE id = ?`,
      [reviewId]
    );

    if (review.length == 0) {
      throw new Error("등록되지 않은 리뷰입니다.");
    }

    return review;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
}