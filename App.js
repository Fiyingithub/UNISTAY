import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { sequelize } from "./config/db.config.js";
import routes from "./routes/index.js";
import swaggerSpec from "./swager/swagger.js";
import swaggerUi from 'swagger-ui-express'

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// CORS
const corsOptions = {
  origin: ["*", "http://localhost:9000"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes
app.use('/api', routes)

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Welcome to Unistay Backend App");
});

sequelize.sync({alter: true})
.then(()=> {
    app.listen(PORT, () => {
        console.log(`Server is currently running on port: ${PORT}`);
    });

})
.catch((err)=>{
    console.log("An error occur while connection to db", err)
})

