"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const countries_module_1 = require("./countries/countries.module");
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
dotenv.config();
let AppModule = AppModule_1 = class AppModule {
    constructor() {
        this.logger = new common_1.Logger(AppModule_1.name);
        this.logger.log('Значения переменных окружения:');
        this.logger.log(`DB_HOST: ${process.env.DB_HOST}`);
        this.logger.log(`DB_PORT: ${process.env.DB_PORT}`);
        this.logger.log(`POSTGRES_USER: ${process.env.POSTGRES_USER}`);
        this.logger.log(`POSTGRES_PASSWORD: ${process.env.POSTGRES_PASSWORD}`);
        this.logger.log(`POSTGRES_DB: ${process.env.POSTGRES_DB}`);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'postgres',
                port: Number(process.env.DB_PORT) || 5432,
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                autoLoadEntities: true,
                synchronize: true,
            }),
            countries_module_1.CountriesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
//# sourceMappingURL=app.module.js.map