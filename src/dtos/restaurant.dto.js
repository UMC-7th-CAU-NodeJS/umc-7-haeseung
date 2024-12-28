export const bodyToRestaurant = (body) => {
  return {
    name: body.name,
    category: body.category,
    location: body.location,
    address: body.address,
    status: body.status
  }
}

export const responseFromRestaurant = (restaurant, location, category) => {
  return {
    name: restaurant.name,
    category: category.name,
    location: location.name,
    address: restaurant.address,
    status: restaurant.status
  }
}