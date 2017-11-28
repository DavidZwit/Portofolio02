module pra {
    export class FloatingString extends PIXI.Text {

        public destroyed: Function;
        private initalPosition: PIXI.Point;
        private fadeGraphic: PIXI.Graphics;
        private stage: PIXI.Container;

        constructor (stage: PIXI.Container, text: string, position: PIXI.Point) {
            
            super(text, {   
                
            });

            this.stage = stage;

            this.initalPosition = new PIXI.Point();
            this.initalPosition.set(position.x, position.y);
            this.position = position;

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
            this.fadeGraphic.alpha += .01;
            if (this.fadeGraphic.alpha >= 1) {
                this.destroy();
                this.destroyed();
            }
        }

        public offset(offset: PIXI.Point): void {
            this.position.set(
                this.initalPosition.x + offset.x,
                this.initalPosition.y + offset.y
            );
        }

        public destroy(): void {
            this.fadeGraphic.destroy();
            super.destroy();
        }
    }
}