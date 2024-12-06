// Filename: FE/src/routes/teacher/module/[routeModuleId]/reading/[routeReadingId]/+page.ts
// Author: Jan Pánek
// Login: xpanek11
// Last Modified: [06-12-2024]
// Description: Page that shows the teacher detail of his reading exercise

import { isValidId } from "$lib/utils/routeValidation";
import { error } from "@sveltejs/kit";

// parse route parameters - moduleId, readingId
// and pass it to the page.svelte before the first render
export async function load({ params } : { params: Record<string, string>}){
    const { routeModuleId, routeReadingId } = params;
    if (!isValidId(routeModuleId) || !isValidId(routeReadingId)) 
    {
        throw error(404, 'Page not found');
    };

    const moduleId: number = +routeModuleId;
    const readingId: number = +routeReadingId;

    return {
        props:
            {
                moduleId,
                readingId
            }
    }
}