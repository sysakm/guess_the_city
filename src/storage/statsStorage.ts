import type {FullStatisticsTable, StatisticsCache} from "../types.ts";

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

export function validateStatsCache(cache: unknown): cache is StatisticsCache {
    if (cache === null || typeof cache !== 'object') {
        return false
    }
    if (!('wins' in cache) || !('losses' in cache)) {
        return false
    }

    const wins: unknown = cache.wins
    const losses: unknown = cache.losses

    return (
        typeof wins === 'number' && Number.isInteger(wins) && wins >= 0 &&
        typeof losses === 'number' && Number.isInteger(losses) && losses >= 0
    )
}

export function loadStatsCache(user: string): StatisticsCache | null {
    const rawCache: string | null = localStorage.getItem(KEY + user);
    if (!rawCache) {
        return null
    }
    try {
        const rawCacheParsed = JSON.parse(rawCache)
        if (!validateStatsCache(rawCacheParsed)) {
            throw new Error('Bad cache encountered in localStorage')
        }
        return rawCacheParsed as StatisticsCache
    } catch {
        localStorage.removeItem(KEY + user)
        return null
    }
}

export function loadStatsForAllUsers(): FullStatisticsTable {
    const result: FullStatisticsTable = []
    for (const key of Object.keys(localStorage)) {
        if (key.startsWith(KEY)) {
            const user = key.slice(KEY.length)
            const stats: StatisticsCache | null = loadStatsCache(user)
            if (stats) {
                result.push({user, stats})
            }
        }
    }
    return result
}