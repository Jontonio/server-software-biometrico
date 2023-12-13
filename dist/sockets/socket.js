"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusNotification = exports.clientDisconnet = void 0;
const Notification_1 = require("../class/Notification");
const clientDisconnet = (client) => {
    client.on('disconnect', () => {
        console.log("Client id disconnect: ", client.id);
    });
};
exports.clientDisconnet = clientDisconnet;
const statusNotification = (client, io) => {
    client.on('getNotifications', () => {
        const notification = Notification_1.Notification.getInstance;
        client.emit('updatedNotification', notification.getInfoNotification());
    });
    client.on('readNotification', (value) => {
        const notification = Notification_1.Notification.getInstance;
        notification.checkReadNotification(value);
        io.emit('updatedNotification', notification.getInfoNotification());
    });
};
exports.statusNotification = statusNotification;
//# sourceMappingURL=socket.js.map