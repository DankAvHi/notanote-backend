import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const corsConfig: CorsOptions = {
    origin: ['https://localhost:3000', 'http://localhost:3000'],
    credentials: true,
}