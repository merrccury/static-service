import {ApiGatewayEvent} from '../../src/common/apigateway/apigateway-event';

export class ApiGatewayEventMock implements ApiGatewayEvent {
    constructor(data: Buffer, bucket: string) {
        this.body = data.toString('base64')
        this.pathParameters.bucket = bucket;
    }

    body;
    resource = '/';
    path = '/';
    httpMethod = 'post';
    headers = {
        'Content-Type': 'application/json'
    };
    pathParameters = {
        bucket: 'icon'
    };
    requestContext = {
        accountId: '123456789',
        resourceId: '123456789',
        stage: 'prod',
        requestId: 'abcdefg',
        requestTime: Date().toString(),
        requestTimeEpoch: Date.now(),
        path: '/',
        resourcePath: '/',
        httpMethod: 'post',
        apiId: 'abcdefg'
    };
}
