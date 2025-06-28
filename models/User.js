const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true },
  email: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }] 
});

module.exports = mongoose.model("User", userSchema);
