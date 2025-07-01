import request from "request";
import dotenv from "dotenv";

dotenv.config();

export function sendSMS(phoneNumber, message) {

    console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    
  const data = {
    to: phoneNumber,
    from: 'trackwise',
    sms: message,
    type: "plain",
    api_key: process.env.TERMII_API_KEY,
    channel: "generic",
  }
  
  const options = {
    method: "POST",
    url: process.env.TERMII_BASEURL || "https://v3.api.termii.com/api/sms/send",
    headers: {
      "Content-Type": ["application/json", "application/json"],
    },
    body: JSON.stringify(data),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });

  // Simulate sending SMS
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`SMS sent to ${phoneNumber}`);
    }, 1000);
  });
}
