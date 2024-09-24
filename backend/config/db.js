const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://estel:dbEstelDona@atlascluster.o2wxhlq.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster')

    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;





//mongodb+srv://edona:mXnQg9044yPgipCs@cluster0.caqq1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



//mXnQg9044yPgipCs
























































