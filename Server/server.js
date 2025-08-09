const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Config/Db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./route/authRoutes"));
app.use("/api/test", require("./route/testRoutes"));
app.use("/api/feedback", require("./route/feedbackRoutes"));
app.use("/api/user/details", require("./route/getFullDetailsRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
