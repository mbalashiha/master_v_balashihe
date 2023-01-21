
import { useSignIn } from "@common/management/auth";


export default useSignIn;


export const handler = {
  request: () => {
    console.log("Fetching Data!")
  },
  useHook: () => {
    return (input: any) => {
      return {
        output: JSON.stringify(input) + "_MODIFIED"
      }
    }
  }
}