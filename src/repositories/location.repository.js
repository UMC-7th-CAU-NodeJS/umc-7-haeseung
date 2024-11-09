import { prisma } from "../db.config.js";

// location name 조회
export const getLocationByName = async (locationName) => {
  const location = await prisma.location.findFirst(
    {
      where: {name: locationName}
    }
  );

  return location;
};

// location id 조회
export const getLocationById = async (locationId) => {
  const location = await prisma.location.findFirst(
    {
      where: {id: locationId}
    }
  );
  
  return location;
};