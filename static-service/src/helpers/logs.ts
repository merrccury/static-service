import {inspect} from "util";

export enum LogStream {
    Console = 'console',
}

export const log = (obj: any, stream: LogStream = LogStream.Console) => {
    if (stream === LogStream.Console) {
        console.log(inspect(obj, true, 5));
    }
};
