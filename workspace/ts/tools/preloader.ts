
module PRA {
    export class Preloader {


        public path: string;

        constructor (path: string) {
            this.path = path;
        }

        public preloadImages(doneCallback: () => {}) {
            for (let i = Images.preloadList.length; i--; ) {
                var loader: PIXI.loaders.Loader = PIXI.loader.add(Images.preloadList[i], this.path + Images.preloadList[i] + '.jpg');
                
                if (i <= 0) {
                    loader.load( () => doneCallback() );
                }
                
            }
        }

    }
}