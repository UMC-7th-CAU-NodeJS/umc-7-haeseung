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

export const responseFromUser = (user) => {
    return {
        email: user[0].email,
        name: user[0].name,
        gender: user[0].gender,
        birth: user[0].birth,
        address: user[0].address,
        phoneNumber: user[0].phone_number
    }
}