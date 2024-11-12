// ziskani cteni pro danou lekci
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