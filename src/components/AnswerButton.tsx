type AnswerButtonProps = {
    disabled: boolean;
    city: string;
    isCorrect: boolean;
    isChosen: boolean;
    onClick: () => void;
}

function AnswerButton({disabled, city, isCorrect, isChosen, onClick}: AnswerButtonProps) {
    return (
        <button
            className={isChosen || (disabled && isCorrect) ? (isCorrect ? 'success' : 'error') : ''}
            type='button'
            disabled={disabled}
            onClick={() => onClick()}
        >{city}</button>
    )
}

export default AnswerButton
