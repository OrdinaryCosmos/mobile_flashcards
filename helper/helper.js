import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';


const NotifKey = "quiz_notification";

export const getDecks = async () => {
    try {
        const allKeys = await AsyncStorage.getAllKeys();
        allKeys.splice(allKeys.indexOf(NotifKey), 1);
        const allItemPair = await AsyncStorage.multiGet(allKeys);
        const decksDataAsObject = {}
        allItemPair.forEach(pair => decksDataAsObject[pair[0]] = JSON.parse(pair[1]));
        return decksDataAsObject;
    } catch (error) {
        console.log("this is an error in helper function", error);
        return {}
    }
}

const notificationObj = {
    title: "Take Your Quiz Today ",
    body: "Don't forget to take your quiz today",
    ios: {
        sound: true
    },
    android: {
        sound: true
    }
}

export const setNotification = async () => {
    try {
        const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        let nextTime = new Date();
        nextTime.setDate(nextTime.getDate() + 1)
        nextTime.setMinutes(nextTime.getMinutes() + 1)
        nextTime.setSeconds(nextTime.getSeconds() + 1)
        if (await AsyncStorage.getItem(NotifKey)) {
            await Notifications.cancelAllScheduledNotificationsAsync()
        }
        let notifID = await Notifications.scheduleLocalNotificationAsync(
            notificationObj,
            {
                time: nextTime
            }
        )
        await AsyncStorage.setItem(NotifKey, JSON.stringify(true))
    } catch (error) {
        console.log(error);
    }
}

