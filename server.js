import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import serverConfig from "./config/server.config.js";
import dbConfig from "./config/db.config.js";

import routes from "./routes/index.js";
import { init } from "./utils/init.js";

async function serverStart() {
  try {
    await mongoose.connect(dbConfig.MONGO_URI);
    console.log(`MongoDB connected`);

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    app.use("/", routes);

    app.use((err, req, res, next) => {
      console.error("Error:", err);
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Something went wrong",
      });
    });
    init();
    app.listen(serverConfig.PORT, () => {
      console.log(`Server is running on port : ${serverConfig.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server: ", error.message);
  }
}

serverStart();
