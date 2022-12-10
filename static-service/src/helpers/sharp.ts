import  {Sharp} from 'sharp';
import {Size} from "./types";

export enum BucketType {
    ICONS = 'icons',
    APPS = 'apps',
    USERS = 'users',
}

const referenceSize: Record<BucketType, number> = {
    [BucketType.USERS]: 150,
    [BucketType.ICONS]: 100,
    [BucketType.APPS]: 400,
}

enum AspectRatio {
    WIDTH = 16,
    HEIGHT = 9
}


const sizeMap: Record<BucketType, Array<Size>> = {
    [BucketType.APPS]:
        [
            {
                width: referenceSize[BucketType.APPS],
                height: referenceSize[BucketType.APPS] * AspectRatio.HEIGHT / AspectRatio.WIDTH
            },
            {
                width: referenceSize[BucketType.APPS] * 2,
                height: referenceSize[BucketType.APPS] * 2 * AspectRatio.HEIGHT / AspectRatio.WIDTH
            },
            {
                width: referenceSize[BucketType.APPS] * 3,
                height: referenceSize[BucketType.APPS] * 3 * AspectRatio.HEIGHT / AspectRatio.WIDTH
            }
        ],
    [BucketType.ICONS]: [
        {
            width: referenceSize[BucketType.ICONS],
            height: referenceSize[BucketType.ICONS]
        },
        {
            width: referenceSize[BucketType.ICONS] * 2,
            height: referenceSize[BucketType.ICONS] * 2
        },
        {
            width: referenceSize[BucketType.ICONS] * 3,
            height: referenceSize[BucketType.ICONS] * 3

        },
    ],
    [BucketType.USERS]: [
        {
            width: referenceSize[BucketType.USERS],
            height: referenceSize[BucketType.USERS]
        },
        {
            width: referenceSize[BucketType.USERS] * 2,
            height: referenceSize[BucketType.USERS] * 2
        },
        {
            width: referenceSize[BucketType.USERS] * 3,
            height: referenceSize[BucketType.USERS] * 3

        },
    ],
}

export const toJpeg = (object: Sharp, type: BucketType): Array<Promise<Buffer>> => {
    return sizeMap[type].map(({width, height}) =>
        object.resize({
            width,
            height
        }).jpeg().toBuffer()
    )
}
export const toWebp = (object: Sharp, type: BucketType): Array<Promise<Buffer>> => {
    return sizeMap[type].map(({width, height}) =>
        object.resize({
            width,
            height
        }).webp().toBuffer()
    )
}
