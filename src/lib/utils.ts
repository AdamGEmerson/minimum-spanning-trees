import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Used for CSS Styling / Tailwind CSS
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
