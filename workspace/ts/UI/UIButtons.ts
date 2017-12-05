module UI {
    export abstract class UIButton {

        protected element: HTMLDivElement;

        constructor(id: string) {
            this.element = <HTMLDivElement>document.getElementById(id);
        }
        protected setStyle(props: {
            width?: string,
            height?: string,
            top?: string,
            left?: string,
            backgroundColor?: string,
            borderTopRightradius?: string,
            borderBottomRightRadius?: string
        }, transition: boolean = true): void {
            
            if (transition == false) {
                this.element.style.setProperty('transition', '', 'important');
            }

            if (props.top) { this.element.style.setProperty('top', props.top, 'important'); }
            if (props.width) { this.element.style.setProperty('width', props.width, 'important'); }
            if (props.height) { this.element.style.setProperty('height', props.height, 'important'); }
            if (props.left) { this.element.style.setProperty('left', props.left, 'important'); }
            if (props.backgroundColor) { this.element.style.setProperty('background-color', props.backgroundColor, 'important'); }
            if (props.borderTopRightradius) { this.element.style.setProperty('border-top-right-radius', props.borderTopRightradius, 'important'); }
            if (props.borderBottomRightRadius) { this.element.style.setProperty('border-bottom-right-radius', props.borderBottomRightRadius, 'important'); }

            if (transition == false) {
                this.element.style.setProperty('transition', 'all 1s', 'important');
            }

        }
        abstract hide(): void;
        abstract show(): void;
        abstract transition(): void;

    }

    export class LeftUIButton extends UIButton {

        constructor(id: string) {
            super(id);
        }

        private setStyleShow(transition: boolean = true): void {
            this.setStyle({
                width: '2vw',
                top: '0%',
                height: '100%',
                borderTopRightradius: '150vmin',
                borderBottomRightRadius: '75vmin'
            });
        }

        private setStylePeek(transition: boolean = true): void {

        }

        private setStyleHidden(transition: boolean = true): void {

        }

        public hide(): void {

        }

    } 
}