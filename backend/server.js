const express = require("express");
const bodyParser = require("body-parser");
const khaltiService = require("./khaltiService");

const app = express();
const port = 5173;

app.use(bodyParser.json());

// Handle payment callback from Khalti
app.post("/khalti/callback", async (req, res) => {
  try {
    const paymentData = req.body; // Retrieve payment data from request
    const verificationStatus = await khaltiService.verifyPayment(paymentData);
    if (verificationStatus) {
      // Payment verified successfully
      res.status(200).send("Payment verified.");
    } else {
      // Payment verification failed
      res.status(400).send("Payment verification failed.");
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).send("Internal server error.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${5173}`);
});
