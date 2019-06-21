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




}
