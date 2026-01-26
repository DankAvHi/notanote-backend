import { NotAcceptableException, UnauthorizedException } from "@nestjs/common";

export class UnauthenticatedException extends UnauthorizedException {
    constructor() {
        super("wrong name or password");
    }
}

export class UserExistException extends NotAcceptableException {
    constructor() {
        super("user with this name already exist");
    }
}

