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
    }

    export class LeftButton extends Button {

        constructor(id: string) {
            super(id);
        }

        public hide(): void {
            this.removeAllClasses();
            this.element.classList.add('leftNavButtonHide');
        }

        public hideInstant(): void {
            this.removeAllClasses();
            this.element.classList.add('leftNavButtonHideInstant');
        }

        public transition(): void {
            this.removeAllClasses();
            this.element.classList.add('leftNavButotnTransition');
        }
        
        public peek(color: string): void {
            super.peek(color);
            this.removeAllClasses();
            this.element.classList.add('leftNavButtonPeek');
        }

    }

    export class RightButton extends Button {

        constructor(id: string) {
            super(id);
        }

        public hide(): void {
            this.removeAllClasses();
            this.element.classList.add('rightNavButtonHide');
        }

        public hideInstant(): void {
            this.removeAllClasses();
            this.element.classList.add('rightNavButtonHideInstant');
            
        }

        public transition(): void {
            this.removeAllClasses();
            this.element.classList.add('rightNavButtonTransition');
        }
        
        public peek(color: string): void {
            super.peek(color);
            this.removeAllClasses();
            this.element.classList.add('rightNavButtonPeek');
        }

    }

    export class TopButton extends Button {

        constructor(id: string) {
            super(id);
        }

        public hide(): void {
            this.removeAllClasses();
            this.element.classList.add('topNavButtonHide');
        }

        public hideInstant(): void {
            this.removeAllClasses();
            this.element.classList.add('topNavButtonHideInstant');
            
        }

        public transition(): void {
            this.removeAllClasses();
            this.element.classList.add('topNavButtonTransition');
        }
        
        public peek(color: string): void {
            super.peek(color);
            this.removeAllClasses();
            this.element.classList.add('topNavButtonPeek');
        }

    }

    export class BottomButton extends Button {

        constructor(id: string) {
            super(id);
        }

        public hide(): void {
            this.removeAllClasses();
            this.element.classList.add('bottomNavButtonHide');
        }

        public hideInstant(): void {
            this.removeAllClasses();
            this.element.classList.add('bottomNavButtonHideInstant');
            
        }

        public transition(): void {
            this.removeAllClasses();
            this.element.classList.add('bottomNavButtonTransition');
        }
        
        public peek(color: string): void {
            super.peek(color);
            this.removeAllClasses();
            this.element.classList.add('bottomNavButtonPeek');
        }

    }
}