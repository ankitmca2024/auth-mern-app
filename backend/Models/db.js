const mongoose = require('mongoose');
require('dotenv').config(); // make sure this loads .env

const mongo_url = process.env.MONGO_URI;

if (!mongo_url) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB Connected...");
})
.catch((error) => {
  console.error("❌ MongoDB Connection Error:", error.message);
});
