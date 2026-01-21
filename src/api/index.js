const express = require('express')
const limiter = require('../api/rateLimiter.js');
const queueJob = require('../api/queue.js')
const retryWithBackoff = require('../api/throttler.js')
const getAIResponse = require('../api/aiClients.js')
const generatePrompt = require('../api/utils.js');

const router = express.Router();

const minLimiter = limiter.minLimiter;
const dayLimiter = limiter.dayLimiter;
router.post("/ai" , minLimiter, dayLimiter , async (req , res)=>{
    const data = req.body;
    console.log(data);
    if(!data)
    {
        return res.status(400).json({error:"Prompt is Required"});
    }

    const prompt = generatePrompt(data);

    try { 
        // This is failing
        const result = await retryWithBackoff(()=>{
            return getAIResponse(prompt)
        }
    );
    //     const result = await queueJob(()=> retryWithBackoff(()=>{
    //         return getAIResponse(prompt)
    //     }
    // ));
        // const result = await getAIResponse(prompt);
        res.json({output: result})
    }
    catch(error)
    {
        console.log("API Failing here");
        return res.status(500).json({error: error});
    }
});

router.post("/test", (req, res) => {
    console.log('Received test body:', req.body);
    res.json({ received: req.body });
  });

module.exports = router; 