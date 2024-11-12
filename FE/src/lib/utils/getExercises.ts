
// ziskani karticek pro danou lekci
export async function getFlashcards(moduleId: number): Promise<{ id: number; name: string; description: string; groupId: number; }[]> {
    const response = await fetch(`http://localhost:3000/flashcard-exercise?groupId=${moduleId}`);
    const data = await response.json();
    return data.data;
}

// ziskani kvizu pro danou lekci
export async function getQuizes(moduleId: number): Promise<{ id: number; name: string; description: string; groupId: number; }[]> {
    const response = await fetch(`http://localhost:3000/quiz-exercise?groupId=${moduleId}`);
    const data = await response.json();
    return data.data;
}

// ziskani cteni pro danou lekci
export async function getReadings(moduleId: number): Promise<{ id: number; name: string; description: string; groupId: number; }[]> {
    const response = await fetch(`http://localhost:3000/reading-exercise?groupId=${moduleId}`);
    const data = await response.json();
    return data.data;
}
