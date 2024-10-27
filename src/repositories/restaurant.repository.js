import { pool } from "../db.config.js";

// Restaurant 데이터 삽입
export const addRestaurant = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO user(name, category, location, address, status) VALUES (?, ?, ?, ?, ?)`,
      [
        data.name,
        data.category_id,
        data.location_id,
        data.address,
        data.status
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