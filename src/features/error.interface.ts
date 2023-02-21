export class NotFoundError extends Error {

  uri: string

  constructor(message: string, uri: string) {
    super(message);

    this.name = "NotFound"
    this.uri = uri
  }

}
