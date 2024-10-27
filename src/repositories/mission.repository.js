import { pool } from "../db.config.js";

// 사용자에게 미션 추가
export const addMissionToUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    // 존재하는 사용자인지 확인
    const [confirmUser] = await conn.query(
      `SELECT EXISTS(SELECT * FROM user WHERE id = ?) as UserExist;`,
      [data.userId]
    );
    if (!confirmUser[0].UserExist) {
      throw new Error("존재하지 않는 유저입니다.");
    }

    // 존재하는 미션인지 확인
    const [confirmMission] = await conn.query(
      `SELECT EXISTS(SELECT * FROM mission WHERE id = ?) as missionExist;`,
      [data.missionId]
    );
    if (!confirmMission[0].missionExist) {
      throw new Error("존재하지 않는 미션입니다.");
    }

    // 진행했거나 진행 중인 미션인지 확인
    const [confirmUserMission] = await conn.query(
      `SELECT EXISTS(SELECT * FROM user_mission WHERE mission_id = ? and user_id = ?) as userMissionExist`,
      [data.missionId, data.userId]
    );
    if (confirmUserMission[0].userMissionExist) {
      throw new Error("이미 완료했거나 진행 중인 미션입니다.");
    }


    const [result] = await conn.query(
      `INSERT INTO user_mission (user_id, mission_id, status) VALUES (?, ?, ?)`,
      [
        data.userId,
        data.missionId,
        "not_clear"
      ]
    );
    return result.insertId
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 미션 조회
export const getUserMission = async (userMissionId) => {
  const conn = await pool.getConnection();

  try {
    const [userMission, ] = await conn.query(`SELECT * FROM user_mission WHERE id = ?`,
      [userMissionId]
    );
    return userMission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
}