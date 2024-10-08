import { TPostLikes } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const checkIsLiked = (likes: TPostLikes[], userId: number) => likes.some((like: TPostLikes) => like.iduser === userId);

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formatDateString(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("fr-FR", options);

    const time = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });

    return `${formattedDate} à ${time}`;
}


export const multiFormatDateString = (timestamp: string = ""): string => {
    const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
    const date: Date = new Date(timestampNum * 1000);
    const now: Date = new Date();

    const diff: number = now.getTime() - date.getTime();
    const diffInSeconds: number = diff / 1000;
    const diffInMinutes: number = diffInSeconds / 60;
    const diffInHours: number = diffInMinutes / 60;
    const diffInDays: number = diffInHours / 24;

    switch (true) {
        case Math.floor(diffInDays) >= 30:
            return formatDateString(timestamp);
        case Math.floor(diffInDays) > 1 && diffInDays < 30:
            return `Posté il y a ${Math.floor(diffInDays)} jours`;
        case Math.floor(diffInDays) === 1:
            return `Posté il y a ${Math.floor(diffInDays)} jour`;
        case Math.floor(diffInHours) > 1:
            return `Posté il y a ${Math.floor(diffInHours)} heures`;
        case Math.floor(diffInHours) === 1:
            return `Posté il y a ${Math.floor(diffInHours)} heure`;
        case Math.floor(diffInMinutes) > 1:
            return `Posté il y a ${Math.floor(diffInMinutes)} minutes`;
        case Math.floor(diffInMinutes) === 1:
            return `Posté il y a ${Math.floor(diffInMinutes)} minute`;
        default:
            return "À l'instant";
    }
};