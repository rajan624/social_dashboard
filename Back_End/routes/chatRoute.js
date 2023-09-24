
const setup = (socket) => {
    socket.on("setup", (userData) => {
      socket.join(userData.id);
      socket.emit("connected",);
    });
}
module.exports = {
  setup,
};