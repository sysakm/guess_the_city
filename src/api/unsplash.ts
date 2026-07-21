// Usage example:
// https://api.unsplash.com/photos/random?query={city}&client_id={token}

import type {UnsplashResponse} from "../types.ts";

const BASE_URL = 'https://api.unsplash.com/photos/random'
const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string | undefined

export async function requestCityPhoto(city: string): Promise<string> {
    if (!API_KEY) {
        throw new Error('No API key provided - please add your own key to .env.local for parameter VITE_UNSPLASH_ACCESS_KEY')
    }
    const params = new URLSearchParams({
        query: city,
        client_id: API_KEY
    })
    const response = await fetch(`${BASE_URL}?${params.toString()}`)
    const data = (await response.json()) as UnsplashResponse
    if (!response.ok) {
        throw new Error(data.message || 'Photo request failed')
    }
    const result = data.urls.small
    if (!result) {
        throw new Error(data.message || 'No photo link found in response')
    }
    return result
}
