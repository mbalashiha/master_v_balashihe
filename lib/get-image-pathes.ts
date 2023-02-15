import path from "path";
import fse from "fs-extra";
import fs from "fs";
import sharp from "sharp";
import { number } from "yup";
export interface UploadedFileUriObject {
  pathOfOriginal: string;
  draftPath: string;
  db: {
    imgSrc: string;
    pathOfOriginal: string;
  };
}
export const convertUploadedImageFile = async (
  pathOfOriginal: string,
  draftPath: string
): Promise<{
  outputInfo: sharp.OutputInfo | null;
  originalWidth: number;
  originalHeight: number;
  originalMeta: sharp.Metadata | null;
  width: number;
  height: number;
}> => {
  if (/\.(svg)$/im.test(pathOfOriginal)) {
    await fse.copy(pathOfOriginal, draftPath);
    return {
      outputInfo: null,
      originalMeta: null,
      originalHeight: 0,
      originalWidth: 0,
      width: 0,
      height: 0,
    };
  } else {
    try {
      const image = sharp(pathOfOriginal);
      const originalMeta = await image.metadata();
      const originalHeight = originalMeta?.height || 0;
      const originalWidth = originalMeta?.width || 0;
      let heightFactor: number;
      let widthFactor: number;
      if (originalHeight < originalWidth) {
        heightFactor = (1080 * (1920 / 1080) * 2) / originalHeight;
        widthFactor = heightFactor;
      } else {
        widthFactor = (1920 * 2) / originalWidth;
        heightFactor = widthFactor;
      }
      const newHeight = Math.floor(originalHeight * heightFactor);
      const newWidth = Math.floor(originalWidth * widthFactor);
      const outputInfo = await image
        .resize({ width: newWidth, height: newHeight })
        .jpeg({ mozjpeg: true, quality: 90 })
        .toFile(draftPath);
      return {
        width: outputInfo.width || 0,
        height: outputInfo.height || 0,
        outputInfo,
        originalMeta,
        originalHeight: originalHeight || 0,
        originalWidth: originalWidth || 0,
      };
    } catch (e: any) {
      console.error(e.stack || e.message || e);
      await fse.copy(pathOfOriginal, draftPath);
      return {
        outputInfo: null,
        originalMeta: null,
        originalHeight: 0,
        originalWidth: 0,
        width: 0,
        height: 0,
      };
    }
  }
};
export const project_folder = path.resolve(".");
export const public_assets_folder = path.join(project_folder, "public");
export const upload_folder_path = path.join(public_assets_folder, "uploads");
export const imageDraftsUploadingFolder = path.join(
  upload_folder_path,
  "drafts"
);
export const originals_folder_path = path.join(
  public_assets_folder,
  "originals",
  "uploaded"
);
const mkdirpStartup = () => {
  try {
    fse.mkdirpSync(upload_folder_path);
  } catch (e) {}
  try {
    fse.mkdirpSync(originals_folder_path);
  } catch (e) {}
};
mkdirpStartup();
export const applyPrefixToUri = (
  inPath: string,
  prefix: string = "balashikha-computer-master"
) => {
  if (inPath.startsWith("/")) {
    inPath = inPath.replace("/", "/" + prefix + "-");
  } else {
    inPath = prefix + "-" + inPath;
  }
  return inPath;
};
export const getImagePathes = (
  url: URL,
  response: Response,
  resultingFileExtencion: string = "jpg"
): UploadedFileUriObject => {
  const newPathArray: Array<string> = [];
  let imagePathname = url.pathname
    .replace(/\/wp\-/gim, "/")
    .replace(/(^[\/]+)|([\/]+$)/gim, "")
    .replace(/[\/]+/gim, "-")
    .replace(/^wp\-/im, "")
    .toLocaleLowerCase();
  const extensionRegexp = /\.([\w\-]{1,24})$/im;
  const matched = imagePathname.match(extensionRegexp);
  const extension = (matched && matched[1]) || "";
  extensionRegexp.lastIndex = 0;
  imagePathname = applyPrefixToUri(imagePathname.replace(extensionRegexp, ""));
  if (imagePathname) {
    newPathArray.push(imagePathname);
  }
  const responseHeaders = response.headers;
  const lastModifiedHeader = responseHeaders.get("last-modified");
  if (lastModifiedHeader) {
    const lastModified = Date.parse(
      Array.isArray(lastModifiedHeader)
        ? lastModifiedHeader[0]
        : lastModifiedHeader
    );
    newPathArray.push(lastModified.toString());
  }
  const contentLengthHeader = responseHeaders.get("content-length");
  if (contentLengthHeader) {
    const contentLength = Array.isArray(contentLengthHeader)
      ? contentLengthHeader[0]
      : contentLengthHeader;
    if (contentLength) {
      newPathArray.push(contentLength.toString());
    }
  }
  if (newPathArray.length < 2) {
    newPathArray.push(Date.now().toString());
  }
  let pathOfOriginal: string =
    ["original"].concat(newPathArray).join("-") +
    (extension ? "." + extension : "");
  pathOfOriginal = path.join(originals_folder_path, pathOfOriginal);
  let draftPath: string =
    ["draft"].concat(newPathArray).join("-") +
    ("." + (resultingFileExtencion || extension || "jpg"));
  draftPath = path.join(imageDraftsUploadingFolder, draftPath);
  return {
    pathOfOriginal,
    draftPath,
    db: {
      imgSrc: draftPath
        .substring(public_assets_folder.length)
        .replace(/[\\]+/gim, "/"),
      pathOfOriginal: pathOfOriginal
        .substring(public_assets_folder.length)
        .replace(/[\\]+/gim, "/"),
    },
  };
};

export const responseToWriteStream = (
  body: NodeJS.ReadableStream | null,
  filePath: string
) =>
  new Promise((resolve, reject) => {
    if (body) {
      const fileStream = fs.createWriteStream(filePath);
      body.pipe(fileStream).on("close", () => {
        resolve(true);
      });
    } else {
      reject(new Error("No readable strean!"));
    }
  });
