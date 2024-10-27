import { responseFromRestaurant } from "../dtos/restaurant.dto.js";
import { 
  addRestaurant as addRestaurantInRepo, 
  getRestaurant
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
  getReview
} from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const addRestaurant = async (data) => {
  const location = await getLocationByName(data.location);
  const category = await getCategoryByName(data.category);

  const joinRestaurantId = await addRestaurantInRepo({
    name: data.name,
    category_id: category[0].id,
    location_id: location[0].id,
    address: data.address,
    status: data.status
  });

  if (joinRestaurantId === null) {
    throw new Error("오류가 발생했습니다.");
  }

  const restaurant = await getRestaurant(joinRestaurantId);
  const restaurantCategory = await getCategoryById(restaurant[0].category_id);
  const restaurantLocation = await getLocationById(restaurant[0].location_id);

  return responseFromRestaurant(restaurant, restaurantLocation, restaurantCategory);
}

// 리뷰 등록
export const addReview = async (data) => {
  const joinReviewId = await addReviewRepo({
    authorId: data.authorId,
    restaurantId: data.restaurantId,
    body: data.body,
    stars: data.stars
  });

  if (joinReviewId === null) {
    throw new Error("오류가 발생했습니다.");
  }

  const review = await getReview(joinReviewId);

  return responseFromReview(review);
}