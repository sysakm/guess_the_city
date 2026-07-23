import type {PhotoStatus, StatisticsCache, TaskOptions} from "../../types.ts";
import {useEffect, useState} from "react";
import {requestCityPhoto} from "../../api/unsplash.ts";
import {generateOptions} from "../../game/data.ts";
import {loadStatsCache, saveStatsCache} from "../../storage/statsStorage.ts";
import Photo from "../Photo.tsx";
import StatsBox from "../StatsBox.tsx";
import AnswerContainer from "../AnswerContainer.tsx";

type GamePageProps = {
    user: string;
}

function GamePage({user}: GamePageProps){
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
        setChosenIndex(undefined)

        const correctCity = newOptions.cities[newOptions.correctIndex]
        void loadPhoto(correctCity)
    }

    useEffect(() => {
        const cache = loadStatsCache(user) ?? {wins: 0, losses: 0}
        setStats(cache)

        loadNewTask()
    }, [user])

    useEffect(() => {
        if (stats) {
            saveStatsCache(user, stats)
        }
    }, [user, stats])

    function handleAnswer(index: number) {
        if (chosenIndex !== undefined) {
            return
        }
        setChosenIndex(index)
        if (options === undefined) {
            throw new Error('Something went wrong with task creation.')
        } else if (index === options.correctIndex) {
            setStats(
                (s) => ({
                    wins: (s?.wins ?? 0) + 1,
                    losses: (s?.losses ?? 0)
                })
            )
        } else {
            setStats(
                (s) => ({
                    wins: (s?.wins ?? 0),
                    losses: (s?.losses ?? 0) + 1
                })
            )
        }
    }

    function resetStatistics() {
        const areYouSure = confirm('Are you sure you want to reset your stats?')
        if (areYouSure) {
            setStats({wins: 0, losses: 0})
        }
    }

    return (
        <section className='game-card'>
            <div className='game-card__header'>
                <p className='game-card__eyebrow'>Photo quiz</p>
                <h1>Guess the City</h1>
                <p className='game-card__subtitle'>Choose the city shown in the photo.</p>
            </div>
            {stats && <StatsBox user={user} stats={stats}/>}
            <Photo status={status}/>
            {(status.type === 'success') && options && <AnswerContainer
                options={options}
                chosenIndex={chosenIndex}
                updateChosenIndex={handleAnswer}
            />}

            <div className='game-actions'>
                <button
                    className='action-button action-button--primary'
                    type='button'
                    onClick={loadNewTask}
                    disabled={status.type === 'loading'}
                >Next city</button>
                <button
                    className='action-button action-button--secondary'
                    type='button'
                    onClick={resetStatistics}
                >Reset statistics</button>
            </div>
        </section>
    )
}

export default GamePage
