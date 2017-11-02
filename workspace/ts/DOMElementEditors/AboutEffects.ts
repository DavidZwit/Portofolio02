/// <reference path="./WindowsScrolling.ts" />

module DOMSettings {
    export class AboutEffects {

        private codeLines: HTMLDivElement[] = [];

        constructor( ) {

            this.codeLines.push( 
                <HTMLDivElement>document.getElementById('codeLine1')
            );

            this.codeLines.push( 
                <HTMLDivElement>document.getElementById('codeLine2')
            );

            this.codeLines.push( 
                <HTMLDivElement>document.getElementById('codeLine3')
            );
            
            WindowScroller.onScroll.push( (side: string) => {

                for(let i: number = this.codeLines.length; i--; ) {
                    let oldStyle: string = this.codeLines[i].style.width;
                    this.codeLines[i].style.width = '0px';

                    setTimeout( () => {
                        this.codeLines[i].style.width = oldStyle;                    
                    }, 300);
                }

            });

        }

    }

    let aboutEffect: AboutEffects = new AboutEffects();
}