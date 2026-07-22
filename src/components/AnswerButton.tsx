type AnswerButtonProps = {
    disabled: boolean;
    city: string;
    isCorrect: boolean;
    isChosen: boolean;
    onClick: () => void;
}

function AnswerButton({disabled, city, isCorrect, isChosen, onClick}: AnswerButtonProps) {
    const resultClass = isChosen || (disabled && isCorrect) ? (isCorrect ? 'success' : 'error') : ''

    return (
        <button
            className={`answer-button ${resultClass}`}
            type='button'
            disabled={disabled}
            onClick={() => onClick()}
        >{city}</button>
    )
}

export default AnswerButton
