/* global HTMLImageElement */

export class MarkdownItemCounter {
    private static ImageToLoadCount = 2;

    private audio: number;
    private image: number;
    private video: number;

    constructor() {
        this.audio = 0;
        this.image = 0;
        this.video = 0;
    }

    increaseAudio() {
        this.audio += 1;
    }

    increaseImage() {
        this.image += 1;
    }

    increaseVideo() {
        this.video += 1;
    }

    getIsLazyImage(): boolean {
        return this.image > MarkdownItemCounter.ImageToLoadCount;
    }

    getLoadingImageType(): HTMLImageElement['loading'] {
        return this.getIsLazyImage() ? 'lazy' : 'eager';
    }
}
