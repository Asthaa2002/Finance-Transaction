const accountSchema = require("../models/account");

exports.createAccount = async (req, res) => {
    try {
      const { accountHolder, accountType, accountNumber, balance, currency } =
        req.body;
  
      const userAccount = await accountSchema.findOne({ accountNumber });
  
      if (userAccount) {
        return res.status(400).json({ message: "Account already exists" });
      }
  
      const newAccount = new accountSchema({
        accountHolder,
        accountType,
        accountNumber,
        balance,
        currency,
      });
  
      const savedAccount = await newAccount.save();
  
      res.status(201).json({
        message: "Account created successfully",
        account: savedAccount,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

exports.getAccounts = async (req, res) => {
  try {
    const accounts = await accountSchema.find();
    if (!accounts) {
      return res.status(404).json({ message: "No account found!!" });
    }

    return res
      .status(201)
      .json({ message: "Accounts fetched successfully", accounts });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
