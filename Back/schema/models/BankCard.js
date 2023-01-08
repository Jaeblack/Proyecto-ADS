import { Schema } from 'mongoose';

const BankCard = Schema(
  {
    number: String,
    expiration: String,
    CCV: String,
  },
  { _id: false },
);

export default BankCard;