/// <reference path="../app.ts" />
module pra {
    export class Banner extends PIXISetup {

        public application: PIXI.Application;

        private strings: FloatingString[] = [];
        
        private _offset: PIXI.Point;
        
        constructor (width: number, height: number, containerID: string) {

            super(width, height, containerID);

            this._offset = new PIXI.Point();

            setInterval( () => {
                this.spawnRandom();
            }, 500);

            this.update();            
        }

        set offset( newPos: PIXI.Point) {
            this._offset.copy(newPos);
            this.updateElements();
        }

        get offset(): PIXI.Point {
            return this._offset;
        }

        public update(): void {
            window.requestAnimationFrame(() => this.update());   

            for (let i: number = this.strings.length; i--; ) {
                this.strings[i].update();
            }
        }

        private spliceStringFromArray(string: FloatingString): void {
            for (let i: number = this.strings.length; i--; ) {
                if (this.strings[i] === string) {
                    this.strings.splice(i, 1);
                }
            }
        }

        public spawnRandom(): void {

            let floatingString = new FloatingString(
                this.stage, 
                RandomStrings.getRandomString(), 
                new PIXI.Point(Math.random() * window.innerWidth, Math.random() * window.innerHeight))
            this.strings.push( floatingString );

            floatingString.destroyed = () => {
                this.spliceStringFromArray(floatingString);
            };

            this.stage.addChild(floatingString);

        }

        public updateElements (): void {
 
            for (let i: number = this.strings.length; i--; ) {
                let ellement: FloatingString = this.strings[i];
                ellement.offset(this._offset);
            }

        }

    }

    class RandomStrings {

        private static strings: string[] = [
            'nachten lang',
            'onopmerkelijk',
            'overgevoedde',
            'schijnbaar',
            'évangelie'
        ];

        public static getRandomString(): string {
            return this.strings[Math.floor(Math.random() * this.strings.length)];
        }
    }
}