export default (fn) => async () => {
  try {
    await fn();
  } catch (err) {
    console.error(err);
  }
};
