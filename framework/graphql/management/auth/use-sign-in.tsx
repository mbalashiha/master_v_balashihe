import { useSignIn } from "@common/management/auth";

export default useSignIn;

export const handler = {
  request: (input: any) => {
    console.log("Fetching Data!");
    return JSON.stringify(input) + "_MODIFIED";
  },
  useHook: ({ request }: any) => {
    return (input: any) => {
      const response = request(input);
      return { output: response };
    };
  },
};
