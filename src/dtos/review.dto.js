export const bodyToReview = (body, restaurantId) => {
  return {
    authorId: body.authorId,
    restaurantId: restaurantId,
    body: body.body,
    stars: body.stars
  }
}

export const responseFromReview = (review) => {
  return {
    authorId: review.authorId,
    restaurantId: review.restaurantId,
    body: review.body,
    stars: review.stars
  }
}

export const responseFromReviewList = (reviews) => {
  const result = [];
  for (const review of reviews) {
    result.push({
      authorId: review.authorId,
      authorName: review.author.name,
      restaurantId: review.restaurantId,
      body: review.body,
      stars: review.stars,
      updatedAt: review.updatedAt,
      isAnswered: review.isAnswered,
      answer: review.answer,
      answeredAt: review.answeredAt
    });
  }

  return result;
}