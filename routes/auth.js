const express = require("express");
const router = express.Router();
const admin = require("../firebase-config");
const User = require("../models/User");

// 1) POST /createUser
router.post("/createUser", async (req, res) => {
  const { email, password, nombre, apellido } = req.body;

  try {
    const userRecord = await admin.auth().createUser({ email, password });

    const nuevoUsuario = new User({
      firebaseUid: userRecord.uid,
      email,
      nombre,
      apellido,
    });

    const savedUser = await nuevoUsuario.save();

    res.json({
      mensaje: "Usuario creado exitosamente en Firebase y MongoDB",
      idUsuarioMongo: savedUser._id,
      idUsuarioFirebase: userRecord.uid,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2) POST /logIn
router.post("/logIn", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Simula logIn: en producción deberías verificar con Firebase Auth REST API o desde frontend
    const userList = await admin.auth().getUserByEmail(email);
    const userData = await User.findOne({ firebaseUid: userList.uid }).populate("posts");

    if (!userData) {
      return res.status(404).json({ mensaje: "Usuario no encontrado en MongoDB" });
    }

    res.json({
      email: userData.email,
      nombre: userData.nombre,
      apellido: userData.apellido,
      posts: userData.posts, // luego puedes poblar los posts relacionados
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3) POST /logOut
router.post("/logOut", (req, res) => {
  res.json({ mensaje: "Que tengas un lindo día, hasta luego" });
});

module.exports = router;
