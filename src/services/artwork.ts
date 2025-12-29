import axios from 'axios';
import { generateDeveloperToken } from './auth';
import { TEAM_ID, KEY_ID, PRIVATE_KEY } from '../config/secrets';

const artworkCache = new Map<string, string | null>();

async function searchOfficialApi(artist: string, album: string, trackName?: string): Promise<string | null> {
    if (!TEAM_ID || !KEY_ID || !PRIVATE_KEY) {
        return null;
    }

    try {
        const token = generateDeveloperToken();
        const query = encodeURIComponent(`${artist} ${album} ${trackName || ''}`);
        const url = `https://api.music.apple.com/v1/catalog/fr/search?term=${query}&types=songs&limit=1`;

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.data.results.songs && response.data.results.songs.data.length > 0) {
            const songData = response.data.results.songs.data[0];
            const rawUrl = songData.attributes.artwork.url;
            return rawUrl.replace('{w}', '512').replace('{h}', '512');
        }
    } catch (e) {
        console.error('Official API Error:', e);
    }
    return null;
}

export async function getAlbumArtwork(artist: string, album: string, trackName?: string): Promise<string | null> {
    const key = `${artist}-${album}-${trackName || ''}`;
    if (artworkCache.has(key)) return artworkCache.get(key) || null;

    const officialArtwork = await searchOfficialApi(artist, album, trackName);
    if (officialArtwork) {
        console.log(`[Apple Music] Found artwork for ${artist} - ${album}`);
        artworkCache.set(key, officialArtwork);
        return officialArtwork;
    }

    console.log(`[Apple Music] No artwork found for ${artist} - ${album}`);

    artworkCache.set(key, null);
    return null;
}
