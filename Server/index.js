import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());  

// limit on the weight of the payload we can sent
app.use(express.json({
    limit: "50mb"
}));

app.get("/",(req,res) => {
    res.status(200).json({
        message: "Hello from DALL.E"
    })
})

app.listen(8080, () => console.log("Server has started on port 8080"));