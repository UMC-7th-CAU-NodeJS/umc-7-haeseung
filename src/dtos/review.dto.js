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
    authorId: review.author_id,
    restaurantId: review.restaurant_id,
    body: review.body,
    stars: review.stars
  }
}