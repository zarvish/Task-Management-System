const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const connectToDB = require("./mongoConnection");
const app = express();
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Apply CORS middleware to allow cross-origin requests
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Health route to check if the server is running
app.get("/health", (req, res) => {
  res.send("ok");
});

// Connect to MongoDB
connectToDB();

app.use("/api", taskRoutes);

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
