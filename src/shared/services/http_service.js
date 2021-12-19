import { auth_store } from "../stores/auth_store"
import { message_store } from "../stores/message_store"

export const base_url = () => window.location.host == 'localhost:5000'
    ? "DEVBASEURL"
    : "PRODBASURL"

let token = ""

auth_store.subscribe(store => {
    token = store.token
})

const create_service = () => {
    return {
        get: async (path) => {
            let result = {
                status: 0,
                json: undefined,
                message: ""
            }
            try {
                let res = await fetch(`${base_url()}/${path}`, {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        'x-access-token': token
                    }
                })
                result.status = res.status,
                result.json = await res.json()
            } catch (ex) {
                result.status = 500
                result.message = ex.message
                message_store.set_message("There was an exception while communicating with the server.")
            }
            return result
        },
        post: async (path, params) => {
            let res = await fetch(`${base_url()}/${path}`, {
                method: "POST",
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'x-access-token': token
                }
            })
            return {
                status: res.status,
                json: await res.json()
            }
        }
    }
}

export const http_service = create_service()