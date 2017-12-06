/// <reference path="../DOMElementModifiers/Scrolling.ts" />
/// <reference path="../UI/UIButtons.ts" />

module Navigation {

    export enum buttonStates {
        show = 0,
        shown,
        hide,
        hidden,
        move
    }
    export class UIButtons {

        private btnLeft: UI.LeftUIButton;
        private btnDown: HTMLDivElement;
        private btnRight: HTMLDivElement;
        private btnUp: HTMLDivElement;

        constructor(scroller: DOMElementModifiers.Scrolling) {

            this.btnLeft = new UI.LeftUIButton('navLeft');
            this.btnDown = <HTMLDivElement>document.getElementById('navDown');
            this.btnRight = <HTMLDivElement>document.getElementById('navRight');
            this.btnUp = <HTMLDivElement>document.getElementById('navUp');

            this.btnLeft.element.addEventListener('click', () => {
                switch (DOMElementModifiers.Scrolling.currentWindow) {
                    case windowSides.center:
                        scroller.scrollToLeft();
                        break;
                    case windowSides.right:
                        scroller.scrollToTop();
                        break;
                }
                this.btnLeft.transition();
            });

            DOMElementModifiers.Scrolling.onScroll.push( (side: windowSides) => {

                // if (side !== windowSides.center) { this.updateBtnLeft(buttonStates.hide); }

            });

            DOMElementModifiers.Scrolling.onScrollFinished.push( (side: windowSides) => {
                
                this.hideAllButtons();

                console.log(side);

                if (side === windowSides.center) {
                    this.btnLeft.peek();
                } else if (side === windowSides.right) {
                    this.btnLeft.peek();
                } else {
                    this.btnLeft.hide();
                }

            });

            this.hideAllButtons();
            this.btnLeft.peek();

        }

        private showButtonsBasedOnWindow(window: windowSides): void {

        }
        
        private hideAllButtons(): void {

            this.btnLeft.hide();

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