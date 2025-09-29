const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();  

//Middleware
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

//DB connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Database connected"))
.catch(err => console.log("❌ DB connection error:", err.message));

// Test route 
app.get("/", (req, res) => {
  res.send("🚀 Backend is running and DB is connected!");
});

//Listen Port
app.listen("3000",()=>{
    console.log("Backend is running on port 3000");
})
