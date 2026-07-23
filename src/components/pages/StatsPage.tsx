import {loadStatsForAllUsers} from "../../storage/statsStorage.ts";
import type {StatisticsCache, StatisticsEntry} from "../../types.ts";
import {useState} from "react";

type SortingKey = 'user' | 'wins' | 'losses' | 'winRate'
const SORTING_KEYS: Record<SortingKey, (entry: StatisticsEntry) => unknown> = {
    user: (entry: StatisticsEntry) => entry.user,
    wins: (entry: StatisticsEntry) => entry.stats.wins,
    losses: (entry: StatisticsEntry) => entry.stats.losses,
    winRate: (entry: StatisticsEntry) => calculateWinRate(entry.stats)
}
const DEFAULT_SORTING_KEY: SortingKey = 'wins'

type SortingWay = 'asc' | 'desc'
const SORTING_WAYS: Record<SortingWay, (a: unknown, b: unknown) => number> = {
    asc: function<T>(a: T, b: T): number {
        if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b)
        } else if (typeof a === 'number' && typeof b === 'number') {
            return a - b
        } else {
            return 0
        }
    },
    desc: function<T>(a: T, b: T): number {
        if (typeof a === 'string' && typeof b === 'string') {
            return b.localeCompare(a)
        } else if (typeof a === 'number' && typeof b === 'number') {
            return b - a
        } else {
            return 0
        }
    },
}

function updateSorting(sortingKey: SortingKey, sortingWay: SortingWay, pressedKey: SortingKey): [SortingKey, SortingWay] {
    if (sortingKey === pressedKey) {
        if (sortingWay === 'desc') {
            return [sortingKey, 'asc']
        } else {
            return [DEFAULT_SORTING_KEY, 'desc']
        }
    } else {
        return [pressedKey, 'desc']
    }
}

function createSorting(sortingKey: SortingKey, sortingWay: SortingWay) {
    return (entryA: StatisticsEntry, entryB: StatisticsEntry) => {
        const valueA = SORTING_KEYS[sortingKey](entryA)
        const valueB = SORTING_KEYS[sortingKey](entryB)
        return SORTING_WAYS[sortingWay](valueA, valueB)
    }
}

function calculateWinRate(stats: StatisticsCache) {
    return Math.round(
        (stats.wins+stats.losses) ? 10000 * stats.wins / (stats.wins+stats.losses) : 0
    ) / 100
}

function StatsPage() {
    const [sortingKey, setSortingKey] = useState<SortingKey>('wins')
    const [sortingWay, setSortingWay] = useState<SortingWay>('desc')

    function handleUpdateSorting(pressedKey: SortingKey) {
        const [newSortingKey, newSortingWay] = updateSorting(sortingKey, sortingWay, pressedKey)
        setSortingKey(newSortingKey)
        setSortingWay(newSortingWay)
    }

    const statsList = loadStatsForAllUsers().sort(
        createSorting(sortingKey, sortingWay)
    )
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <button type='button' onClick={() => handleUpdateSorting('user')}>
                                Username
                            </button>
                        </th>
                        <th>
                            <button type='button' onClick={() => handleUpdateSorting('wins')}>
                                Wins
                            </button>
                        </th>
                        <th>
                            <button type='button' onClick={() => handleUpdateSorting('losses')}>
                                Losses
                            </button>
                        </th>
                        <th>
                            <button type='button' onClick={() => handleUpdateSorting('winRate')}>
                                Win Rate
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {statsList.length ? statsList.map(({user, stats}) => {
                        const winRate = calculateWinRate(stats)
                        return (
                            <tr key={`${user}-statistics-row`}>
                                <td>{user}</td>
                                <td>{stats.wins >= 0 ? stats.wins : 0}</td>
                                <td>{stats.losses >= 0 ? stats.losses : 0}</td>
                                <td>{winRate.toFixed(2)}%</td>
                            </tr>
                        )
                    }) : (
                        <tr>
                            <td colSpan={4}>No statistics yet...</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default StatsPage