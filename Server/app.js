import express from "express"
import cookieParser from "cookie-parser";

const app = express()


app.use(express.json({limit: "60kb"}))
app.use(express.urlencoded({extended: true, limit: "30kb"}))
app.use(cookieParser())
import userRouter from "./router/user.router.js"

app.get("/",(req,res)=>{
    res.json(process.env.PORT);
})


app.use("/api/v1/user",userRouter)

export {app}