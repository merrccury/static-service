import {ApiGatewayResponse} from "../apigateway/apigateway-response";

export abstract class BaseException extends Error {

    protected constructor(statusCode: number, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }

    public statusCode: number;
    public message: string;

    public sendError(): ApiGatewayResponse {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify({
                message: this.message
            }),
            headers: {
                "Content-Type": "Application/Json"

            }
        }

    }
}
