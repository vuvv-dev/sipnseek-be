import { JwtPayload } from "jwt-decode";

export interface JwtPayloadOptions extends JwtPayload {
    role: string,
    sub: string
}
