module DOMSettings {

    export class WindowScroller {

        public static onScroll: ((side: string) => void)[] = [];

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

            window.addEventListener('keydown', (e) => this.changeWindow(e));
            window.addEventListener('resize', () => this.resizeCurrentWindows());

            this.setWindowsToDefault();

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

        private changeWindow(e: KeyboardEvent): void {

            this.setWindowsToDefault();

            switch( e.keyCode ) {
                
                case 38:

                    this.executeOnScroll('top');
                    break;

                case 37:
                
                    this.executeOnScroll('left');
                    this._leftWindow.style.left = '0px';
                    break;

                case 39:

                    this.executeOnScroll('right');
                    this._rightWindow.style.left = '0px';
                    break;

                case 40:

                    this.executeOnScroll('bottom');
                    this._bottomWindow.style.top = '0px';
                    break;

                default: 

                    break;
    
            }
        }

        private executeOnScroll(side: string): void {
            for (let i: number = WindowScroller.onScroll.length; i--; ) {

                WindowScroller.onScroll[i](side);

            }
        }

    }

    let scroller: WindowScroller = new WindowScroller();

}