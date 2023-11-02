import * as htmlparser2 from "htmlparser2";
import { resolve } from "path";
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
export function unescapeHtml(safeEscaped: string): string {
  return safeEscaped
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&amp;", "&");
}
export function escapeHtmlTagsOnly(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
export function unescapeHtmlTagsOnly(safeEscaped: string): string {
  return safeEscaped
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}
export function HtmlEncode(s: string) {
  var el = document.createElement("div");
  el.innerText = el.textContent = s;
  s = el.innerHTML;
  return s;
}
export function HtmlDecode(s: string) {
  var el = document.createElement("div");
  el.innerHTML = s;
  return el.innerText;
}
export const parseHtml = (inHtml: string) =>
  new Promise((res, rej) => {
    const parser = new htmlparser2.Parser({
      onopentagname(name) {
        /*
         * This fires when a new tag is opened.
         *
         * If you don't need an aggregated `attributes` object,
         * have a look at the `onopentagname` and `onattribute` events.
         */

        console.log("tag:", name);
      },
      onattribute(name, value) {
        console.log("attrib:", name, "=", value);
      },
      ontext(text) {
        /*
         * Fires whenever a section of text was processed.
         *
         * Note that this can fire at any point within text and you might
         * have to stitch together multiple pieces.
         */
        console.log("-->", text);
      },
      onclosetag(tagname) {
        /*
         * Fires when a tag is closed.
         *
         * You can rely on this event only firing when you have received an
         * equivalent opening tag before. Closing tags without corresponding
         * opening tags will be ignored.
         */
        console.log("tag closed:", tagname);
      },
      onend() {
        debugger;
        resolve();
      },
    });
    parser.write(inHtml);
    parser.end();
  });
