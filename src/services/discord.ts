import { Client } from 'discord-rpc';
import { DISCORD_CLIENT_ID } from '../config/constants';
import { TrackInfo, DiscordActivity } from '../types';

export class DiscordService {
    private client: Client;
    private userId: string | null = null;

    constructor() {
        this.client = new Client({ transport: 'ipc' });
        this.applyMonkeyPatch();

        this.client.on('ready', () => {
            this.userId = this.client.user?.username || 'Unknown';
            console.log(`Discord RPC Connected (User: ${this.userId})`);
        });
    }

    public async connect(): Promise<void> {
        await this.client.login({ clientId: DISCORD_CLIENT_ID });
    }

    public async clearActivity(): Promise<void> {
        await this.client.clearActivity();
    }

    public async setActivity(track: TrackInfo, artworkUrl?: string | null): Promise<void> {
        const endTimestamp = new Date(Date.now() + (track.duration - track.position) * 1000);
        const startTimestamp = new Date(Date.now() - track.position * 1000);

        const activity: DiscordActivity = {
            details: track.name,
            state: `par ${track.artist}`,
            type: 2,
            largeImageKey: artworkUrl || 'logo',
            largeImageText: track.album,
            instance: false,
            startTimestamp: startTimestamp,
            endTimestamp: endTimestamp,
            smallImageKey: 'play',
            smallImageText: 'Playing'
        };

        await this.client.setActivity(activity);
        console.log(`Updated Activity: ${track.name} (${track.state})`);
    }

    private applyMonkeyPatch() {
        (Client.prototype as any).setActivity = function (args: any = {}, pid: number | null = null) {
            if (!pid) pid = process.pid;

            return (this as any).request('SET_ACTIVITY', {
                pid,
                activity: {
                    state: args.state,
                    details: args.details,
                    timestamps: (args.startTimestamp || args.endTimestamp) ? {
                        start: args.startTimestamp ? Math.round(args.startTimestamp.getTime()) : undefined,
                        end: args.endTimestamp ? Math.round(args.endTimestamp.getTime()) : undefined,
                    } : undefined,
                    assets: {
                        large_image: args.largeImageKey,
                        large_text: args.largeImageText,
                        small_image: args.smallImageKey,
                        small_text: args.smallImageText,
                    },
                    instance: !!args.instance,
                    type: args.type,
                },
            });
        };
    }
}
