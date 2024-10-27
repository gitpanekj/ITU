import { writable } from 'svelte/store';

type ViewState = {view: string, id: number | null, editting: boolean};

function createTeacherViewStore(){
	const { subscribe, set, update } = writable<ViewState>({view: 'list', id: null, editting: false});
	
	return {
		subscribe,
		/* state_management_functions */
		goto_list_view: () => set({view:'list', id: null, editting: false}),
		goto_detail: (id: number | null) => set({view: 'detail', id: id, editting: false}),
		edit_mode: () => update((state: ViewState) => {state.editting = true; return state;}),
		view_mode: () => update((state: ViewState) => {state.editting = false; return state;})
	}
}

export const teacherView = createTeacherViewStore();