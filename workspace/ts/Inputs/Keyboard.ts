/// <reference path="../DOMElementModifiers/Scrolling.ts" />

module Navigation {
    export class Keyboard {

        private scroller: DOMElementModifiers.Scrolling;

        constructor(scroller: DOMElementModifiers.Scrolling) {

            this.scroller = scroller;
            window.addEventListener('keydown', (e) => this.scrollWithKeys(e));

        }

        private scrollWithKeys(e: KeyboardEvent): void {
            
            // this.setWindowsToDefault();

            switch( e.keyCode ) {
                
                case 38:
                
                    this.scroller.scrollToTop();
                    break;

                case 37:
                    
                    this.scroller.scrollToLeft();
                    break;

                case 39:

                    this.scroller.scrollToRight();
                    break;

                case 40:

                    this.scroller.scrollToBottom();
                    break;

                default: 

                    break;
    
            }
        }
    }
}