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
                
                let targetSide: sides = this.scroller.windows[DOMElementModifiers.Scrolling.currentWindow].getWindowOnSide(sides.left);

                if (targetSide !== null) { this.scroller.scrollToSide(targetSide)}
                
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

            let targetWindowSide: sides = this.scroller.windows[windowSide].getWindowOnSide(buttonSide);

            if (targetWindowSide === null) {
                this.buttons[buttonSide].hideInstant();                
            } else {
                this.buttons[buttonSide].peek(this.scroller.windows[targetWindowSide].element.style.backgroundColor);
            }

        }
        
        private hideAllButtons(): void {

            this.foreachButton( (button: UI.Button) => {
                button.hideInstant();
            })

        }

    }
}