
export default class Http {
  public static respond(
    responseObject: any,
    message: string,
    data: object = {},
    meta: object | null = null,
    filters: Object | null = null,
    statusCode: number = 200
  ) {
    const responseBody: any = {
      data: data,
      meta: meta,
      message: message,
      filters: filters
    };
    return responseObject.status(statusCode).send(responseBody);
  }
}
