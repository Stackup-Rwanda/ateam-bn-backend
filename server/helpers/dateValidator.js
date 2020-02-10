const dateValidator = (d) => {
  const date = new Date();
  const mydate = new Date(d);
  if (date > mydate) return true;
  return false;
};

export default dateValidator;
