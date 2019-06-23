const URL = "http://ruppinmobile.tempdomain.co.il/site08/WSHelpyM.asmx";

export default class SQL {

    static UserExist(phone) {
        console.log('phone', phone);

        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${URL}/UserExist`, {
                    body: JSON.stringify({
                        phone
                    }),
                    headers: {
                        "content-type": "application/json"
                    },
                    method: "POST"
                });
                console.log(`${URL}/UserExist`, res);

                const data = await res.json();
                if (data.d === null) reject('phone not exist');

                resolve(data.d);
            } catch (error) {
                reject(error);
            }
        });
    } // END UserExist

    static async Register(phone, code, token, createdDate) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${URL}/Register`, {
                    body: JSON.stringify({
                        phone,
                        code,
                        token,
                        createdDate
                    }),
                    headers: {
                        "content-type": "application/json"
                    },
                    method: "POST"
                });
                console.log(`${URL}/Register`, res);

                const data = await res.json();
                console.log(data);

                if (data.d === null) reject('something went wrong')

                resolve(data.d);
            } catch (error) {
                reject(error);
            }
        })
    } // END Register

    static async Login(id, code) {

        console.log('login=', id, ' ', code)
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${URL}/Login`, {
                    body: JSON.stringify({
                        id,
                        code
                    }),
                    headers: {
                        "content-type": "application/json"
                    },
                    method: "POST"
                });
                console.log(`${URL}/Login`, res);

                const data = await res.json();
                if (data.d === null) reject('phone not exist');

                resolve(data.d);
            } catch (error) {
                reject(error);
            }
        });
    } // END Login

    static async UpdatePushNotificationToken(phone, token) {
        try {
            await fetch(`${URL}/UpdatePushNotificationToken`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    phone,
                    token
                }),
            });
        } catch (error) {
            console.log(error);
        }
    } // END UpdatePushNotificationToken


}
