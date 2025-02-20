import { ToastAndroid } from "react-native";
import Toast from "react-native-root-toast";

// export function ToastApp(message, duration) {
//     ToastAndroid.showWithGravity(
//         message,
//         ToastAndroid[duration] || ToastAndroid.SHORT,
//         ToastAndroid.BOTTOM
//     );
// }
export function ToastApp(message, duration) {
    Toast.show(message, {
        duration: Toast.durations[duration || "SHORT"],
        // position: Toast.positions.CENTER,
    });
}