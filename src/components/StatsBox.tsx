import type {StatisticsCache} from "../types.ts";

type StatsBoxProps = {
    stats: StatisticsCache
}

function StatsBox({stats}: StatsBoxProps) {
    return (
        <p>
            You won <span className='success'>{stats.wins}</span> times.
            You lost <span className='error'>{stats.losses}</span> times.
        </p>
    )
}

export default StatsBox
