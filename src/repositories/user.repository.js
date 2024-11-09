import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst(
    {
      where: {email: data.email}
    }
  );


  const created = await prisma.user.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirst(
    {
      where: {id: userId}
    }
  );

  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategory) => {
  const category = await prisma.foodCategory.findFirst(
    {
      where: {name: foodCategory}
    }
  );

  await prisma.userPrefer.create(
    {
      data: {
        userId: userId,
        categoryId: category.id
      }
    }
  );
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userPrefer.findMany({
    select: {
      id: true,
      userId: true,
      categoryId: true,
      category: {
        select: {
          name: true,
        },
      },
    },
    where: {userId: userId},
    orderBy: {categoryId: "asc"},
  });
  console.log(preferences)
  return preferences;
};

// 사용자 조회
export const getUserById = async (userId) => {
  const user = await prisma.user.findFirst(
    {
      where: {id: userId}
    }
  );

  return user;
}