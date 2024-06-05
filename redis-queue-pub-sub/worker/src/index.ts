import { createClient, RedisClientType  } from "redis";
const client: RedisClientType = createClient({
  url: "redis://127.0.0.1:6379"
});

type Result = {key: string, element: string};

async function processSubmission(submission: string) {
  const { problemId, code, language } = JSON.parse(submission);

  console.log(`Processing submission for problemId ${problemId}...`);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);
    // Here you would add your actual processing logic

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Finished processing submission for problemId ${problemId}.`);
}

async function startWorker() {
  try {
    await client.connect();
    console.log("Worker connected to Redis.");

    // Main loop
    while (true) {
      try {
        const result = await client.brPop("problems", 0) as unknown as Result;
        console.log("Result from brPop:", result);

        if (result && result.element) {
          await processSubmission(result.element);
        } else {
          console.error("Unexpected result from brPop:", result);
        }
      } catch (error) {
        console.error("Error processing submission:", error);
        // Implement your error handling logic here. For example, you might want to push
        // the submission back onto the queue or log the error to a file.
      }
    }
  } catch (error) {
    console.error("Failed to connect to Redis", error);
  }
}

startWorker();
