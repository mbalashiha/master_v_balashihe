import prettier from "prettier/standalone";
import prettierPluginBabel from "prettier/plugins/babel";
import prettierPluginHtml from "prettier/plugins/html";
import prettierPluginEstree from "prettier/plugins/estree";

export default async function beatifyCode(value: {
  textContent: string;
  language: "tsx" | "jsx" | "markup";
}) {
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
        parser = "babel";
        break;
    }
    const newTextContent = await prettier.format(value.textContent.trim(), {
      semi: true,
      parser,
      plugins: [prettierPluginBabel, prettierPluginHtml, prettierPluginEstree],
    });
    return {
      textContent: newTextContent
        .trim()
        .replace(/^;\</im, "<")
        .replace(/\>;$/im, ">"),
      language: value.language,
    };
  } catch (e: any) {
    console.error(e.message || e);
    debugger;
    throw e;
  }
}
export async function beatifyHtml(inTextContent: string): Promise<string> {
  const { textContent } = await beatifyCode({
    textContent: inTextContent,
    language: "markup",
  });
  return textContent;
}
