import type {StatisticsCache} from "../types.ts";

type StatsBoxProps = {
    stats: StatisticsCache
}

function StatsBox({stats}: StatsBoxProps) {
    return (
        <div className='stats-box' aria-label='Game statistics'>
            <p>Wins <strong className='success'>{stats.wins}</strong></p>
            <span className='stats-box__divider' aria-hidden='true'/>
            <p>Losses <strong className='error'>{stats.losses}</strong></p>
        </div>
    )
}

export default StatsBox
