const transactionSchema = require("../models/transaction");
const accountSchema = require("../models/account");
const userSchema = require('../models/user')

exports.createTransaction = async (req, res) => {
  try {
    const { income, expense, description, userAccount, userId } =
      req.body;
    const newTransaction = new transactionSchema({
      income,
      expense,
      saving: income-expense,
      description,
      userId,
      userAccount
        });
    const savedTransaction = await newTransaction.save();

   return res.status(201).json({
      message: "Transaction saved successfully",
      transaction: savedTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllTransaction = async (req, res) => {
  const {id } = req.params;
  const { startDate, endDate } = req.body;
  try {
    const findUser = await userSchema.findById(id)

    if(!findUser) {
      return res.status(404).json({message: 'No user found !'})
    }
    let query = { userId: id };
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await transactionSchema
      .find(query)
      .populate(["userId", "userAccount"]);
    if (!transactions || transactions.length==0) {
      return res.status(404).json({ message: "No transactions found in this time period!!" });
    }
    return res
      .status(200)
      .json({ message: "Transactions fetched successfully",
       transactions:transactions });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTransactionSummary = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body;
  try {
    const findUser = await userSchema.findById(id);
    if (!findUser) {
      return res.status(404).json({ message: "No user found" });
    }
    let query = { userId: id };
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }


    const findTransactions = await transactionSchema
      .find(query)
      .populate(["userAccount","userId"]);

    if (!findTransactions || findTransactions.length === 0) {
      return res.status(404).json({
        message: "No transactions found for the specified time period.",
      });
    }
    let totalSavings = 0;
    const transactionData = findTransactions.map((transaction) => {
      const saving = transaction.income - transaction.expense;
      totalSavings += saving;
      return {
        income: transaction.income || 0,
        expense: transaction.expense || 0,
        saving: saving || 0,
        userAccount: transaction.userAccount,
      };
    });

    return res.status(200).json({
      message: "Transaction summary retrieved successfully",
      transactions: transactionData,
      totalSaving: totalSavings
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const findTransaction = await transactionSchema.findById(id);
    if (!findTransaction) {
      return res.status(404).json({ message: "No transaction found" });
    }
    await transactionSchema.findByIdAndDelete(id); 
    return res
      .status(200)
      .json({ message: "Transaction removed successfully!!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

