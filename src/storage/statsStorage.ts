import type {StatisticsCache} from "../types.ts";

const LAST_LOGIN_KEY = 'city-game-last-login'
const KEY = 'city-game-stats-cache-for-login-'

export function saveLogin(user: string) {
    localStorage.setItem(LAST_LOGIN_KEY, user)
}

export function loadLogin(): string | null {
    return localStorage.getItem(LAST_LOGIN_KEY)
}

export function saveStatsCache(user: string, cache: StatisticsCache) {
    localStorage.setItem(KEY + user, JSON.stringify(cache));
}

export function loadStatsCache(user: string): StatisticsCache | null {
    const rawCache: string | null = localStorage.getItem(KEY + user);
    if (!rawCache) {
        return null
    }
    try {
        return JSON.parse(rawCache) as StatisticsCache
    } catch {
        localStorage.removeItem(KEY + user)
        return null
    }
}
