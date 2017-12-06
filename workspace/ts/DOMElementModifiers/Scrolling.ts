module DOMElementModifiers {

    export class Scrolling {

        public static currentWindow: windowSides;
        public static onScroll: ((side: windowSides ) => void)[] = [];
        public static onScrollFinished: ((side: windowSides) => void)[] = [];

        private _centerWindow: HTMLDivElement
        private _leftWindow: HTMLDivElement;
        private _rightWindow: HTMLDivElement;
        private _bottomWindow: HTMLDivElement;

        // So it can overwite the events
        private _dominantElelment: HTMLElement;

        constructor() {

            this._centerWindow = <HTMLDivElement>document.getElementById('intro');
            this._leftWindow = <HTMLDivElement>document.getElementById('about');
            this._rightWindow = <HTMLDivElement>document.getElementById('contact');
            this._bottomWindow = <HTMLDivElement>document.getElementById('projects');

            /* tmp */
            this._centerWindow.style.backgroundColor = '#355193';
            this._leftWindow.style.backgroundColor = '#'+Math.random().toString(16).substr(-6);
            this._rightWindow.style.backgroundColor = '#'+Math.random().toString(16).substr(-6);
            this._bottomWindow.style.backgroundColor = '#'+Math.random().toString(16).substr(-6);

            window.addEventListener('resize', () => this.resizeCurrentWindows());            

            this.setWindowsToDefault();

            Scrolling.currentWindow = windowSides.center;

            // tmp for testing
            // setInterval( () => this.scrollToRight(), 100);

        }

        private setWindowsToDefault(): void {

            this._leftWindow.style.left = -window.innerWidth + 'px';
            this._rightWindow.style.left = window.innerWidth + 'px';
            this._bottomWindow.style.top = window.innerHeight + 'px';

        }

        private getOffplacedWindows(callback: (HTMLDivElement) => void, not: boolean = false): void {
            
            console.log(parseInt(this._leftWindow.style.left));
            console.log(parseInt(this._rightWindow.style.left));
            console.log(parseInt(this._bottomWindow.style.top));
            if ( parseInt(this._leftWindow.style.left) !== 0 === not) { 
                callback(this._leftWindow);
            }

            if ( parseInt(this._rightWindow.style.left) !== 0 === not) { 
                callback(this._rightWindow);
            }

            if ( parseInt(this._bottomWindow.style.top) !== 0 === not) { 
                callback(this._bottomWindow);
            }

        }

        private resizeCurrentWindows(): void {

            if ( parseInt(this._leftWindow.style.left) !== 0 ) { 
                this._leftWindow.style.left = -window.innerWidth + 'px';
            }

            if ( parseInt(this._rightWindow.style.left) !== 0 ) { 
                this._rightWindow.style.left = window.innerWidth + 'px';
            }

            if ( parseInt(this._bottomWindow.style.top) !== 0 ) { 
                this._bottomWindow.style.top = window.innerHeight + 'px';
            }

        }

        public scrollToTop(): void {

            this.setWindowsToDefault();
            this.executeOnScroll(windowSides.center);

            console.log(' SCROLL TO TOP' );
            this.getOffplacedWindows((window: HTMLDivElement) => {
                console.log(window, ' is offplaced');
                this.addEventListenerOnceDominant(window, 'transitionend', () => {
                    Scrolling.currentWindow = windowSides.center;
                    this.executeOnScrollFinished(windowSides.center);
                });
            });

        }

        public scrollToLeft(): void {

            this.setWindowsToDefault();       
            this._leftWindow.style.left = '0px';            
            this.executeOnScroll(windowSides.left);

            this.addEventListenerOnceDominant(this._leftWindow, 'transitionend', () => {
                Scrolling.currentWindow = windowSides.left;                
                this.executeOnScrollFinished(windowSides.left);
             });

        }

        public scrollToRight(): void {

            this.setWindowsToDefault();
            this._rightWindow.style.left = '0px';
            this.executeOnScroll(windowSides.right);

            this.addEventListenerOnceDominant(this._rightWindow, 'transitionend', () => {
                Scrolling.currentWindow = windowSides.right;                
                this.executeOnScrollFinished(windowSides.right);
             });
            
        }

        public scrollToBottom(): void {

            this.setWindowsToDefault();            
            this._bottomWindow.style.top = '0px';
            this.executeOnScroll(windowSides.bottom);

            this.addEventListenerOnceDominant(this._bottomWindow, 'transitionend', () => {
                Scrolling.currentWindow = windowSides.bottom;                
                this.executeOnScrollFinished(windowSides.bottom) 
            });

        }

        public scrollToSide(side: windowSides): void {
            switch(side) {
                case windowSides.bottom:
                    this.scrollToBottom();
                    break;
                case windowSides.left:
                    this.scrollToLeft();
                    break;
                case windowSides.center:
                    this.scrollToTop();
                    break;
                case windowSides.right:
                    this.scrollToRight();
            }
        }

        private navButtonPressed(element: HTMLDivElement, side: windowSides): void {

            addEventListenerOnce(element, 'transitioned', () => {
                this.scrollToSide(side);
            });

        }

        private addEventListenerOnceDominant(element: HTMLDivElement, event: string, fn: Function) {

            this._dominantElelment = element;

            let func = () => {
                element.removeEventListener(event, func);
                if (element !== this._dominantElelment) { return; }
                fn();
            };
            element.addEventListener(event, func);
        }

        private executeOnScroll(side: windowSides): void {
            for (let i: number = Scrolling.onScroll.length; i--; ) {

                if ( !Scrolling.onScroll[i] ) { return; }
                Scrolling.onScroll[i](side);

            }
        }

        private executeOnScrollFinished(side: windowSides): void {
            for (let i: number = Scrolling.onScrollFinished.length; i--; ) {

                if ( !Scrolling.onScrollFinished[i] ) { return; }
                Scrolling.onScrollFinished[i](side);

            }
        }

    }

}

function addEventListenerOnce(element: HTMLElement, event: string, fn: Function) {

    let editedFunc = () => {
        element.removeEventListener(event, editedFunc);
        fn();
    };
    element.addEventListener(event, editedFunc);
}

enum windowSides {
    center,
    left,
    right,
    bottom
}
