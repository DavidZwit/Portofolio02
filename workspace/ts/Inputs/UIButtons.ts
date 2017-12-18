/// <reference path="../DOMElementModifiers/Scrolling.ts" />
/// <reference path="../UI/UIButtons.ts" />

module Navigation {


    export class UIButtons {

        private buttons: {[index:number]: UI.Button};
        private clickedButton: sides;

        private scroller: DOMElementModifiers.Scrolling;

        constructor(scroller: DOMElementModifiers.Scrolling) {

            this.scroller = scroller;

            this.buttons = {
                [sides.left]: new UI.LeftButton('navLeft')
            }

            this.buttons[sides.left].element.addEventListener('click', () => {
                this.clickedButton = sides.left;
                switch (DOMElementModifiers.Scrolling.currentWindow) {
                    case sides.top:
                        scroller.scrollToLeft();
                        break;
                    case sides.right:
                        scroller.scrollToTop();
                        break;
                }
                this.buttons[sides.left].transition();
            });

            DOMElementModifiers.Scrolling.onScroll.push( (side: sides) => {

                this.foreachButton( (button: UI.Button, buttonSide: sides) => {
                    if (this.clickedButton !== buttonSide) {
                        button.hide();
                    }
                });

            });

            DOMElementModifiers.Scrolling.onScrollFinished.push( (windowSide: sides) => {
                
                this.hideAllButtons();

                this.foreachButton( (button: UI.Button, buttonSide: sides) => {

                    if (this.clickedButton === buttonSide) {
                        setTimeout(() => this.showButtonBasedOnWindow(windowSide, buttonSide), 100);                    
                    } else {
                        this.showButtonBasedOnWindow(windowSide, sides.left);                        
                    }

                });

                this.clickedButton = null;
                
            });

            this.hideAllButtons();
            this.buttons[sides.left].peek(scroller.windows[sides.left].element.style.backgroundColor);

        }

        private foreachButton(callback: (button: UI.Button, side?: sides) => void): void {
            
            Object.keys(this.buttons).forEach( (key: string) => {
                callback(this.buttons[key], +key);
            });

        }

        private showButtonBasedOnWindow(windowSide: sides, buttonSide: sides): void {

            let targetSide: sides = this.buttons[buttonSide].getTarget(windowSide);

            if (targetSide !== null) {
                this.buttons[buttonSide].peek(this.scroller.windows[targetSide].element.style.backgroundColor);
            } else {
                this.buttons[buttonSide].hideInstant();                
            }

        }
        
        private hideAllButtons(): void {

            this.foreachButton( (button: UI.Button) => {
                button.hideInstant();
            })

        }

    }
}