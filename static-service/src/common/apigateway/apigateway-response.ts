export interface ApiGatewayResponse {
    statusCode: number;
    body?: string;
    headers?: Record<string, string>
}
