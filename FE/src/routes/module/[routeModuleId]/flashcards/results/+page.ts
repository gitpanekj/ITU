// Filename: \src\routes\module\[routeModuleId]\flashcards\results\+page.ts
// Author: Lucie Klímová
// Login: xklimo04
// Last Modified: [06-12-2024]
// Description: Page that shows the flashcards exercise results
import { isValidId } from "$lib/utils/routeValidation";
import { error } from "@sveltejs/kit";


export async function load({ params } : { params: Record<string, string>}){
    const { routeModuleId} = params;
    // Check the module id
    if (!isValidId(routeModuleId)) 
    {
        throw error(404, 'Page not found');
    };

    const moduleId: number = +routeModuleId;

    return {
        props:
            {
                moduleId,
            }
    }
}