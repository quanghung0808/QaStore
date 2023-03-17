const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth-routes");
const fileUpload = require("express-fileupload");

const connect = require("./database/database")

const phoneRouter = require("./routes/phone-routes");
const categoryRouter = require("./routes/category-routes");
const cartRouter = require("./routes/cart-routes");
// const commonRouter = require("./routes/common-routes");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(`mongodb://127.0.0.1:27017/assingment3`, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.log(error.message);
//     process.exit(1);
//   }
// };

// connectDB();

const app = express();



app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRouter.routes);
app.use("/api/phones", phoneRouter.routes);
app.use("/api/categories", categoryRouter.routes);
app.use("/api/cart", cartRouter.routes);


app.use(express.static("/uploads"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, async() => {
    await connect()
    console.log(`Server started on port ${PORT}`)
}
);

