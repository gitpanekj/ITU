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