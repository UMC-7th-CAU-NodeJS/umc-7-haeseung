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
    authorId: review[0].author_id,
    restaurantId: review[0].restaurant_id,
    body: review[0].body,
    stars: review[0].stars
  }
}