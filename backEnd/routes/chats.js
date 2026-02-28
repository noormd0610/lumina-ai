let express = require('express');
const router = express.Router();
let Thread = require("../models/Threads");
let getOpenApiResponse = require("../utils/openAi");

router.post("/test", async (req, res) => {
    try {
        // Generate a random ID so it doesn't fail the 'unique' constraint
        const randomId = "ID_" + Math.floor(Math.random() * 10000);

        let resData = new Thread({
            threadId: randomId,
            title: "sayed_suleman"
        });

        let data = await resData.save();
        res.status(201).json(data);
    } catch (err) {
        console.error("Save Error:", err.message);
        res.status(500).send("Database Error: " + err.message);
    }
});




//All Threads Data 
router.get("/threads", async (req, res) => {

    try {
        let threadsData = await Thread.find({});

        if (!threadsData) {
            console.log("threads data is not exists");
            res.send(err);
        }

        console.log(threadsData);
        res.send(threadsData);

    } catch (e) {
        console.log("error occur in threads router");
        res.send(err);
    }
})

router.get("/thread/:threadId", async (req, res) => {
    let { threadId } = req.params;

    try {
        let threadData = await Thread.findById(threadId);

        if (!threadData) {
            console.log("thread data is not exists");
            res.send(err);
        }

        console.log(threadData);
        res.send(threadData);

    } catch (e) {
        console.log("error occur in threads router");
        res.send(e);
    }
})

//delete ThreadId
router.delete("/thread/:threadId", async (req, res) => {
    let { threadId } = req.params;

    try {
        let threadData = await Thread.findByIdAndDelete(threadId);

        if (!threadData) {
            console.log("thread data is not exists");
            res.send(err);
        }

        console.log(threadData);
        res.send(threadData);

    } catch (e) {
        console.log("error occur in threads router");
        res.send(e);
    }
})


router.post("/chats", async (req, res) => {

    let { threadId, message } = req.body;
    
    if (!threadId || !message) {
        return res.status(400).json({ error: "threadId and message are required" });
    }

    try {
        let thread = await Thread.findOne({ threadId: threadId });

        //1
        if (!thread) {
            //create new thread

            thread = new Thread({
                threadId,
                title: message,
                messages: [{ role: "user", content: message }]
            })

        } else {
            thread.messages.push({ role: "user", content: message });
        }


        let openAiAssistantRes = await getOpenApiResponse(message);
        thread.messages.push({ role: "assistant", content: openAiAssistantRes });
        thread.updatedAt = new Date();
        let data = await thread.save();
        console.log(data);
        res.json({ reply: openAiAssistantRes });

    } catch (e) {
        console.log(e + " error occured in chats route");
        res.send(e);
    }


})




module.exports = router;