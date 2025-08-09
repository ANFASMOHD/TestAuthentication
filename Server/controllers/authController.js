const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Modals/User");




// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// 📌 REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { fullName, email, mobileNumber, password, role } = req.body;

    // Check if email or mobile already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { mobileNumber }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email or Mobile already exists" });
    }

    // Prepare user data
    const userData = {
      fullName,
      email,
      mobileNumber,
      password,
      role: role || "student",
    };

    // Generate enrollment ID only for students
    if (role === "student" || !role) {
      userData.enrollmentId = `ENR${new Date().getFullYear()}${Math.floor(
        1000 + Math.random() * 9000
      )}`;
    }

    // Create user
    const user = await User.create(userData);

    res.status(201).json({
      message: "Registered successfully",
      token: generateToken(user._id),
      user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        enrollmentId: user.enrollmentId || null, // null for non-students
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 LOGIN USER
const loginUser = async (req, res) => {
  const { mobileNumber, password } = req.body;
  try {
    const user = await User.findOne({ mobileNumber });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 GET LOGGED-IN USER
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    console.log("*********",user)
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser, getMe };
