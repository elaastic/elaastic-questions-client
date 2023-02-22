import { Validation } from "io-ts";
import { isLeft } from "fp-ts/Either";
import { PathReporter } from "io-ts/PathReporter";

export function validateData<T>(decoded: Validation<T>): T {
  if (isLeft(decoded)) {
    console.error(PathReporter.report(decoded).join("\n"));

    // TODO Specific error + i18n
    throw Error(
      "Les données transmises par le serveur sont incorrectes !"
    );
  }

  return decoded.right;
}
