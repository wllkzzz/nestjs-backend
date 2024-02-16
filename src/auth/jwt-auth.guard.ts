import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                throw new UnauthorizedException({"message": "Unauthorized"});
            }

            const token = authHeader.split(" ")[1];

            if (!token) {
                throw new UnauthorizedException({"message": "Unauthorized"});
            }

            const user = this.jwtService.verify(token);
            req.user = user;

            return true;
        } catch (error) {
            console.log(`${process.env.PRIVATE_KEY}`);
            
            console.error("JWT Verification Error:", error);
            throw new UnauthorizedException({"message": "Unauthorized"});
        }
    }
}
