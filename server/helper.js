const getDate = () => {
  const expiry = new Date();
  return expiry.setMonth(expiry.getMonth() + 1);

};

module.exports = { getDate }