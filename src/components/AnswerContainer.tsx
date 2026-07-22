import type {TaskOptions} from "../types.ts";
import AnswerButton from "./AnswerButton.tsx";

type AnswerContainerProps = {
    options: TaskOptions;
    chosenIndex: number | undefined;
    updateChosenIndex: (index: number) => void;
}

function AnswerContainer({options, chosenIndex, updateChosenIndex}: AnswerContainerProps) {

    function handleClick(buttonIndex: number) {
        updateChosenIndex(buttonIndex)
    }

    return (
        <div className='answers'>
            {chosenIndex !== undefined && (
                chosenIndex === options.correctIndex ?
                    <p className='answer-result success'>Correct!</p> :
                    <p className='answer-result error'>Wrong! The answer is {options.cities[options.correctIndex]}.</p>
            )}
            <div className='answer-grid'>
                {options.cities.map((city, index) => (
                    <AnswerButton
                        key={city}
                        disabled={chosenIndex !== undefined}
                        city={city}
                        isCorrect={index === options.correctIndex}
                        isChosen={index === chosenIndex}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default AnswerContainer
