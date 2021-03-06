import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

// example
// async function myFunction(): Promise<string> {
//     try {
//         const rankPromise = getRank()
//         const rank = await rankPromise
//         return Promise.resolve("firebase is #" + rank)
//     } catch (error) {
//         return "Error: " + error
//     }
// }

// function getRank() {
//     // return Promise.resolve(1)
//     return Promise.reject("I don't know :(")
// }

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

export const getBostonAreaWeather = functions.https.onRequest(async (request, response) => {
    try {
        const areaSnapshot = await admin.firestore().doc('areas/greater-boston').get()
        if(!areaSnapshot.exists) throw new Error('document does not exists');
    
        const cities = areaSnapshot.data().cities
        const promises = []
        for (const city in cities) {
            const p = admin.firestore().doc(`cities-weather/${city}`).get()
            promises.push(p)
        }
        const snapshots = await Promise.all(promises)
        const results = []
        snapshots.forEach(citySnap => {
            const data = citySnap.data()
            data.city = citySnap.id
            results.push(data)
        })
        response.send(results)
    } catch (error) {
        console.log(error)
        response.status(500).send(error)
    }
});

export const getBostonWeather = functions.https.onRequest(async (request, response) => {
    try {
        const snapshot = await admin.firestore().doc('cities-weather/boston-ma-us').get()
        const data = snapshot.data()
        response.send(data)
    } catch (error) {
        console.log(error)
        response.status(500).send(error)
    }
});
