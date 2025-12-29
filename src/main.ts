import { getCurrentTrack } from './services/apple-music';
import { getAlbumArtwork } from './services/artwork';
import { DiscordService } from './services/discord';

async function main() {
    console.log('Starting Apple Music Presence...');

    const discord = new DiscordService();

    try {
        await discord.connect();
    } catch (e) {
        console.error('Failed to connect to Discord:', e);
        return;
    }

    let lastTrackName: string | null = null;

    while (true) {
        try {
            const track = await getCurrentTrack();

            if (!track || track.state === 'stopped' || track.state === 'paused') {
                if (lastTrackName !== null) {
                    await discord.clearActivity();
                    lastTrackName = null;
                }
            } else {
                const artworkUrl = await getAlbumArtwork(track.artist, track.album, track.name);

                await discord.setActivity(track, artworkUrl);
                lastTrackName = track.name;
            }
        } catch (error) {
            console.error('Error in main loop:', error);
        }

        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

main().catch(console.error);
