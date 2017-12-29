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
                
                    this.scroller.scrollToSide(sides.top);
                    break;

                case 37:
                    
                    this.scroller.scrollToSide(sides.left);
                    break;

                case 39:

                    this.scroller.scrollToSide(sides.right);
                    break;

                case 40:

                    this.scroller.scrollToSide(sides.bottom);
                    break;

                default: 

                    break;
    
            }
        }
    }
}