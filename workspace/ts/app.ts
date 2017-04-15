module PRA {

    export class PIXISetup extends PIXI.Application {

        //public mainLoop: PIXI.ticker.TickerListener;

        constructor(width: number, height: number, containerID: string) {

            super(width, height, {
                backgroundColor: 0x1099bb
            });

            document.getElementById(containerID).appendChild(this.renderer.view);



        }

    }

}