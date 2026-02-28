require('dotenv').config()

let getOpenApiResponse = async (message) => {

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: message }]
        })
    });

    const data = await response.json();
    let resData = data.choices[0].message.content;
    return resData;
}

module.exports = getOpenApiResponse;