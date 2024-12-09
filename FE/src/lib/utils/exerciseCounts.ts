// Filename: exerciseCounts.ts
// Author: Vojtěch Růžička
// Login: xruzic56
// Last Modified: [09-12-2024]
// Description: Exercises statistics

// ziskani statistik pro danou lekci
export async function getExerciseConunts(moduleId: number): Promise<{ flashcards: number; quizes: number; readings: number; all: number; }> {
    let exercises_counts: {flashcards: number, quizes: number, readings: number, all: number} = {flashcards: 0, quizes: 0, readings: 0, all: 0};
    
    let response = await fetch(`http://localhost:3000/reading-exercise?groupId=${moduleId}`);
    let data = await response.json();
    exercises_counts.readings = data.total;
    exercises_counts.all += data.total;

    response = await fetch(`http://localhost:3000/flashcard-exercise?groupId=${moduleId}`);
    data = await response.json();
    exercises_counts.flashcards = data.total;
    exercises_counts.all += data.total;

    response = await fetch(`http://localhost:3000/quiz-exercise?groupId=${moduleId}`);
    data = await response.json();
    exercises_counts.quizes = data.total;
    exercises_counts.all += data.total;

    return exercises_counts;
}

// ulozeni statistik pro danou lekci do localStorage
export async function storeExerciseConunts(moduleId: number): Promise<void> {
    let exercises_counts: {flashcards: number, quizes: number, readings: number, all: number} = {flashcards: 0, quizes: 0, readings: 0, all: 0};
    
    let response = await fetch(`http://localhost:3000/reading-exercise?groupId=${moduleId}`);
    let data = await response.json();
    exercises_counts.readings = data.total;
    exercises_counts.all += data.total;

    response = await fetch(`http://localhost:3000/flashcard-exercise?groupId=${moduleId}`);
    data = await response.json();
    exercises_counts.flashcards = data.total;
    exercises_counts.all += data.total;

    response = await fetch(`http://localhost:3000/quiz-exercise?groupId=${moduleId}`);
    data = await response.json();
    exercises_counts.quizes = data.total;
    exercises_counts.all += data.total;

    localStorage.setItem("readings"+moduleId, exercises_counts.readings.toString());
    localStorage.setItem("flashcards"+moduleId, exercises_counts.flashcards.toString());
    localStorage.setItem("quizes"+moduleId, exercises_counts.quizes.toString());
    localStorage.setItem("all"+moduleId, exercises_counts.all.toString());
}

// vytazeni statistik pro danou lekci z localStorage
export async function loadExerciseConunts(moduleId: number): Promise<{ flashcards: number; quizes: number; readings: number; all: number; }> {
    let exercises_counts: {flashcards: number, quizes: number, readings: number, all: number} = {flashcards: 0, quizes: 0, readings: 0, all: 0};

    exercises_counts.readings = Number(localStorage.getItem("readings"+moduleId));
    exercises_counts.flashcards = Number(localStorage.getItem("flashcards"+moduleId));
    exercises_counts.quizes = Number(localStorage.getItem("quizes"+moduleId));
    exercises_counts.all = Number(localStorage.getItem("all"+moduleId));

    return exercises_counts;
}
