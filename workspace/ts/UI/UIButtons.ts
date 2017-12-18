module UI {
    export abstract class Button {

        public element: HTMLDivElement;

        constructor(id: string) {
            this.element = <HTMLDivElement>document.getElementById(id);
        }
        protected removeAllClasses(): void {
            for (let i: number = this.element.classList.length; i--;) {
                if (this.element.classList.item(i) === 'navButtons') { return; }
                this.element.classList.remove(this.element.classList.item(i));
            }
        }
        abstract hide(): void;
        abstract hideInstant(): void;
        abstract transition(): void;
        public peek(color: string): void {
            this.element.style.backgroundColor = color;
        }
        abstract getTarget(window: sides): sides;
    }

    export class LeftButton extends Button {

        constructor(id: string) {
            super(id);
        }

        public hide(): void {
            this.removeAllClasses();
            this.element.classList.add('navButtonHide');
        }

        public hideInstant(): void {
            this.removeAllClasses();
            this.element.classList.add('navButtonHideInstant');
        }

        public transition(): void {
            this.removeAllClasses();
            this.element.classList.add('navButtonTransition');
        }
        
        public peek(color: string): void {
            super.peek(color);
            this.removeAllClasses();
            this.element.classList.add('navButtonPeek');
        }

        public getTarget(window: sides): sides {
            return window === sides.right ? 
                    sides.top :
                window === sides.top ?
                    sides.left :
                null;
        }
    } 
}