import CryptoJS from "crypto-js";
import Base64 from "crypto-js/enc-base64";

export const privateKey = process.env["NEXT_PUBLIC_ADDI_KEY"]!;
if (!privateKey) {
  throw new Error("No enviroment variable NEXT_PUBLIC_ADDI_KEY!");
}
export const CryptoFormatter = {
  stringify: function (cipherParams) {
    // create json object with ciphertext
    const jsonArray: Array<any> = [];
    jsonArray.push(cipherParams.ciphertext.toString(CryptoJS.enc.Base64));
    // optionally add iv or salt
    jsonArray.push(
      cipherParams.iv ? cipherParams.iv.toString(CryptoJS.enc.Base64) : ""
    );
    jsonArray.push(
      cipherParams.salt ? cipherParams.salt.toString(CryptoJS.enc.Base64) : ""
    );
    // stringify json object
    return encodeURIComponent(jsonArray.join(";"));
  },
  parse: function (str) {
    // parse json string
    const jsonArray = decodeURIComponent(str).split(";");
    // extract ciphertext from json object, and create cipher params object
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(jsonArray[0]),
    });
    // optionally extract iv or salt
    if (jsonArray[1]) {
      cipherParams.iv = CryptoJS.enc.Base64.parse(jsonArray[1]);
    }
    if (jsonArray[2]) {
      cipherParams.salt = CryptoJS.enc.Base64.parse(jsonArray[2]);
    }
    return cipherParams;
  },
};

export const simpleEncrypt = (str: string | object) => {
  if (!privateKey) {
    throw new Error("No enviroment variable NEXT_PUBLIC_ADDI_KEY!");
  }
  if (typeof str !== "string") {
    str = JSON.stringify(str);
  }
  return CryptoJS.AES.encrypt(str, privateKey, {
    format: CryptoFormatter,
  }).toString();
};
export const simpleDecrypt = (str: string | object) => {
  if (!privateKey) {
    throw new Error("No enviroment variable NEXT_PUBLIC_ADDI_KEY!");
  }
  const decrypt = CryptoJS.AES.decrypt(str, privateKey, {
    format: CryptoFormatter,
  });
  const text = decrypt.toString(CryptoJS.enc.Utf8);
  return JSON.parse(text);
};
