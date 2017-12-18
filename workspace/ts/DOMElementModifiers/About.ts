/// <reference path="./Scrolling.ts" />

module DOMElementModifiers {
    export class About {

        private line1: HTMLDivElement;
        private line2: HTMLDivElement;
        private line3: HTMLDivElement;

        constructor( ) {

            this.line1 = <HTMLDivElement>document.getElementById('codeLine1')
            this.line2 = <HTMLDivElement>document.getElementById('codeLine2')
            this.line3 = <HTMLDivElement>document.getElementById('codeLine3')
            
            Scrolling.onScrollFinished.push( (side: sides) => {

                if (side === sides.left) {
                    this.setCodeLinesWidth();
                } 

            });

            Scrolling.onScroll.push( (side: sides ) => {

                if (side !== sides.left) {
                    this.setBarsTo0();
                }

            });

            this.setBarsTo0();

        }

        private setBarsTo0(): void {
            this.line1.style.width = '0%';
            this.line2.style.width = '0%';
            this.line3.style.width = '0%';
        }

        private setCodeLinesWidth(): void {
            this.line1.style.width = '20%';
            this.line2.style.width = '25%';
            this.line3.style.width = '30%';
        }

    }
}