require('dotenv').config();
const express = require('express');
const app = express();
const urlRoute = require('./routes/url');
const mongoose = require('mongoose');

const URL = require('./models/url');

app.use(express.json())

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
    console.log('Database Connected');
  
}

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId}, {
        $push: {
            visitHistory: { timestamp: Date.now()},
        },
    })
    res.redirect(entry.redirectURL);
})

app.listen(process.env.PORT, ()=>{
    console.log("Server Started");
})