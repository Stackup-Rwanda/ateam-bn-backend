const checkIdParams = (id) => {
  if (/\s/g.test(id)) {
    return false;
  }
  const integer = Number(id);
  return Number.isInteger(integer);
};

export default checkIdParams;
