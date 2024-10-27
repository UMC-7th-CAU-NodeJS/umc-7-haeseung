import { pool } from "../db.config.js";

// location name 조회
export const getLocationByName = async (locationName) => {
  const conn = await pool.getConnection();

  try {
    const [location, ] = await conn.query(
      `SELECT * FROM location WHERE name = ?`,
      [locationName]
    )

    if (location.length == 0) {
      return null;
    }

    return location;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// location id 조회
export const getLocationById = async (locationId) => {
  const conn = await pool.getConnection();

  try {
    const [location, ] = await conn.query(
      `SELECT * FROM location WHERE id = ?`,
      [locationId]
    )

    if (location.length == 0) {
      return null;
    }

    return location;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};