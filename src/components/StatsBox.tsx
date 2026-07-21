import type {StatisticsCache} from "../types.ts";

type StatsBoxProps = {
    stats: StatisticsCache
}

function StatsBox({stats}: StatsBoxProps) {
    return (
        <p>You won <span>{stats.wins}</span> times. You lost <span>{stats.losses}</span> times.</p>
    )
}

export default StatsBox