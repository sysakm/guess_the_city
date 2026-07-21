import type {PhotoStatus, StatisticsCache, TaskOptions} from "../types.ts";
import {useEffect, useState} from "react";
import {requestCityPhoto} from "../api/unsplash.ts";
import {generateOptions} from "../game/data.ts";
import {loadStatsCache} from "../storage/statsStorage.ts";
import Photo from "./Photo.tsx";
import StatsBox from "./StatsBox.tsx";

function GameBoard() {
    const [status, setStatus] = useState<PhotoStatus>({
        type: 'idle',
        message: 'Nothing loaded yet.'
    })
    const [options, setOptions] = useState<TaskOptions>()
    const [stats, setStats] = useState<StatisticsCache>()
    const [chosenIndex, setChosenIndex] = useState<number>()

    async function loadPhoto(city: string) {
        setStatus({type: 'loading', message: 'Loading...'})
        try {
            const url = await requestCityPhoto(city)
            setStatus({type: 'success', url})
        } catch (error) {
            setStatus({type: 'error', message: error instanceof Error ? error.message : 'Something went wrong.'})
        }
    }

    function loadNewTask() {
        const newOptions = generateOptions()
        setOptions(newOptions)

        const correctCity = newOptions.cities[newOptions.correctIndex]
        void loadPhoto(correctCity)
    }

    useEffect(() => {
        const cache = loadStatsCache() ?? {wins: 0, losses: 0}
        setStats(cache)

        loadNewTask()
    }, [])


    return (
        <div>
            {stats && <StatsBox stats={stats}/>}
            <Photo status={status}/>
            <p>{JSON.stringify(options)}</p>

            <button
                type='button'
                onClick={loadNewTask}
            ></button>
        </div>
    )
}

export default GameBoard
