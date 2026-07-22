import type {PhotoStatus} from "../types.ts";

type PhotoProps = {status: PhotoStatus}

function Photo({status}: PhotoProps) {
    if (status.type === 'idle' || status.type === 'loading') {
        return (
            <div className='photo-frame photo-frame--message'>
                <p>{status.message}</p>
            </div>
        )
    }
    if (status.type === 'error') {
        return (
            <div className='photo-frame photo-frame--message'>
                <p className='error'>{status.message}</p>
            </div>
        )
    }
    return (
        <div className='photo-frame'>
            <img src={status.url} alt='City to guess'/>
        </div>
    )
}

export default Photo
