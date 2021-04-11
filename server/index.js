import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import skillRouter from "./routes/skills.js";

const app = express();

app.use(bodyParser.json({limit: '30mb', extends: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extends: true}));
app.use(cors()); 

app.use('/profile', postRoutes);
app.use("/user", userRouter);
app.use("/skills", skillRouter);

const uri = "mongodb+srv://Pranay:Pranay@123@cluster0.i5amh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

  mongoose.set('useFindAndModify', false);