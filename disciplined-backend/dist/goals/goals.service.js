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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const goal_entity_1 = require("./entities/goal.entity");
const schedule_1 = require("@nestjs/schedule");
const luxon_1 = require("luxon");
let GoalsService = class GoalsService {
    goalsRepository;
    constructor(goalsRepository) {
        this.goalsRepository = goalsRepository;
    }
    async createGoal(goalData) {
        const newGoal = this.goalsRepository.create({
            ...goalData,
            completed: false,
        });
        return await this.goalsRepository.save(newGoal);
    }
    async getGoals() {
        return await this.goalsRepository.find();
    }
    async markGoalDone(id) {
        const goal = await this.goalsRepository.findOne({ where: { id } });
        if (!goal)
            return null;
        goal.completed = true;
        const savedGoal = await this.goalsRepository.save(goal);
        if (goal.type === 'daily') {
            await this.goalsRepository.remove(goal);
            return null;
        }
        return savedGoal;
    }
    async updateGoal(id, updateData) {
        const goal = await this.goalsRepository.findOne({ where: { id } });
        if (!goal)
            return null;
        Object.assign(goal, updateData);
        return await this.goalsRepository.save(goal);
    }
    async resetDailyGoals() {
        const now = luxon_1.DateTime.now().setZone('Europe/Paris');
        const dailyGoals = await this.goalsRepository.find({ where: { type: 'daily', completed: false } });
        for (const goal of dailyGoals) {
            goal.completed = false;
            goal.lastResetDate = now.toJSDate();
            await this.goalsRepository.save(goal);
        }
        console.log('Daily goals reset for new day');
    }
    async sendReminder() {
        const unfinishedDaily = await this.goalsRepository.find({ where: { type: 'daily', completed: false } });
        if (unfinishedDaily.length > 0) {
            console.log(`Reminder: ${unfinishedDaily.length} unfinished daily goals:`, unfinishedDaily.map(g => g.title));
        }
    }
};
exports.GoalsService = GoalsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'Europe/Paris' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoalsService.prototype, "resetDailyGoals", null);
__decorate([
    (0, schedule_1.Cron)('0 * * * *', { timeZone: 'Europe/Paris' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoalsService.prototype, "sendReminder", null);
exports.GoalsService = GoalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(goal_entity_1.Goal)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GoalsService);
//# sourceMappingURL=goals.service.js.map