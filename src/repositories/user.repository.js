import { pool } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await conn.query(
      `SELECT EXISTS(SELECT * FROM user WHERE email = ?) as isExistEmail;`,
      data.email
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result] = await conn.query(
      `INSERT INTO user (email, name, gender, birth, address, phone_number) VALUES (?, ?, ?, ?, ?, ?);`,
      [
        data.email,
        data.name,
        data.gender,
        data.birth,
        data.address,
        data.phoneNumber,
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
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [user, ] = await conn.query(`SELECT * FROM user WHERE id = ?;`, userId);

    if (user.length == 0) {
      return null;
    }

    return user;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategory) => {

  const conn = await pool.getConnection();
  
  // 음식 카테고리에서 ID 뽑아오기
  try {
    const [category, ] = await conn.query(`SELECT * FROM food_category WHERE name = ?;`, foodCategory);

    if (category.length == 0) {
      return null;
    }
    console.log(category[0].id)
    await conn.query(
      `INSERT INTO user_prefer (category_id, user_id) VALUES (?, ?);`,
      [category[0].id, userId]
    );

    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await conn.query(
      "SELECT ufc.id, ufc.category_id, ufc.user_id, fcl.name " +
        "FROM user_prefer ufc JOIN food_category fcl on ufc.category_id = fcl.id " +
        "WHERE ufc.user_id = ? ORDER BY ufc.category_id ASC;",
      userId
    );

    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
