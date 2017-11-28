module pra {

    export class PIXISetup extends PIXI.Application {

        private preloader: Preloader;

        constructor(width: number, height: number, containerID: string) {

            super(width, height, {
                backgroundColor: 0x586d8b
            });

            document.getElementById(containerID).appendChild(this.renderer.view);

            this.preloader = new Preloader( 'assets/' );

        }

    }

}