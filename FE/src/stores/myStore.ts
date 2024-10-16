import { writable } from "svelte/store";

export const myStore = writable<number>(0);