export class DuplicateUserEmailError extends Error {
  errorCode = "U001";
  reason = "이미 존재하는 이메일입니다.";

  constructor(data) {
    super();
    this.data = data;
  }
}

export class MemberNotExist extends Error {
  errorCode = "U002";
  reason = "존재하지 않는 유저입니다.";

  constructor(data) {
    super();
    this.data = data;
  }
}

export class RestaurantNotExist extends Error {
  errorCode = "R001";
  reason = "존재하지 않는 레스토랑입니다.";

  constructor(data) {
    super();
    this.data = data;
  }
}

export class LocationNotExist extends Error {
  errorCode = "L001";
  reason = "등록되지 않은 장소입니다.";

  constructor(data) {
    super();
    this.data = data;
  }
}

export class CategoryNotExist extends Error {
  errorCode = "C001";
  reason = "등록되지 않은 카테고리입니다.";

  constructor(data) {
    super();
    this.data = data;
  }
}

export class MissionNotExist extends Error {
  errorCode = "M001";
  reason = "없는 미션입니다.";

  constructor(data) {
    super();
    this.data = data;
  }
}

export class AlreadyExistUserMission extends Error {
  errorCode = "M002";
  reason = "이미 수행 중이거나 완료 설정된 미션입니다.";

  constructor(data) {
    super();
    this.data = data;
  }
}

export class UserMissionNotExist extends Error {
  errorCode = "M003";
  reason = "존재하지 않는 유저 미션 입니다.";

  constructor(data) {
    super();
    this.data = data;
  }
}

export class UserMissionAlreadyCleared extends Error {
  errorCode = "M004";
  reason = "이미 수행 완료 상태인 미션입니다.";

  constructor(data) {
    super();
    this.data = data;
  }
}