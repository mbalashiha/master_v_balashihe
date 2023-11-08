import { slugify } from "@lib";

function insertAtLastIndex({
  targetString,
  symbolString,
  subString,
}: {
  targetString: string;
  symbolString: string;
  subString: string;
}) {
  const index = targetString.lastIndexOf(symbolString);
  if (index > 0) {
    return (
      targetString.substring(0, index) +
      subString +
      targetString.substring(index, targetString.length)
    );
  } else {
    return targetString + subString;
  }
}

export function getFileIdName(file: File): {
  id: string;
  uniqId: string;
  fieldname: string;
} {
  const name = insertAtLastIndex({
    targetString: file.name,
    symbolString: ".",
    subString: `-${file.lastModified || 0}-${file.size || 0}`,
  });
  const id = slugify(name);
  const extension = file.name.split(".").pop();
  const fieldname = id + (extension ? `.${slugify(extension)}` : "");
  const uniqId = `${id}-${Date.now()}`;
  return { id, fieldname, uniqId };
}
