import {ApiGatewayEvent} from '../common/apigateway/apigateway-event';
import {LambdaApp} from '../apps/lambda-app';
import {AddObjectApp} from "../apps/add-object-app";
import {BaseException} from "../common/exceptions/BaseException";

export const handler = async (event: ApiGatewayEvent): Promise<any> => {
    try {

        const app: LambdaApp = new AddObjectApp();
        return await app.run(event);
    } catch (error) {
        if (error instanceof BaseException) {
            return error.sendError();
        }
        return {statusCode: 500, body: error.message};

    }
};
