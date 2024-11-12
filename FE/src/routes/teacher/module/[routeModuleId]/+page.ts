// Module detail page load - src/routes/module/[moduleId]/+page.ts
import { isValidId } from "$lib/utils/routeValidation";
import { error } from "@sveltejs/kit";


export async function load({ params } : { params: Record<string, string>}){
    const { routeModuleId } = params;
    if (!isValidId(routeModuleId)) 
    {
        throw error(404, 'Page not found');
    };
    const moduleId = +routeModuleId;

    // TODO: Fetch initial data - before page is rendered
    // const response = await fetch('');
    // const module_data = await response.json();

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