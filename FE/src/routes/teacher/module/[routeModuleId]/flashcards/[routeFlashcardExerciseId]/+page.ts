// Filename: src\routes\teacher\module\[routeModuleId]\flashcards\[routeFlashcardExerciseId]\+page.ts
// Author: Lucie Klímová
// Login: xklimo04
// Last Modified: [06-12-2024]
// Description: Page that shows the teacher detail of his flashcard exercise

import { isValidId } from "$lib/utils/routeValidation";
import { error } from "@sveltejs/kit";


export async function load({ params } : { params: Record<string, string>}){
    const { routeModuleId, routeFlashcardExerciseId } = params;
    // Check the ids
    if (!isValidId(routeModuleId) || !isValidId(routeFlashcardExerciseId)) 
    {
        throw error(404, 'Page not found');
    };

    const moduleId: number = +routeModuleId;
    const flashcardExerciseId: number = +routeFlashcardExerciseId;

    return {
        props:
            {
                moduleId,
                flashcardExerciseId,
            }
    }
}