// Filename: \src\routes\module\[routeModuleId]\flashcards\[routeFlashcardId]\+page.ts
// Author: Lucie Klímová
// Login: xklimo04
// Last Modified: [06-12-2024]
// Description: Page that shows the flashcards detail and allows student to flip it and submit feedback

import { isValidId } from "$lib/utils/routeValidation";
import { error } from "@sveltejs/kit";


export async function load({ params } : { params: Record<string, string>}){
    const { routeModuleId, routeFlashcardId } = params;
    // Check the ids
    if (!isValidId(routeModuleId) || !isValidId(routeFlashcardId)) 
    {
        throw error(404, 'Page not found');
    };

    const moduleId: number = +routeModuleId;
    const flashcardId: number = +routeFlashcardId;

    const response = await fetch(`http://localhost:3000/flashcard-exercise/card/${flashcardId}`);
    const data = await response.json();
    return {
        props:
            {
                moduleId,
                flashcardId,
                data
            }
    }
}