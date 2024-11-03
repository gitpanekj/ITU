// Module detail page load - src/routes/module/[moduleId]/flashcards/[flashcardId]/+page.svelte
import { isValidId } from "$lib/utils/routeValidation";
import { error } from "@sveltejs/kit";


export async function load({ params } : { params: Record<string, string>}){
    const { routeModuleId} = params;
    if (!isValidId(routeModuleId)) 
    {
        throw error(404, 'Page not found');
    };

    const moduleId: number = +routeModuleId;

    return {
        props:
            {
                moduleId,
                // data
            }
    }
}