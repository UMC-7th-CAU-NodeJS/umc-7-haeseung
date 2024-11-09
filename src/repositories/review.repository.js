import { prisma } from "../db.config.js";

// Review 데이터 삽입
export const addReview = async (data) => {
  const created = await prisma.review.create(
    {
      data: data
    }
  );

  return created.id;
}

// 리뷰 정보 get
export const getReview = async (reviewId) => {
  const review = await prisma.review.findFirst(
    {
      where: {id: reviewId}
    }
  );

  return review;
}