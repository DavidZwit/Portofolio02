module DOMSettings {

    export class WindowScroller {

        public static onScroll: ((side: windowSides ) => void)[] = [];
        public static onScrollFinished: ((side: windowSides) => void)[] = [];

        private _centerWindow: HTMLDivElement
        private _leftWindow: HTMLDivElement;
        private _rightWindow: HTMLDivElement;
        private _bottomWindow: HTMLDivElement;

        constructor() {

            this._centerWindow = <HTMLDivElement>document.getElementById('intro');
            this._leftWindow = <HTMLDivElement>document.getElementById('about');
            this._rightWindow = <HTMLDivElement>document.getElementById('contact');
            this._bottomWindow = <HTMLDivElement>document.getElementById('projects');

            /* tmp */
            this._centerWindow.style.backgroundColor = '#'+Math.random().toString(16).substr(-6);;
            this._leftWindow.style.backgroundColor = '#'+Math.random().toString(16).substr(-6);;
            this._rightWindow.style.backgroundColor = '#'+Math.random().toString(16).substr(-6);;
            this._bottomWindow.style.backgroundColor = '#'+Math.random().toString(16).substr(-6);;

            window.addEventListener('keydown', (e) => this.scrollWithKeys(e));
            window.addEventListener('resize', () => this.resizeCurrentWindows());

            this.setWindowsToDefault();

            // tmp for testing
            setInterval( () => this.scrollToRight(), 100);

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

            // this..addEventListener('transitionend', () => {
            //     this.executeOnScrollFinished(windowSides.bottom);
            // });

        }

        public scrollToLeft(): void {

            this.setWindowsToDefault();       
            this._leftWindow.style.left = '0px';            
            this.executeOnScroll(windowSides.left);

            this.addEventListenerOnce(this._leftWindow, 'transitionend', () => this.executeOnScrollFinished(windowSides.left) );

        }

        public scrollToRight(): void {

            this.setWindowsToDefault();
            this._rightWindow.style.left = '0px';
            this.executeOnScroll(windowSides.right);

            this.addEventListenerOnce(this._rightWindow, 'transitionend', () => this.executeOnScrollFinished(windowSides.right) );
            
        }

        public scrollToBottom(): void {

            this.setWindowsToDefault();            
            this._bottomWindow.style.top = '0px';
            this.executeOnScroll(windowSides.bottom);

            this.addEventListenerOnce(this._bottomWindow, 'transitionend', () => this.executeOnScrollFinished(windowSides.bottom) );

        }

        private scrollWithKeys(e: KeyboardEvent): void {

            this.setWindowsToDefault();

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

        private addEventListenerOnce(element: HTMLDivElement, event: string, fn: Function) {
            let func = () => {
                element.removeEventListener(event, func);
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

enum windowSides {
    center,
    left,
    right,
    bottom
}
