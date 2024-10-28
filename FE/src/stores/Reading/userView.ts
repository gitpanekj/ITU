import { writable } from 'svelte/store';

type ViewState = {view: string, question?: {id: number, chosen: string, hard: boolean}};

function createUserViewStore(){
	const { subscribe, set, update } = writable<ViewState>({view: 'question', question: {id: 0, chosen: "", hard: false}});
	
	return {
		subscribe,
		/* state_management_functions */
		goto_question_view: () => set({view:'question', question: undefined}),
        goto_evaluation_list_view: () => set({view:'evaluation', question: undefined}),
        goto_evaluation_detail_view: (question: {id: number, chosen: string, hard: boolean}) => set({view:'detail', question: question}),
	}
}

export const userView = createUserViewStore();