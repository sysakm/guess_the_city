import type {PhotoStatus} from "../types.ts";

type PhotoProps = {status: PhotoStatus}

function Photo({status}: PhotoProps) {
    if (status.type === 'idle' || status.type === 'loading') {
        return (
            <p>{status.message}</p>
        )
    }
    if (status.type === 'error') {
        return (
            <p className='error'>{status.message}</p>
        )
    }
    return (
        <img src={status.url} alt='photo' />
    )
}

export default Photo