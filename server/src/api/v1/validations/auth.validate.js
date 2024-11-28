module.exports.authValidate = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
