import express from "express";

console.log("Starting a new project BugBuddy with Node.js");
const app = express();

app.use("/test", (req, res) => {
    res.send("Hello from test server");
});
app.use("/hello", (req, res) => {
    res.send("Hello from hello server");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
