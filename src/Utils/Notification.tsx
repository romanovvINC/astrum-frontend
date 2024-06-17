import { Store } from "react-notifications-component";
import { toast } from "react-toastify";

export const notification = (
    title?: string | null,
    message?: string,
    type: "success" | "danger" | "info" | "default" | "warning" | null = "danger"
) => {
    //TODO... use Toast...
    //toast(message, { type: type });
    Store.addNotification({
        title: title || "Ошибка!",
        message: message || "Перезагрузите страницу.",
        type: type || "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
            duration: 5000,
            onScreen: true,
        },
    });
};
