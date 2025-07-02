require("dotenv").config();
const express = require("express");
const connectDb = require("./config/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const noRoute = require("./middleware/noRoute");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const userRouter = require("./routes/user.routes");
const { routes } = require("./routes");
const ActivityControllar = require("./controllar/ActivityControllar");
const app = express();
const port = process.env.PORT ?? 5000;

// connect Database
connectDb().then(() => {
  ActivityControllar();
});

// cors setup
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL,
      "https://nebs-it-uk-client.vercel.app","https://nebs-it.vercel.app","https://nebs-it-md-rakibul-islams-projects-c9411e14.vercel.app",
      "https://nebs-it-uk-client-gicg4vqpo-nebs-its-projects.vercel.app",
      "https://nebs-it-uk-client-git-main-nebs-its-projects.vercel.app","https://nebsit.vercel.app","https://nebs-it.com"
    ],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
// custom middleware

// Routes
app.use("/api/v1", routes);

// Error handling middleware
app.use(noRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
