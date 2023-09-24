const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const middleware = require("./Middleware/verifyAuthentication");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

app.disable("x-powered-by");
const corsOptions = {
  origin: ["http://localhost:3000"], // Replace with your frontend domain
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
// Set up body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(__dirname, "Static")));

const MongoStore = require("connect-mongo");
const passport = require("passport");
const session = require("express-session");

const passportGoogle = require("./Config/passport-google-oauth2-strategy");
app.use(
  session({
    name: "auth_app",
    secret: "we are testing here",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_Session_URL,
      autoRemove: "interval",
      autoRemoveInterval: 10, // In minutes. Default
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
//routes
const authRouter = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");
const publicRoute = require("./routes/publicRoute");
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
app.use("/api/user", authRouter);
app.use("/api/blog/public", publicRoute);
app.use(middleware.Authentication);
app.use("/api/user", userRoute);
app.use("/api/blog", blogRoute);

module.exports = app;
