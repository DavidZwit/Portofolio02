module DOMSettings {

    export class WindowScroller {

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
            this._leftWindow.style.backgroundColor = '#'+Math.random().toString(16).substr(-6);;
            this._rightWindow.style.backgroundColor = '#'+Math.random().toString(16).substr(-6);;
            this._bottomWindow.style.backgroundColor = '#'+Math.random().toString(16).substr(-6);;

            window.addEventListener('keydown', (e) => this.scrollWithKeys(e));
            window.addEventListener('resize', () => this.resizeCurrentWindows());

            this.setWindowsToDefault();

            // tmp for testing
            // setInterval( () => this.scrollToRight(), 100);

        }

        private setWindowsToDefault(): void {

            this._leftWindow.style.left = -window.innerWidth + 'px';
            this._rightWindow.style.left = window.innerWidth + 'px';
            this._bottomWindow.style.top = window.innerHeight + 'px';

        }

        private resizeCurrentWindows(): void {

            if ( Number(this._leftWindow.style.left) !== 0 ) { 
                this._leftWindow.style.left = -window.innerWidth + 'px';
            }

            if ( Number(this._rightWindow.style.left) !== 0 ) { 
                this._rightWindow.style.left = window.innerWidth + 'px';
            }

            if ( Number(this._bottomWindow.style.top) !== 0 ) { 
                this._bottomWindow.style.top = window.innerHeight + 'px';
            }

        }

        public scrollToTop(): void {

            this.setWindowsToDefault();
            this.executeOnScroll(windowSides.center);

            this.addEventListenerOnceDominant(this._centerWindow, 'transitionend', () => {
                this.executeOnScrollFinished(windowSides.bottom);
            });

        }

        public scrollToLeft(): void {

            this.setWindowsToDefault();       
            this._leftWindow.style.left = '0px';            
            this.executeOnScroll(windowSides.left);

            this.addEventListenerOnceDominant(this._leftWindow, 'transitionend', () => this.executeOnScrollFinished(windowSides.left) );

        }

        public scrollToRight(): void {

            this.setWindowsToDefault();
            this._rightWindow.style.left = '0px';
            this.executeOnScroll(windowSides.right);

            this.addEventListenerOnceDominant(this._rightWindow, 'transitionend', () => this.executeOnScrollFinished(windowSides.right) );
            
        }

        public scrollToBottom(): void {

            this.setWindowsToDefault();            
            this._bottomWindow.style.top = '0px';
            this.executeOnScroll(windowSides.bottom);

            this.addEventListenerOnceDominant(this._bottomWindow, 'transitionend', () => this.executeOnScrollFinished(windowSides.bottom) );

        }

        private scrollWithKeys(e: KeyboardEvent): void {

            // this.setWindowsToDefault();

            switch( e.keyCode ) {
                
                case 38:
                
                    this.scrollToTop();
                    break;

                case 37:
                    
                    this.scrollToLeft();
                    break;

                case 39:

                    this.scrollToRight();
                    break;

                case 40:

                    this.scrollToBottom();
                    break;

                default: 

                    break;
    
            }
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
            for (let i: number = WindowScroller.onScroll.length; i--; ) {

                if ( !WindowScroller.onScroll[i] ) { return; }
                WindowScroller.onScroll[i](side);

            }
        }

        private executeOnScrollFinished(side: windowSides): void {
            for (let i: number = WindowScroller.onScrollFinished.length; i--; ) {

                if ( !WindowScroller.onScrollFinished[i] ) { return; }
                WindowScroller.onScrollFinished[i](side);

            }
        }

    }

    let scroller: WindowScroller = new WindowScroller();

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
