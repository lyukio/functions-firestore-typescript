import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

export const onBostonWeatherUpdate = 
functions.firestore.document('cities-weather/boston-ma-us').onUpdate(change => {
    const after = change.after.data()
    const payload = {
        data: {
            temp: String(after.temp),
            conditions: after.conditions
        }
    }
    return admin.messaging().sendToTopic("weather_boston-ma-us", payload)
})

export const getBostonAreaWeather = functions.https.onRequest((request, response) => {
    admin.firestore().doc('areas/greater-boston').get()
    .then(areaSnapshot => {
        if(!areaSnapshot.exists) throw new Error('document does not exists');

        const cities = areaSnapshot.data().cities
        const promises = []
        for (const city in cities) {
            const p = admin.firestore().doc(`cities-weather/${city}`).get()
            promises.push(p)
        }
        return Promise.all(promises)
    })
    .then(citySnapshot => {
        const results = []
        citySnapshot.forEach(citySnap => {
            const data = citySnap.data()
            data.city = citySnap.id
            results.push(data)
        })
        response.send(results)
    })
    .catch(error => {
        console.log(error)
        response.status(500).send(error)
    })
});

export const getBostonWeather = functions.https.onRequest((request, response) => {
    admin.firestore().doc('cities-weather/boston-ma-us').get()
    .then(snapshot => {
        if(snapshot.exists) {
            const data = snapshot.data()
            response.send(data)
        }
        response.send("document does not exists")
    })
    .catch(error => {
        console.log(error)
        response.status(500).send(error)
    })
});
