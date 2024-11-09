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
export const getReviewById = async (reviewId) => {
  const review = await prisma.review.findFirst(
    {
      where: {id: reviewId}
    }
  );

  return review;
}

// 리뷰 list get
export const getReviewListWithAuthorNameByAuthorId = async (authorId) => {
  const reviewList = await prisma.review.findMany(
    {
      select: {
        id: true,
        restaurantId: true,
        body: true,
        stars: true,
        updatedAt: true,
        isAnswered: true,
        answer: true,
        answeredAt: true,
        authorId: true,
        author: { select: { name: true } }
      },
      where: { authorId: authorId }
    }
  );
  console.log(reviewList);
  return reviewList;
}