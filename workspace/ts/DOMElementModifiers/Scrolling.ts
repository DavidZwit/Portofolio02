/// <reference path="../Objects/Window.ts" />
module DOMElementModifiers {

    export class Scrolling {

        public static currentWindow: sides;
        public static onScroll: ((side: sides ) => void)[] = [];
        public static onScrollFinished: ((side: sides) => void)[] = [];

        public windows: {[index:number]: Objects.Window};

        // So it can overwite the events
        private _dominantElelment: HTMLElement;

        constructor() {

            this.windows = {
                [sides.top]: new Objects.TopWindow('intro', '#355193'),
                [sides.right]: new Objects.RightWindow('contact', '#'+Math.random().toString(16).substr(-6)),
                [sides.bottom]: new Objects.BottomWindow('projects', '#'+Math.random().toString(16).substr(-6)),
                [sides.left]: new Objects.LeftWindow('about', '#'+Math.random().toString(16).substr(-6))
            }

            window.addEventListener('resize', () => this.resizeCurrentWindows());            

            this.setWindowsToDefault();

            Scrolling.currentWindow = sides.top;

        }

        private foreachWindow(callback: (window: Objects.Window) => void): void {

            Object.keys(this.windows).forEach((key: string) => {
                callback(this.windows[key]);
            });

        }

        private foreachPossibleWindowSide(window: sides, callback: (side: sides) => void): void {
            
            Object.keys(this.windows[window].possibleSides).forEach((key: string) => {
                callback(this.windows[window].possibleSides[key]);
            });

        }

        private setWindowsToDefault(): void {
            this.foreachWindow( (window: Objects.Window) => {
                window.scrollToDefault();
            });
        }

        private getOffplacedWindows(callback: (HTMLDivElement) => void, not: boolean = false): void {

            this.foreachWindow( (window: Objects.Window) => {
                if (window.isOffsetted()) {
                    callback(window.element);
                }
            });

        }

        private resizeCurrentWindows(): void {

            this.foreachWindow( (window: Objects.Window) => {
                if (window.isOffsetted() === false) {
                    window.scrollToDefault();
                }
            });

        }

        public scrollToTop(): void {

            if (Scrolling.currentWindow === sides.top) { return; }

            this.windows[sides.top].scrollTo();
            this.executeOnScroll(sides.top);

            this.getOffplacedWindows((window: HTMLDivElement) => {
                this.addEventListenerOnceDominant(window, 'transitionend', () => {
                    Scrolling.currentWindow = sides.top;
                    this.executeOnScrollFinished(sides.top);
                });
            });

            this.setWindowsToDefault();            

        }

        public scrollToLeft(): void {

            this.scrollToSide(sides.left);

        }

        public scrollToRight(): void {
            
            this.scrollToSide(sides.right);
            
        }

        public scrollToBottom(): void {

            this.scrollToSide(sides.bottom);

        }

        private scrollToSide(side: sides): void {

            if (Scrolling.currentWindow === side) { return; }            
            
            this.setWindowsToDefault();            
            this.windows[side].scrollTo();
            this.executeOnScroll(sides.bottom);

            this.addEventListenerOnceDominant(this.windows[side].element, 'transitionend', () => {
                Scrolling.currentWindow = side;                
                this.executeOnScrollFinished(side) 
            });
        }

        private navButtonPressed(element: HTMLDivElement, side: sides): void {

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

        private executeOnScroll(side: sides): void {
            for (let i: number = Scrolling.onScroll.length; i--; ) {

                if ( !Scrolling.onScroll[i] ) { return; }
                Scrolling.onScroll[i](side);

            }
        }

        private executeOnScrollFinished(side: sides): void {
            for (let i: number = Scrolling.onScrollFinished.length; i--; ) {

                if ( !Scrolling.onScrollFinished[i] ) { return; }
                Scrolling.onScrollFinished[i](side);

            }
        }

    }

}
