// Filename: FE/src/routes/module/[moduleId]/+page.ts
// Author: Vojtěch Růžička
// Login: xruzic56
// Last Modified: [09-12-2024]
// Description: Lection detail page load

import { isValidId } from "$lib/utils/routeValidation";
import { error } from "@sveltejs/kit";


export async function load({ params } : { params: Record<string, string>}){
    const { routeModuleId } = params;
    if (!isValidId(routeModuleId)) 
    {
        throw error(404, 'Page not found');
    };
    const moduleId = +routeModuleId;

    let response = await fetch(`http://localhost:3000/exercise-group/${moduleId}`); 
    let module_data = await response.json();

    return {
        props:
            {
                moduleId,
                module_data
            }
    }
}