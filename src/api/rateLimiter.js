const {rateLimit} = require("express-rate-limit")

const minLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    message: "To many requests please wait for some time",
    standardHeaders: true,
    legacyHeaders: false,
})
const dayLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 1 day
    max: 1500, // 1500 requests per IP per day
    message: "Daily limit reached. Try again tomorrow!",
    standardHeaders: true,
    legacyHeaders: false,
});

const limiter = {minLimiter, dayLimiter};

module.exports = limiter;
