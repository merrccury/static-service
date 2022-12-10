import {LambdaApp} from "../../src/apps/lambda-app";
import {AddObjectApp} from "../../src/apps/add-object-app";
import {ApiGatewayEventMock} from "../mocks/apigateway-event-mock";
import {readFile} from "fs";
import {assert} from "chai";

function iThrowError() {
    throw new Error("Error thrown");
}

describe("test", () => {
    it("add-event", function (done) {
        this.timeout(15000)
        const app: LambdaApp = new AddObjectApp();
        readFile('/home/butler/Projects/static-service/static-service/tests/static/the-weeknd.jpg', (err, data) => {
            if (err) {
                assert.throws(iThrowError, Error, "Error thrown");
                return done();
            }
            const event = new ApiGatewayEventMock(data, 'icons');
            app.run(event).then((response) => {
                console.log({response})
                done();
            }).catch((error) => {
                console.log({error})
                done();
            });
        })
    })
})
