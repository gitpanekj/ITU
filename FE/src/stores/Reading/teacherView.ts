import { writable } from 'svelte/store';

type ViewState = {view: string, id: number | null};

function createTeacherViewStore(){
	const { subscribe, set, update } = writable<ViewState>({view: 'list', id: null});
	
	return {
		subscribe,
		/* state_management_functions */
		goto_list_view: () => set({view:'list', id: null}),
		goto_detail: (id: number | null) => set({view: 'detail', id: id})
	}
}

export const teacherView = createTeacherViewStore();