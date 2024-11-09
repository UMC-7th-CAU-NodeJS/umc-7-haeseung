import { prisma } from "../db.config.js";

// category 이름으로 조회
export const getCategoryByName = async (categoryName) => {
  const category = await prisma.foodCategory.findFirst(
    {
      where: {name: categoryName}
    }
  );

  if (!category) {
    return null;
  }

  return category;
};

// category id로 조회
export const getCategoryById = async (categoryId) => {
  const category = await prisma.foodCategory.findFirst(
    {
      where: {id: categoryId}
    }
  )

  if (!category) {
    return null;
  }    
  
  return category;
};