import {BaseException} from "./BaseException";
import status from 'http-status'

export class NotFoundException extends BaseException {
    public constructor(message = status['404_MESSAGE']) {
        super(status.NOT_FOUND, message);
    }
}
