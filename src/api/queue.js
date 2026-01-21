(async () => {
  const pLimit = (await import('p-limit')).default;
  const limit = pLimit(10);

  const queueJob = (fn) => {
    return limit(fn);
  };
  module.exports = queueJob;
})();



