export interface Notify{
    msg:string,
    id:number;
    tableName:string;
    isRouting:boolean;
    time:Date | string;
    isRead:boolean;
}

export class Notification {

    private listNotification:Notify[];
    private static _instance: Notification;

    public static get getInstance(): Notification {
        if (!this._instance) {
            this._instance = new Notification();
        }
        return this._instance;
    }

    private constructor(){
        this.listNotification = [];
    }

    counterNotification(){
        let count = 0;
        this.listNotification.forEach((value) => {
            if(!value.isRead) count++;
        })
        return count>10?'+10':count;
    }

    getInfoNotification(){
        return {
            countNotify: this.counterNotification(),
            data:this.getlistNotification()
        }
    }

    addJustifyNotification(data:Notify){
        this.listNotification.push(data);
    }

    getlistNotification(){
        let count = 0;
        const max = 10;
        if(this.listNotification.length > 10){
            this.listNotification = this.listNotification.filter(notification => !notification.isRead);
        }
        return this.listNotification;
    }

    checkReadNotification(data:Notify){
        this.listNotification = this.listNotification.map((value) => {
            if(value.id==data.id){
                value.isRead = true;
            }
            return value;
        })
    }

}