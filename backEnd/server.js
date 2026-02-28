require('dotenv').config();

let express = require('express');
let cors = require('cors');

let app = express();  
let port = 3000;

app.use(cors());      
app.use(express.json());

  
let chatRouter = require("./routes/chats");
let Thread = require("./models/Threads");


//mongoose
const mongoose = require('mongoose');
async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
}
main().catch(err => console.log("Startup Error:", err));


app.use("/api", chatRouter);

app.get("/hello", (req, res) => {
    res.status(200).send("hello");

})

app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
})






