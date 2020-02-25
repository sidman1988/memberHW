module.exports = class apiHelper {
    constructor() {

    }

    static getApiResponse(responseCode, actionResult) {
        var body = actionResult.result;
        if (!actionResult.success) {
            body = { error: actionResult.message.toString() };
            responseCode = 400;
        }
        return {
            statusCode: responseCode,
            body: JSON.stringify(body),
        };
    }
}