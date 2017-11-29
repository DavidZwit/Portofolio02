module pra {
    export class FloatingString extends PIXI.Text {

        public destroyed: Function;
        public depth: number;
        private offsetTarget: PIXI.Point;
        private initalPosition: PIXI.Point;
        private fadeGraphic: PIXI.Graphics;
        private stage: PIXI.Container;

        constructor (stage: PIXI.Container, text: string, position: PIXI.Point, depth: number, offset: PIXI.Point) {
            
            super(text, {   
                fontFamily: 'Quicksand',
                fontSize: depth * Math.min(window.innerWidth, window.innerHeight) / 500
            });

            this.stage = stage;
            this.depth = depth;

            this.initalPosition = new PIXI.Point();
            this.initalPosition.set(position.x + offset.x, position.y + offset.y);
            this.position = this.initalPosition.clone();

            this.offsetTarget = new PIXI.Point();
            this.offset(offset);

            this.fadeGraphic = new PIXI.Graphics();
            this.addChild(this.fadeGraphic);
            
            window.requestAnimationFrame( () => {
                this.fadeGraphic.beginFill(0x586d8b);
                this.fadeGraphic.drawRect(0, 0, this.width, this.height);
                this.fadeGraphic.endFill();
            });
            this.fadeGraphic.alpha = 0;

        }

        public update(): void {
            this.fadeGraphic.alpha += .0005 * this.depth;

            this.position.set(
                this.position.x + (this.offsetTarget.x - this.position.x) / (this.depth),
                this.position.y + (this.offsetTarget.y - this.position.y) / (this.depth)
            );

            if (this.fadeGraphic.alpha >= 1) {
                this.destroy();
                this.destroyed();
            }
        }

        public offset(offset: PIXI.Point): void {
            this.offsetTarget.set(
                this.initalPosition.x + offset.x * (this.depth / 30),
                this.initalPosition.y + offset.y * (this.depth / 30)   
            );
        }

        public destroy(): void {
            this.fadeGraphic.destroy();
            super.destroy();
        }
    }
}