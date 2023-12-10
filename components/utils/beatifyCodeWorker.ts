import beatifyCode, { BeatifyCodeValue } from "./beatifyCode";
import registerPromiseWorker from "promise-worker/register";
registerPromiseWorker<BeatifyCodeValue, BeatifyCodeValue>(
  async function (message) {
    const result = await beatifyCode(message);
    return result;
  }
);
// const onmessage = async (event: MessageEvent<BeatifyCodeValue>) => {
//   console.log("🐝 Worker: Message received from main script");
//   const data = event.data;
//   const result = await beatifyCode(data);
//   const workerResult = "Result: " + result;
//   console.log("🐝 Worker: Posting message back to main script");
//   postMessage(workerResult);
// };
// addEventListener("message", onmessage);
