import captainModel from "../models/captain.model.js";

export const createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }
  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  return captain;
};

export const updateCaptainAfterRide = async (ride) => {
  try {
    const { captain, fare, distance } = ride;

    if (!captain || !captain._id) {
      throw new Error("Captain ID is missing in the ride object");
    }

    // Update captain's totalDistance, totalEarnings, and totalRides
   return await captainModel.findByIdAndUpdate(
      captain._id, // Use captain._id since captain is populated
      {
        $inc: {
          totalDistance: distance?.toFixed(2) || 0, // Increment total distance
          totalEarnings: fare || 0, // Increment total earnings
          totalRides: 1, // Increment total rides
        },
      },
      { new: true } // Return the updated document
    );
  } catch (error) {
    console.error("Error updating captain after ride:", error);
    throw error;
  }
};
