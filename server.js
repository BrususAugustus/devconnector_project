const express = require("express");
const connectDB = require("./config/db")


//Routes
const authRoutes = require("./routes/api/auth")
const postsRoutes = require("./routes/api/posts")
const profileRoutes = require("./routes/api/profile")
const usersRoutes = require("./routes/api/users")
const app = express();

//Connect DB
connectDB();

//Bodyparser
app.use(express.json({extended: false}))

app.get("/", (req,res)=>{
    res.send("API is running.")
})

//Define routes
app.use("/api/users", usersRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/posts", postsRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`)
})