module Objects {
    export abstract class Window {
        public element: HTMLDivElement;
        public side: sides;
        public possibleSides: {[index:number]: boolean}

        constructor(side: sides, possibleSides: {[index: number]: boolean}, id: string, color: string) {
            this.side = side;
            this.possibleSides = possibleSides;
            this.element = <HTMLDivElement>document.getElementById(id);
            this.element.style.backgroundColor = color;
        }

        abstract isOffsetted(): boolean;
        abstract scrollTo(): void;
        abstract scrollToDefault(): void;
    }

    export class TopWindow extends Window {

        constructor(id: string, color: string) {
            super(
                sides.top, 
                {
                    [sides.right]: true,
                    [sides.bottom]: true,
                    [sides.left]: true
                },
                id, color
            );
        }

        public isOffsetted(): boolean {
            return null;
        }

        public scrollToDefault(): void {
            //
        }

        public scrollTo(): void {
            //
        }
        
    }

    export class RightWindow extends Window {
        
        constructor(id: string, color: string) {
            super(
                sides.right,
                { [sides.left]: true },
                id, color
            );
        }

        public isOffsetted(): boolean {
            return parseInt(this.element.style.left) !== window.innerWidth;
        }

        public scrollToDefault(): void {
            this.element.style.left = window.innerWidth + 'px';            
        }

        public scrollTo(): void {
            this.element.style.left = '0px';
        }

    }

    export class BottomWindow extends Window {

        constructor(id: string, color: string) {
            super(
                sides.bottom,
                { [sides.top]: true },
                id, color
            );
        }

        public isOffsetted(): boolean {
            return parseInt(this.element.style.top) !== window.innerHeight;
        }

        public scrollToDefault(): void {
            this.element.style.top = window.innerHeight + 'px';            
        }

        public scrollTo(): void {
            this.element.style.top = '0px';
        }

    }

    export class LeftWindow extends Window {

        constructor(id: string, color: string) {
            super(
                sides.left,
                { [sides.right]: true },
                id, color
            );
        }

        public isOffsetted(): boolean {
            return parseInt(this.element.style.left) !== window.innerWidth;
        }

        public scrollToDefault(): void {
            this.element.style.left = -window.innerWidth + 'px';            
        }

        public scrollTo(): void {
            this.element.style.left = '0px';                        
        }

    }
}