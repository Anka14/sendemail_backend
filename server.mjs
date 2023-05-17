import express from 'express';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import sendEmail from "./utils/sendEmail.mjs";

const app = express();
dotenv.config();


//Middlewares
app.use(express.json());
app.use(bodyParser.json());
//app.use(express.bodyparser.json());
app.use(cors())

//Route
app.get('/', (req, res) => {
  res.send('home')
})

app.post('/api/sendemail', async (req, res) => {
  const { email } = req.body;
  try {
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = "Thank you message from Anna";
    const message = `
    <h1>Hello Anna, i would like you to be kinder </h1>
    <p>Than you</p>
    <p>ha ha ha</p>
    
    `

    await sendEmail(subject, message, send_to, sent_from, reply_to)
    res.status(200).json({
      success: true, message: "Email sent"
    })
  } catch (err) {
    res.status(500).json(err.message)

  }
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`backend is running on port ${PORT}`)
})