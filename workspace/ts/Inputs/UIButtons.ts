/// <reference path="../DOMElementModifiers/Scrolling.ts" />

module Navigation {
    export class UIButtons {

        private btnLeft: HTMLDivElement;
        private btnDown: HTMLDivElement;
        private btnRight: HTMLDivElement;
        private btnUp: HTMLDivElement;

        constructor(scroller: DOMElementModifiers.Scrolling) {

            this.btnLeft = <HTMLDivElement>document.getElementById('navLeft');
            this.btnDown = <HTMLDivElement>document.getElementById('navDown');
            this.btnRight = <HTMLDivElement>document.getElementById('navRight');
            this.btnUp = <HTMLDivElement>document.getElementById('navUp');

            this.btnLeft.addEventListener('keydown', () => {
                scroller.scrollToLeft();
            });

        }

        private btnLeftClick(): void {

        }

        private btnDownClick(): void {

        }

        private btnRightClick(): void {

        }

        private btnUpClick(): void {
            
        }
    }
}