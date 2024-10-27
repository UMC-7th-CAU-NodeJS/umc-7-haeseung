import { pool } from "../db.config.js";

// Restaurant 데이터 삽입
export const addRestaurant = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO restaurant (name, category_id, location_id, address, status, stars) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.category_id,
        data.location_id,
        data.address,
        data.status,
        0
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

// Restaurant 조회
export const getRestaurant = async (restaurantId) => {
  const conn = await pool.getConnection();

  try {
    const [restaurant, ] = await conn.query(
      `SELECT * FROM restaurant WHERE id = ?`,
      restaurantId
    );

    if (restaurant.length == 0) {
      return null;
    }

    return restaurant;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};