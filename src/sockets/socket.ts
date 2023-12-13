
import { Server, Socket } from 'socket.io'
import { Notification, Notify } from '../class/Notification'

export const clientDisconnet = (client:Socket) => {

    client.on('disconnect', () => {
        console.log("Client id disconnect: ", client.id)
    })
    
}

export const statusNotification = (client:Socket, io:Server) => {

    client.on('getNotifications',() => {
        const notification = Notification.getInstance;
        client.emit('updatedNotification', notification.getInfoNotification())
    })
    
    client.on('readNotification', (value:Notify) => {
        const notification = Notification.getInstance;
        notification.checkReadNotification(value);
        io.emit('updatedNotification', notification.getInfoNotification())
    })
}
