
const storeAuth = async (req, res) => {
  await res.status(200).json({
    status: 200,
    message: "authentication is successfull"
  });
};


export default storeAuth;
