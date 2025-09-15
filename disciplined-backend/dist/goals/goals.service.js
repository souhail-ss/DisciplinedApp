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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const luxon_1 = require("luxon");
let GoalsService = class GoalsService {
    goals = [];
    idCounter = 1;
    createGoal(goalData) {
        const newGoal = {
            id: this.idCounter++,
            ...goalData,
            completed: false,
            createdDate: new Date(),
        };
        this.goals.push(newGoal);
        return newGoal;
    }
    getGoals() {
        return this.goals;
    }
    markGoalDone(id) {
        const goal = this.goals.find((g) => g.id === id);
        if (goal) {
            goal.completed = true;
            if (goal.type === 'daily') {
                this.goals = this.goals.filter((g) => g.id !== id);
            }
            return goal;
        }
        return null;
    }
    updateGoal(id, updateData) {
        const goal = this.goals.find((g) => g.id === id);
        if (goal) {
            Object.assign(goal, updateData);
            return goal;
        }
        return null;
    }
    resetDailyGoals() {
        const now = luxon_1.DateTime.now().setZone('Europe/Paris');
        this.goals = this.goals.filter((goal) => {
            if (goal.type === 'daily' && !goal.completed) {
                goal.completed = false;
                goal.lastResetDate = now.toJSDate();
                return true;
            }
            return true;
        });
        console.log('Daily goals reset for new day');
    }
    sendReminder() {
        const unfinishedDaily = this.goals.filter((goal) => goal.type === 'daily' && !goal.completed);
        if (unfinishedDaily.length > 0) {
            console.log(`Reminder: You have ${unfinishedDaily.length} unfinished daily goals:`, unfinishedDaily.map((g) => g.title));
        }
    }
};
exports.GoalsService = GoalsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'Europe/Paris' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GoalsService.prototype, "resetDailyGoals", null);
__decorate([
    (0, schedule_1.Cron)('0 * * * *', { timeZone: 'Europe/Paris' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GoalsService.prototype, "sendReminder", null);
exports.GoalsService = GoalsService = __decorate([
    (0, common_1.Injectable)()
], GoalsService);
//# sourceMappingURL=goals.service.js.map