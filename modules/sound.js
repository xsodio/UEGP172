/**
 * @file sound.js
 * @description This module contains functions for sound playback.
 */

/**
 * Plays the specified sound.
 * @param {HTMLAudioElement} sound - The sound to play.
 */
export function playSound(sound) {
    if (sound) {
        const playPromise = sound.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log("[Sound] Sound played.");
            }).catch(error => {
                console.warn("[Sound] Could not play sound:", error);
            });
        }
    } else {
        console.warn("[Sound] Sound element not found.");
    }
}