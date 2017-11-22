/// <reference path="./WindowsScrolling.ts" />

module DOMSettings {
    export class Contact {

        private iconContainer: HTMLDivElement;
        private icons: HTMLImageElement[] = [];

        constructor( ) {

            this.iconContainer = (<HTMLDivElement>document.getElementById('contactIconContainer'));
            
            for (let i: number = this.iconContainer.children.length; i--; ) {
                this.icons.push(<HTMLImageElement>this.iconContainer.children.item(i));
            }

            for (let i: number = this.icons.length; i--; ) {
                this.icons[i].classList.add('popout');
            }
            
            WindowScroller.onScrollFinished.push( (side: windowSides) => {

                if (side === windowSides.right) {
                    this.animateIn();
                } 

            });

            WindowScroller.onScroll.push( (side: windowSides ) => {

                if (side !== windowSides.right) {
                    this.animateOut();
                }

            });

            this.animateOut();

        }

        private animateIn(): void {

            for (let i: number = this.icons.length; i--; ) {
                let element: HTMLImageElement = this.icons[i];

                element.classList.remove('popout');
                element.classList.remove('popin');
                setTimeout( () => element.classList.add('popin'), Math.random() * 1000 );

            }

        }

        private animateOut(): void {

            for (let i: number = this.icons.length; i--; ) {
                let element: HTMLImageElement = this.icons[i];

                element.classList.remove('popin');
                element.classList.add('popout');
            }

        }

    }

    let contactEffects: Contact = new Contact();
}