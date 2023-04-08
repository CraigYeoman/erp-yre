module.exports = Promise.all([
  import("./bad-request.mjs"),
  import("./notfound.mjs"),
]);
