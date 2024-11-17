import { responseFromReviewList } from "../dtos/review.dto.js";
import { responseFromUser } from "../dtos/user.dto.js";
import { DuplicateUserEmailError, MemberNotExist } from "../errors.js";
import { getReviewListWithAuthorNameByAuthorIdAndRestaurantId } from "../repositories/review.repository.js";
import {
  addUser,
  getUserByEmail,
  getUserById,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  // validation
  if (await getUserByEmail(data.email) != null) {
    throw new DuplicateUserEmailError(data);
  }

  // business logic
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    phoneNumber: data.phoneNumber,
  });

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUserById(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser(user, preferences);
};

// 내가 특정 레스토랑에 쓴 리뷰 요청
export const getReviewsOfUserAndRestaurant = async (userId, restaurantId) => {
  // validation
  if (!await getUserById(userId)) {
    throw new MemberNotExist({userId: userId});
  }

  // business logic
  const reviews = await getReviewListWithAuthorNameByAuthorIdAndRestaurantId(userId, restaurantId);

  // response
  return responseFromReviewList(reviews);
}