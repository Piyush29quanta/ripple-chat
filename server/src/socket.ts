import { Server ,Socket} from "socket.io";
import prisma from "./config/db.config.js";

interface CustomSocket extends Socket { 
   room?: string;
}

export function setupSocket(io: Server) {
 io.use((socket:CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room; // Get the room from the handshake auth or headers
    if (!room) { 
      return next(new Error("Room not provided"));
    }
    socket.room = room; // Store the room in the socket object
     next();
 })

  io.on("connection", (socket:CustomSocket) => {

    // Join the room specified in the handshake auth
    socket.join(socket.room); 
  

   socket.on("message", async(data) => {
      console.log("Message received:", data);
      //socket.broadcast.emit("message", data);
      await prisma.chats.create({
        data: data,
      });
      socket.to(socket.room).emit("message", data); // Emit to the specific room

    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
}
