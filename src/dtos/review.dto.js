export const bodyToReview = (body) => {
  return {
    authorId: body.authorId,
    restaurantId: body.restaurantId,
    body: body.body,
    star: body.star
  }
}

export const responseFromReview = (review) => {
  return {
    authorId: review[0].author_id,
    restaurantId: review[0].restaurant_id,
    body: review[0].body,
    star: review[0].star
  }
}