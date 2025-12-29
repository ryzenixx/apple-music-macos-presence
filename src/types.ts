export interface TrackInfo {
    name: string;
    artist: string;
    album: string;
    duration: number;
    position: number;
    state: 'playing' | 'paused' | 'stopped';
}

export interface DiscordActivity {
    details?: string;
    state?: string;
    startTimestamp?: Date | number;
    endTimestamp?: Date | number;
    largeImageKey?: string;
    largeImageText?: string;
    smallImageKey?: string;
    smallImageText?: string;
    instance?: boolean;
    type?: number;
}
