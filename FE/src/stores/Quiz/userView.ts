// Filename: FE/src/stores/Quiz/userView.ts
// Author: Jiří Kantor
// Login: xkanto16
// Last Modified: [08-12-2024]
// Description: Quiz question and evaluation view store

import { writable } from 'svelte/store';

type ViewState = {view: string};

function createUserViewStore(){
	const { subscribe, set, update } = writable<ViewState>({view: 'question'});
	
	return {
		subscribe,
		/* state_management_functions */
		goto_question_view: () => set({view:'question'}),
        goto_evaluation_view: () => set({view:'evaluation'}),
	}
}

export const userView = createUserViewStore();