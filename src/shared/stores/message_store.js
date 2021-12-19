import { writable } from 'svelte/store'


const initial_state = {
    message: ""
}

const createStore = () => {
    const { subscribe, update, set } = writable(initial_state)
    return {
        ...initial_state,
        subscribe,
        set_message: (value) => {
            update(state => (state = { ...state, message: value }))
        }
    }
}

export const message_store = createStore()