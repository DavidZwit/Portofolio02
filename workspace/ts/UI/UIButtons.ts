module UI {
    export abstract class UIButton {

        public element: HTMLDivElement;

        constructor(id: string) {
            this.element = <HTMLDivElement>document.getElementById(id);
        }
        abstract hide(): void;
        abstract show(): void;
        abstract peek(): void;
        abstract transition(): void;

    }

    export class LeftUIButton extends UIButton {

        constructor(id: string) {
            super(id);
        }

        public show(transition: boolean = true): void {
            this.element.classList.remove('navButtonHide');            
            this.element.classList.remove('navButtonPeek');          
            this.element.classList.remove('navButtonTransition');       
            this.element.classList.add('navButtonShow');
        }

        public hide(transition: boolean = true): void {
            this.element.classList.remove('navButtonShow');            
            this.element.classList.remove('navButtonPeek');         
            this.element.classList.remove('navButtonTransition');        
            this.element.classList.add('navButtonHide');
        }

        public peek(transition: boolean = true): void {
            this.element.classList.remove('navButtonHide');            
            this.element.classList.remove('navButtonShow');     
            this.element.classList.remove('navButtonTransition');
            this.element.classList.add('navButtonPeek');
        }

        public transition(transition: boolean = true): void {
            this.element.classList.remove('navButtonHide');            
            this.element.classList.remove('navButtonPeek');            
            this.element.classList.remove('navButtonShow');
            this.element.classList.add('navButtonTransition');
        }

    } 
}