// Quiz detail page load - src/routes/module/[moduleId]/quiz/[quizId]/+page.ts
import { isValidId } from "$lib/utils/routeValidation";
import { error } from "@sveltejs/kit";


export async function load({ params } : { params: Record<string, string>}){
    const { routeModuleId, routeQuizId } = params;
    if (!isValidId(routeModuleId) || !isValidId(routeQuizId)) 
    {
        throw error(404, 'Page not found');
    };

    const moduleId: number = +routeModuleId;
    const quizId: number = +routeQuizId;

    // TODO: Fetch initial data - before page is rendered
    // const response = await fetch('');
    // const quiz_data = await response.json();

    return {
        props:
            {
                moduleId,
                quizId,
                // quiz_data
            }
    }
}