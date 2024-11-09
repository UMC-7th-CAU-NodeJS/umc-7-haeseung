import { prisma } from "../db.config.js";

// Restaurant 데이터 삽입
export const addRestaurant = async (data) => {
  const created = await prisma.restaurant.create(
    {
      data: data
    }
  );

  return created.id;
}

// Restaurant 조회
export const getRestaurant = async (restaurantId) => {
  const restaurant = await prisma.restaurant.findFirst(
    {
      where: {id: restaurantId}
    }
  );
  
  return restaurant;
};