// Filename: FE/src/routes/module/[moduleId]/quiz/[quizId]/+page.ts
// Author: Jiří Kantor
// Login: xkanto16
// Last Modified: [08-12-2024]
// Description: Quiz main page typescripts

import { isValidId } from "$lib/utils/routeValidation";
import { error } from "@sveltejs/kit";

// page load function
export async function load({ params } : { params: Record<string, string>}){
    const { routeModuleId, routeQuizId } = params;
    if (!isValidId(routeModuleId) || !isValidId(routeQuizId)) 
    {
        throw error(404, 'Page not found');
    };

    const moduleId: number = +routeModuleId;
    const quizId: number = +routeQuizId;

    return {
        props:
            {
                moduleId,
                quizId,
            }
    }
}