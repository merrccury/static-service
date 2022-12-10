import {ApiGatewayEvent} from '../common/apigateway/apigateway-event';
import {ApiGatewayResponse} from '../common/apigateway/apigateway-response';
import {LambdaApp} from './lambda-app';
import sharp from 'sharp';
import {NotFoundException} from "../common";
import {randomUUID} from "crypto";
import AWS from 'aws-sdk';
import {log, BucketType, toJpeg, toWebp} from "../helpers";


const S3 = new AWS.S3({apiVersion: '2006-03-01', region: 'eu-north-1'});


const allowedBuckets = ['apps', 'users', 'icons']

const domain = 'static.alekseichik.dev';

const getBucket = (bucket: string, scale: string) => `butler-static/${bucket}/${scale}`

export class AddObjectApp implements LambdaApp {
    async run(event: ApiGatewayEvent): Promise<ApiGatewayResponse> {
        const bucket = event.pathParameters?.bucket.toLowerCase() as BucketType;
        if (!bucket || (!!bucket && !allowedBuckets.includes(bucket))) {
            throw new NotFoundException();
        }

        const {body, ...plainEvent} = event;
        log(plainEvent)
        const input = Buffer.from(body, 'base64');
        const object = sharp(input);
        const objectKey = randomUUID();
        const metadata = await object.metadata();
        log({metadata});

        const jpegPromises = toJpeg(object, bucket);
        const webpPromises = toWebp(object, bucket);

        const buffers = await Promise.all([...jpegPromises, ...webpPromises]);

        const putPromises = buffers.map((buffer, index) => {
            const extension = index >= 3 ? 'webp' : 'jpeg';
            return S3.putObject({
                Body: buffer,
                Bucket: getBucket(bucket, `x${(index % 3) + 1}`),
                Key: `${objectKey}.${extension}`,
                ContentType: `image/${extension}`

            }).promise();
        })

        const urls = {
            key: objectKey,
            jpeg: {
                small: `https://${domain}/images/${bucket}/${objectKey}.jpeg?size=x1`,
                medium: `https://${domain}/images/${bucket}/${objectKey}.jpeg?size=x2`,
                large: `https://${domain}/images/${bucket}/${objectKey}.jpeg?size=x3`,
            },
            webp: {
                small: `https://${domain}/images/${bucket}/${objectKey}.webp?size=x1`,
                medium: `https://${domain}/images/${bucket}/${objectKey}.webp?size=x2`,
                large: `https://${domain}/images/${bucket}/x3/${objectKey}.webp?size=x3`,
            }
        }

        await Promise.all(putPromises);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "Application/Json"
            },
            body: JSON.stringify(urls)
        };
    }
}
