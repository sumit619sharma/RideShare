import {Server} from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";

let io;

export function initializeSocket(server) {
  io = new  Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });

{/** 
      // send updated location to user if there's an active ride
      const captain = await captainModel.findById(userId).populate('currentRide');
      if (captain.currentRide) { 
        const ride = captain.currentRide;
        const user = await userModel.findById(ride.userId);
        if (user && user.socketId) {
          io.to(user.socketId).emit("captain-location-updated", {
            captainId: userId,
            location,
          });
        } else {
          console.log("User not found or has no socketId");
        }
      }
*/}

    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

export function sendMessageToSocketId(socketId, messageObject) {
  console.log(messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
}
