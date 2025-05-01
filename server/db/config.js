import mongoose from 'mongoose';

const connectToDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB: ', con.connection.host);
  } catch (error) {
    console.log('Error while connecting to DB ', error);
    process.exit(1);
  }
};

export default connectToDB;
