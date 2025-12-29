import { exec } from 'child_process';
import { promisify } from 'util';
import { TrackInfo } from '../types';

const execAsync = promisify(exec);


export async function getCurrentTrack(): Promise<TrackInfo | null> {
    const script = `
    var music = Application('Music');
    var result = { state: 'stopped' };
    
    if (music.running()) {
        try {
            var state = music.playerState();
            
            if (state !== 'stopped') {
                var track = music.currentTrack;
                result = {
                    name: track.name(),
                    artist: track.artist(),
                    album: track.album(),
                    duration: track.duration(),
                    position: music.playerPosition(),
                    state: state
                };
            }
        } catch (e) {
        }
    }
    JSON.stringify(result);
    `;

    try {
        const escapedScript = script.replace(/"/g, '\\"');
        const { stdout } = await execAsync(`osascript -l JavaScript -e "${escapedScript}"`);

        const data = JSON.parse(stdout.trim());
        if (data.state === 'stopped') return null;

        return {
            name: data.name,
            artist: data.artist,
            album: data.album,
            duration: data.duration,
            position: data.position,
            state: data.state
        };
    } catch (error) {
        return null;
    }
}
