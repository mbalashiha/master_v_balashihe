import prettier from "prettier/standalone";
import prettierPluginBabel from "prettier/plugins/babel";
import prettierPluginHtml from "prettier/plugins/html";
import prettierPluginEstree from "prettier/plugins/estree";
export type BeatifyCodeValue = {
  textContent: string;
  language: "tsx" | "jsx" | "markup";
};
export default async function beatifyCode(value: BeatifyCodeValue) {
  try {
    const { language } = value;
    let parser: string = "";
    switch (language) {
      case "tsx":
      case "jsx":
        parser = "babel";
        break;
      case "markup":
        parser = "html";
        break;
      default:
        return value;
        break;
    }
    const newTextContent = await prettier.format(value.textContent.trim(), {
      semi: true,
      parser,
      plugins: [prettierPluginBabel, prettierPluginHtml, prettierPluginEstree],
    });
    const result = {
      textContent: newTextContent
        .trim()
        .replace(/^;\</im, "<")
        .replace(/\>;$/im, ">"),
      language: value.language,
    };
    // console.log("beatifyCode with prettier: Success result:", result);
    return result;
  } catch (e: any) {
    console.warn("beatifyCode with prettier:", e.message || e);
    return value;
  }
}
export async function beatifyHtml(inTextContent: string): Promise<string> {
  try {
    const { textContent } = await beatifyCode({
      textContent: inTextContent,
      language: "markup",
    });
    return textContent;
  } catch (e: any) {
    console.warn("beatifyHtml with prettier:", e.message || e);
    return inTextContent;
  }
}
