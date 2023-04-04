
const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { Calculation} = require("../models/calculate.model");

const calculateRouter = express.Router();

calculateRouter.use(express.json());

calculateRouter.get("/", async (req, res) => {
    try {
      const users = await Calculation.find();
      res.send(users);
    } catch (err) {
      res.send(err.message);
    }
  });



calculateRouter.post('/calculate', async (req, res) => {
    const { annualInstalmentAmount, annualInterestRate, totalNumberOfYears } = req.body;
  
    const P = annualInstalmentAmount;
    const i = annualInterestRate / 100;
    const n = totalNumberOfYears;
  
    const F = P * ((Math.pow(1 + i, n) - 1) / i);
  
    const totalInvestmentAmount = P * n;
    const totalInterestGained = F - totalInvestmentAmount;
  
    const calculation = new Calculation({
      annualInstalmentAmount,
      annualInterestRate,
      totalNumberOfYears,
      totalInvestmentAmount,
      totalInterestGained,
      totalMaturityValue: F,
    });
  
    try {
      await calculation.save();
      res.json({
        totalInvestmentAmount,
        totalInterestGained,
        totalMaturityValue: F,
        message: 'Calculation saved successfully',
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to save calculation' });
    }
  });
  
  module.exports = {
    calculateRouter,
  };