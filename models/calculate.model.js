const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  annualInstalmentAmount: { type: Number, required: true },
  annualInterestRate: { type: Number, required: true },
  totalNumberOfYears: { type: Number, required: true },
  totalInvestmentAmount: { type: Number },
  totalInterestGained: { type: Number },
  totalMaturityValue: { type: Number },
});

const Calculation = mongoose.model('Calculation', calculationSchema);

module.exports = { Calculation };
