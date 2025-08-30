const adminAuth = (_, res, next) => {
    const token = "xyz";
    const authorized = token === "xyz";
    if (!authorized) res.status(401).send("You are not an admin");
    next();
};

const userAuth = (_, res, next) => {
    const token = "user1";
    const authorized = token === "user";
    if (!authorized) res.send("You are not user");
    next();
};
export { adminAuth, userAuth };
