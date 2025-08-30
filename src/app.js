import express from "express";
import { adminAuth, userAuth } from "./middlewares/auth.js";

console.log("Starting a new project BugBuddy with Node.js");
const app = express();

app.use("/admin", adminAuth);
app.get("/admin/getAllData", (req, res) => {
    res.send("Here is all data");
});
app.delete("/admin/deleteAllData", (req, res) => {
    res.send("All data deleted");
});

app.use("/user", userAuth);
app.get("/user", (_, res) => {
    res.send("Here is you data");
});
app.get("/user/login", (_, res) => {
    res.send("Welocme user! login successful");
});

// // Will override below two,
// // app.use("/", (req, res) => {
// //     res.send("Hello from / server");
// // });

// // Match all HTTP method API calls
// // app.use("/test", (req, res) => {
// //     res.send("Hello from test server");
// // });

// // Match to only GET call
// app.get(/ab+c/, (req, res) => {
//     res.send({ username: "Rupesh Ranjan", phone: "9110145120" });
// });
// // Match to /test and /tet
// app.get("/test", (req, res) => {
//     console.log(req.query);
//     res.send({ username: "Rupesh Ranjan", phone: "9110145120" });
// });
// app.get("/test/:userId/:password", (req, res) => {
//     console.log(req.params);
//     res.send({ username: "Rupesh Ranjan", phone: "9110145120" });
// });
// // Match to only POST call
// app.post("/test", (req, res) => {
//     res.send("Data saved successfully");
// });
// // Match to only DELETE call
// app.delete("/test", (req, res) => {
//     res.send("Data deleted successfully");
// });

// app.use(
//     "/user",
//     (req, res, next) => {
//         console.log("Middleware 1");
//         next();
//         console.log("First middleware");
//         //res.send("Handling user API - 1");
//     },
//     (req, res, next) => {
//         console.log("Middleware 2");
//         res.send("Handling user API - 2");
//     }
// );

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
