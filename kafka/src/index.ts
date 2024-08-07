import { Kafka } from "kafkajs";

const KafkaObj = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"]
});

const producer = KafkaObj.producer();
const consumer = KafkaObj.consumer({groupId: "my-app3"});

async function main() {
  await producer.connect();
  await producer.send({
    topic: "quickstart-events",
    messages: [{
      value: "kafka in node.js process"
    }]
  });

  await consumer.connect();
  await consumer.subscribe({
    topic: "quickstart-events", fromBeginning: true
  });

  await consumer.run({
    eachMessage: async ({topic, partition, message}) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message?.value?.toString(),
      })
    },
  });
}

main();