import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from "../user.module";
import { AuthenticationController } from "./authentication.controller";
import { AuthGuard } from "./authentication.guard";
import { AuthenticationService } from "./authentication.service";

@Module({
    controllers: [AuthenticationController],
    exports: [AuthGuard, AuthenticationService],
    imports: [JwtModule, forwardRef(() => UserModule)],
    providers: [AuthenticationService, AuthGuard],
})
export class AuthenticationModule { }
