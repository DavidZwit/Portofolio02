module PRA {
    export class FloatingString extends PIXI.Text {

        public destroyed: PIXI.MiniSignal;
        constructor (text: string, position: PIXI.Point) {
            
            super(text, {   
                
            });
            this.position = position;

        }

        public spawn(): void {
            
        }

        public destroy(): void {

            super.destroy();
        }
    }
}