import { pool } from "../db.config.js";

// category id 조회
export const getCategoryId = async (categoryName) => {
  const conn = await pool.getConnection();

  try {
    const [category, ] = await conn.query(
      `SELECT * FROM category WHERE name = ?`,
      categoryName
    )

    if (category.length == 0) {
      return null;
    }

    return category;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};