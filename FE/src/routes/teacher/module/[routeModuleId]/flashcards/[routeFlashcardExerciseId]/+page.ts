// Module detail page load - src/routes/module/[moduleId]/flashcards/[flashcardExcerciseId]/+page.svelte
import { isValidId } from "$lib/utils/routeValidation";
import { error } from "@sveltejs/kit";


export async function load({ params } : { params: Record<string, string>}){
    const { routeModuleId, routeFlashcardExerciseId } = params;
    if (!isValidId(routeModuleId) || !isValidId(routeFlashcardExerciseId)) 
    {
        throw error(404, 'Page not found');
    };

    const moduleId: number = +routeModuleId;
    const flashcardExerciseId: number = +routeFlashcardExerciseId;

    // TODO: Fetch initial data - before page is rendered
    // const response = await fetch('');
    // const data = await response.json();

    return {
        props:
            {
                moduleId,
                flashcardExerciseId,
                //data
            }
    }
}