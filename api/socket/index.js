const handleJoinRoom = (socket) => (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
};

const handleSendMessage = (socket) => (data) => {
    // data should contain: { roomId, text, sender, ... }
    console.log('Message received:', data);
    // Broadcast to others in the room
    socket.to(data.chatRoomId).emit('receive_message', data);
};

const handleDisconnect = (socket) => () => {
    console.log('User disconnected:', socket.id);
};

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('join_room', handleJoinRoom(socket));
        socket.on('send_message', handleSendMessage(socket));
        socket.on('disconnect', handleDisconnect(socket));
    });
};

module.exports = socketHandler;
