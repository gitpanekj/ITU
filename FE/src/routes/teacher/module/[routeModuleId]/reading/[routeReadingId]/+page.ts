// Quiz detail page load - src/routes/module/[moduleId]/quiz/[quizId]/+page.ts
import { isValidId } from "$lib/utils/routeValidation";
import { error } from "@sveltejs/kit";


export async function load({ params } : { params: Record<string, string>}){
    const { routeModuleId, routeReadingId } = params;
    if (!isValidId(routeModuleId) || !isValidId(routeReadingId)) 
    {
        throw error(404, 'Page not found');
    };

    const moduleId: number = +routeModuleId;
    const readingId: number = +routeReadingId;

    // TODO: Fetch initial data - before page is rendered
    // const response = await fetch('');
    // const quiz_data = await response.json();

    return {
        props:
            {
                moduleId,
                readingId,
                // quiz_data
            }
    }
}