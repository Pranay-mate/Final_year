import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import pdf from 'html-pdf';

import profileRoutes from './routes/profiles.js';
import userRouter from "./routes/user.js";
import skillRouter from "./routes/skills.js";
import educationRouter from "./routes/education.js";
import interestRouter from "./routes/interests.js";
import languageRouter from "./routes/languages.js";
import experienceRouter from "./routes/experience.js";
import projectRouter from "./routes/projects.js";
import certificateRouter from "./routes/certificates.js";
import dashboardRouter from "./routes/dashboard.js"

const app = express();

app.use(bodyParser.json({limit: '30mb', extends: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extends: true}));
app.use(cors()); 

app.use('/score', dashboardRouter);
app.use('/profile', profileRoutes);
app.use("/user", userRouter);
app.use("/skills", skillRouter);
app.use("/education", educationRouter);
app.use("/interests", interestRouter);
app.use("/languages", languageRouter);
app.use("/experience", experienceRouter);
app.use("/projects", projectRouter);
app.use("/certificates", certificateRouter);


const uri = "mongodb+srv://Pranay:Pranay@123@cluster0.i5amh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

  mongoose.set('useFindAndModify', false);