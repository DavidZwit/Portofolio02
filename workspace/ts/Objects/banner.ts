module PRA {
    export class Banner extends PIXISetup {

        public application: PIXI.Application;

        private bg: PIXI.Sprite;

        private ellements: PIXI.DisplayObject[] = [];
        
        private _offset: PIXI.Point;

        
        constructor (width: number, height: number, containerID: string) {

            super(width, height, containerID);

            this.SpawnRandom();
        }


        
        set offset (to: PIXI.Point) {
            this._offset = to;
            this.updateElements();
        }

        get offset (): PIXI.Point {
            return this._offset;
        }

        public SpawnRandom(): void {

            let floatingString = new FloatingString('test123', new PIXI.Point(59, 50))
            this.ellements.push( floatingString );

            this.stage.addChild(floatingString);
            console.log(floatingString);
            console.log(this.stage.children);
        }

        public updateElements (): void {

            for (let i: number = this.ellements.length; i--; ) {
                let currElement: PIXI.DisplayObject = this.ellements[i];

                currElement.pivot.set(this.offset.x, this.offset.y);
            }

        }

    }
}