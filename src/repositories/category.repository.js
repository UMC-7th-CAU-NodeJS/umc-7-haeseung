import { pool } from "../db.config.js";

// category 이름으로 조회
export const getCategoryByName = async (categoryName) => {
  const conn = await pool.getConnection();

  try {
    const [category, ] = await conn.query(`SELECT * FROM food_category WHERE name = ?;`, [categoryName]);

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

// category id로 조회
export const getCategoryById = async (categoryId) => {
  const conn = await pool.getConnection();

  try {
    const [category, ] = await conn.query(`SELECT * FROM food_category WHERE id = ?;`, [categoryId]);

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