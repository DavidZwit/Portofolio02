/// <reference path="./Scrolling.ts" />

module DOMElementModifiers {
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
            
            Scrolling.onScrollFinished.push( (side: sides) => {

                if (side === sides.right) {
                    this.animateIn();
                } 

                if (side !== sides.right) {
                    this.animateOut();
                }
            });
            this.animateOut();

        }

        private animateIn(): void {

            for (let i: number = this.icons.length; i--; ) {
                let element: HTMLImageElement = this.icons[i];

                if (element.classList.contains('contactActive') === true) { return; }

                if (element.classList.contains('popin') === false) {
                    setTimeout( () => {

                        element.classList.add('popin');
 
                        addEventListenerOnce(element, 'animationend', () => {
                            element.classList.remove('popin');
                            element.classList.add('contactActive');
                        });

                    }, Math.random() * 600 );
                }

            }

        }

        private animateOut(): void {

            for (let i: number = this.icons.length; i--; ) {
                let element: HTMLImageElement = this.icons[i];
                element.classList.remove('popin');
                element.classList.remove('contactActive');
            }

        }

    }
}