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
                [sides.left]: new UI.LeftButton('navLeft'),
                [sides.right]: new UI.RightButton('navRight'),
                [sides.top]: new UI.TopButton('navTop'),
                [sides.bottom]: new UI.BottomButton('navBottom')
            }

            this.foreachButton( (button: UI.Button, side: sides) => {

                this.buttons[side].element.addEventListener('click', () => {
                    this.clickedButton = side;
                    
                    let targetSide: sides = this.scroller.windows[DOMElementModifiers.Scrolling.currentWindow].getWindowOnSide(side);
    
                    if (targetSide !== null) { this.scroller.scrollToSide(targetSide)}
                    
                    this.buttons[side].transition();
                });

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
                        this.showButtonBasedOnWindow(windowSide, buttonSide);                        
                    }

                });

                this.clickedButton = null;
                
            });

            this.hideAllButtons();
            this.foreachButton( (button: UI.Button, side: sides) => {
                this.showButtonBasedOnWindow(DOMElementModifiers.Scrolling.currentWindow, side);
            });

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