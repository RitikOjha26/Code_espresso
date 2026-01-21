async function retryWithBackoff (fn, retry=3, delay =500){
    try {
        return await fn();
    }
    catch(error){
        if(retry<=0) throw error;
        await new Promise ((res)=>{setTimeout(res,delay)});
        return retryWithBackoff(fn,retry-1, delay*2);
    }
}

module.exports = retryWithBackoff;