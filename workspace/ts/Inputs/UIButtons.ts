/// <reference path="../DOMElementModifiers/Scrolling.ts" />

module Navigation {

    export enum buttonStates {
        show = 0,
        shown,
        hide,
        hidden,
        move
    }
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

            this.btnLeft.addEventListener('click', () => {
                scroller.scrollToLeft();
                this.updateBtnLeft(buttonStates.move);
            });

            DOMElementModifiers.Scrolling.onScroll.push( (side: windowSides) => {

                // if (side !== windowSides.center) { this.updateBtnLeft(buttonStates.hide); }

            });

            DOMElementModifiers.Scrolling.onScrollFinished.push( (side: windowSides) => {
                
                this.hideAllButtons();

                if (side === windowSides.center) {
                    this.updateBtnLeft(buttonStates.show);
                }

            });

            this.hideAllButtons();
            this.updateBtnLeft(buttonStates.show);

        }

        private showButtonsBasedOnWindow(window: windowSides): void {

        }
        
        private hideAllButtons(): void {
                      
            this.updateBtnLeft(buttonStates.hide);

        }

        private updateBtnLeft(state: buttonStates): void {


        }

        private btnDownClick(): void {

        }

        private btnRightClick(): void {

        }

        private btnUpClick(): void {
            
        }
    }
}