// Module detail page load - src/routes/module/[moduleId]/flashcards/[flashcardId]/+page.svelte
import { isValidId } from "$lib/utils/routeValidation";
import { error } from "@sveltejs/kit";


export async function load({ params } : { params: Record<string, string>}){
    const { routeModuleId, routeFlashcardId } = params;
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