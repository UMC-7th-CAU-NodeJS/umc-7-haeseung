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
  console.log(location)
  console.log(category)
  return {
    name: restaurant[0].name,
    category: category[0].name,
    location: location[0].name,
    address: restaurant[0].address,
    status: restaurant[0].status
  }
}