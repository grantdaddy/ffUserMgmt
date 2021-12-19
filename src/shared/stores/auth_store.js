import { writable } from 'svelte/store'


const initial_state = {
    token: localStorage.getItem("jwt") === null ? "" : localStorage.getItem("jwt")
}

const createStore = () => {
    const { subscribe, update, set } = writable(initial_state)
    return {
        ...initial_state,
        subscribe,
        set_token: (value) => {
            localStorage.setItem("jwt", value);
            update(state => (state = { ...state, token: value }))
        },
        get_token: async () => {
            let response = await fetch(
                'https://www.firstfleetinc.com/desktopmodules/ffmobile/api/authentication/retrievejwt',
                { credentials: 'include' },
            )
            set_token(JSON.parse(await response.json()))
        }
    }
}

export const auth_store = createStore()