import { TPostLikes } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const checkIsLiked = (likes: TPostLikes[], userId: number) => likes.some((like: TPostLikes) => like.iduser === userId);

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);