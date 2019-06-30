import { Permissions, Notifications } from 'expo';
import SQL from './SQL';

export default class PushNotification {

    static async Register() {
        try {
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );
            let finalStatus = existingStatus;

            // only ask if permissions have not already been determined, because
            // iOS won't necessarily prompt the user a second time.
            if (existingStatus !== 'granted') {
                // Android remote notification permissions are granted during the app
                // install, so this will only ask on iOS
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }

            // Stop here if the user did not grant permissions
            if (finalStatus !== 'granted') {
                return;
            }

            // Get the token that uniquely identifies this device
            let token = await Notifications.getExpoPushTokenAsync();
            //console.log(token);
            //console.log(finalStatus);
            //alert(token);
            // POST the token to your backend server from where you can retrieve it to send push notifications.

            return token;
        } catch (error) {
            console.log(error);
        }
    }

    static async UpdatePushNotificationToken(phone, curToken) {
        const token = await this.Register();
        // check if token has changed or not
        if (curToken != token)
            SQL.UpdatePushNotificationToken(phone, token);
        return token;
    }

    static async SendCodeByPushNotification(token, code) {
        let per = {
            to: token,
            title: '',
            body: `${code} הוא קוד האימות שלך ב - Helpy`,
            badge: 3,
        };

        //POST adds a random id to the object sent
        fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            body: JSON.stringify(per),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json != null) {
                    console.log(`
                    returned from server\n
                    json.data= ${JSON.stringify(json.data)}`);

                } else {
                    console.log('err json');
                }
            });
    }
}