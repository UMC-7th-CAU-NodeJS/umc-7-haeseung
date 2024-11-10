import { responseFromRestaurant } from "../dtos/restaurant.dto.js";
import { 
  addRestaurant as addRestaurantInRepo, 
  getRestaurantById
} from "../repositories/restaurant.repository.js";
import { 
  getLocationByName,
  getLocationById 
} from "../repositories/location.repository.js";
import { 
  getCategoryByName, 
  getCategoryById
} from "../repositories/category.repository.js";
import { 
  addReview as addReviewRepo,
  getReviewById
} from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";
import { getUserById } from "../repositories/user.repository.js";
import { CategoryNotExist, LocationNotExist, MemberNotExist, RestaurantNotExist } from "../errors.js";

// 레스토랑 등록
export const addRestaurant = async (data) => {
  // validation: 장소, 카테고리 조회
  const location = await getLocationByName(data.location);
  if (!location) {
    throw new LocationNotExist({location: data.location});
  }
  const category = await getCategoryByName(data.category);
  if (!category) {
    throw new CategoryNotExist({category: data.category});
  }

  // business logic: 레스토랑 등록
  const joinRestaurantId = await addRestaurantInRepo({
    name: data.name,
    categoryId: category.id,
    locationId: location.id,
    address: data.address,
    status: data.status,
    stars: 0
  });

  // response
  const restaurant = await getRestaurantById(joinRestaurantId);
  const restaurantCategory = await getCategoryById(restaurant.category_id);
  const restaurantLocation = await getLocationById(restaurant.location_id);
  return responseFromRestaurant(restaurant, restaurantLocation, restaurantCategory);
}

// 리뷰 등록
export const addReview = async (data) => {
  // validation: 작성자 및 레스토랑 조회
  if (!await getUserById(data.authorId)) {
    throw new MemberNotExist({authorId: data.authorId});
  }
  if (!await getRestaurantById(data.restaurantId)) {
    throw new RestaurantNotExist({restaurantId: data.restaurantId});
  }

  // business logic: 리뷰 추가
  const joinReviewId = await addReviewRepo({
    authorId: data.authorId,
    restaurantId: data.restaurantId,
    body: data.body,
    stars: data.stars,
    isAnswered: false
  });

  // response
  const review = await getReviewById(joinReviewId);
  return responseFromReview(review);
}