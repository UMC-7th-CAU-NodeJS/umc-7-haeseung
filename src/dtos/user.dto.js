export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address || "",
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
  };

export const responseFromUser = (user, preferences) => {
  const preferenceList = [];
  for (const preference of preferences) {
    preferenceList.push(preference.category.name);
  }

  return {
    email: user.email,
    name: user.name,
    gender: user.gender,
    birth: user.birth,
    address: user.address,
    phoneNumber: user.phone_number,
    preferences: preferenceList
  }
}

export const updateBodyToUser = (userId, body) => {
  const birth = new Date(body.birth);

  return {
    userId: userId,
    gender: body.gender,
    birth,
    address: body.address || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
}