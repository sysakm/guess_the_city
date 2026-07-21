export type UnsplashResponse = {
    urls: {
        small: string;
    };
    message?: string;
}

export type PhotoStatus =
    | {type: 'idle'; message: string;}
    | {type: 'loading'; message: string;}
    | {type: 'error'; message: string;}
    | {type: 'success'; url: string;}

export type TaskOptions = {
    cities: Array<string>;
    correctIndex: number;
}

export type StatisticsCache = {
    wins: number;
    losses: number;
}