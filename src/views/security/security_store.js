import { writable } from 'svelte/store'
import { http_service } from "../../shared/services/http_service"

const initial_state = {
    roles: [],
    role: undefined,
    users: []
}

const createStore = () => {
    const { subscribe, update, set } = writable(initial_state)
    return {
        ...initial_state,
        subscribe,
        load_roles: async () => {
            const response = await http_service.get("roles")
            update(state => (state = {
                ...state,
                roles: response.status === 200
                    ? response.json
                    : []
            }))
        },
        set_role: async (role) => {
            const response = await http_service.get(`users/${role.RoleId}`)
            update(state => (state = {
                ...state,
                role: role,
                users: response.status === 200
                    ? response.json
                    : []
            }))
        },
        clear_role: () => {
            update(state => (state = {
                ...state,
                role: undefined,
                users: []
            }))
        },
        search_users: async (criteria) => await http_service.post("searchUsers", {
            roleId: criteria.role_id,
            criteria: criteria.criteria
        }),
        create_user_role: async (criteria) => {
            const response = await http_service.post("addUserRole", {
                username: criteria.username,
                roleId: criteria.roleId
            })
            update(state => (state = {
                ...state,
                users: response.status === 200
                    ? [...state.users, response.json[0]]
                    : state.users
            }))
        },
        remove_user_role: async (criteria) => {
            const response = await http_service.post("deleteUserRole", {
                username: criteria.username,
                roleId: criteria.roleId
            })
            update(state => (state = {
                ...state,
                users: response.status === 200
                    ? state.users.filter(u => u.UserName !== response.json[0].DeletedUserName)
                    : state.users
            }))
        },
        clear_state: () => {
            update(state => (state = initial_state))
        }
    }
}

export const security_store = createStore()