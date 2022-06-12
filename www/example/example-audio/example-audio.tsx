import {AudioPlayerControlSpriteAsync, AudioAsync} from '../audio-player';

import {demoUrl} from '../../const';
import {Markdown} from '../../layout/markdown/markdown';

import exampleAudio from './example-audio.md';
const meydnPureWater = demoUrl + '/audio-file/meydn-pure-water.mp3';

const icon64 = demoUrl + '/image-file/react-icon-64.png';
const icon128 = demoUrl + '/image-file/react-icon-128.png';
const icon256 = demoUrl + '/image-file/react-icon-256.png';
const icon512 = demoUrl + '/image-file/react-icon-512.png';

export function ExampleAudio(): JSX.Element {
    const singleAudioData = {
        mediaMetadata: {
            album: 'Interplanetary Forest',
            artist: 'Meydän',
            artwork: [
                {sizes: '64x64', src: icon64, type: 'image/png'},
                {sizes: '128x128', src: icon128, type: 'image/png'},
                {sizes: '256x256', src: icon256, type: 'image/png'},
                {sizes: '512x512', src: icon512, type: 'image/png'},
            ],
            title: 'Pure Water',
        },
        src: meydnPureWater,
    };

    return (
        <div className="example-wrapper">
            <Markdown mdInput={exampleAudio} />

            <AudioAsync mediaMetadata={singleAudioData.mediaMetadata} src={singleAudioData.src} useRepeatButton />

            <AudioPlayerControlSpriteAsync />
        </div>
    );
}
