module pra {

    export class PIXISetup extends PIXI.Application {

        private preloader: Preloader;

        constructor(width: number, height: number, containerID: string) {

            super(width, height, {
                backgroundColor: 0x355193
            });

            window.addEventListener('resize', (e: Event) => {
                this.renderer.resize(window.innerWidth, window.innerHeight);
            });

            document.getElementById(containerID).appendChild(this.renderer.view);

            this.preloader = new Preloader( 'assets/' );

        }

    }

}