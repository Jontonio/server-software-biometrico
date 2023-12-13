"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
class Notification {
    static get getInstance() {
        if (!this._instance) {
            this._instance = new Notification();
        }
        return this._instance;
    }
    constructor() {
        this.listNotification = [];
    }
    counterNotification() {
        let count = 0;
        this.listNotification.forEach((value) => {
            if (!value.isRead)
                count++;
        });
        return count > 10 ? '+10' : count;
    }
    getInfoNotification() {
        return {
            countNotify: this.counterNotification(),
            data: this.getlistNotification()
        };
    }
    addJustifyNotification(data) {
        this.listNotification.push(data);
    }
    getlistNotification() {
        let count = 0;
        const max = 10;
        if (this.listNotification.length > 10) {
            this.listNotification = this.listNotification.filter(notification => !notification.isRead);
        }
        return this.listNotification;
    }
    checkReadNotification(data) {
        this.listNotification = this.listNotification.map((value) => {
            if (value.id == data.id) {
                value.isRead = true;
            }
            return value;
        });
    }
}
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map