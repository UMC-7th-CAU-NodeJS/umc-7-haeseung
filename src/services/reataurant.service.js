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

  console.log("다시 요청하면?", restaurant[0].category_id)
  console.log(restaurantCategory)

  return responseFromRestaurant(restaurant, restaurantLocation, restaurantCategory);
}