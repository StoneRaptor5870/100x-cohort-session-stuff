import { DefaultService } from "./generated";

async function main() {
  const res = await DefaultService.getUsers("123");
  console.log(res);
}

main();