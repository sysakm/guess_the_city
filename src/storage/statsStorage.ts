import type {StatisticsCache} from "../types.ts";

const KEY = 'city-game-stats-cache'

export function saveStatsCache(cache: StatisticsCache) {
    localStorage.setItem(KEY, JSON.stringify(cache));
}

export function loadStatsCache(): StatisticsCache | null {
    const rawCache: string | null = localStorage.getItem(KEY);
    if (!rawCache) {
        return null
    }
    try {
        return JSON.parse(rawCache) as StatisticsCache
    } catch {
        localStorage.removeItem(KEY)
        return null
    }
}
