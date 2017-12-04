/// <reference path="./Scrolling.ts" />

module DOMElementModifiers {

    export class Projects {

        private projectViewerContainer: HTMLDivElement;
        private projectViews: HTMLDivElement[] = [];

        private currentViewIndex: number = 0;

        private rightClass: string = 'projectRight';
        private toCenterClass: string = 'moveProjectCenter';
        private toLeftClass: string = 'moveProjectLeft';

        private tmpClassLooper: number = 0;

        constructor() {
        
            this.projectViewerContainer = <HTMLDivElement>document.getElementById('projectViewerContainer');

            for (let i: number = 3; i--; ) {
                let newView: HTMLDivElement = document.createElement('div')
                this.projectViewerContainer.appendChild(newView);
                this.projectViews.push(newView);
            }

            for (let i: number = this.projectViews.length; i--; ) {
                let view: HTMLDivElement = this.projectViews[i];

                view.classList.add('projectView');
                view.style.backgroundColor = '#'+Math.random().toString(16).substr(-6);
            }

            window.addEventListener('keypress', (e: KeyboardEvent) => this.keyboardInput(e));

        }

        private keyboardInput(e: KeyboardEvent): void {
            if (e.keyCode === 32) { this.openNewView(0); }
                
        }

        private resetAllWindows(): void {
            for (let i: number = this.projectViews.length; i--; ) {
                this.projectViews[i].classList.remove(this.toLeftClass);
                this.projectViews[i].classList.remove(this.toCenterClass);
                this.projectViews[i].classList.remove(this.rightClass);
                this.projectViews[i].classList.add(this.rightClass);
            }
        }

        private openNewView(view: number): void {

            this.tmpClassLooper = this.tmpClassLooper >= 2 ? 0 : this.tmpClassLooper + 1;
            view = this.tmpClassLooper;

            this.resetAllWindows();

            this.projectViews[this.currentViewIndex].classList.add(this.toLeftClass);
            this.projectViews[this.currentViewIndex].classList.remove(this.rightClass);

            this.projectViews[view].classList.add(this.toCenterClass);
            this.projectViews[view].classList.remove(this.rightClass);            

            this.currentViewIndex = view;

        }

    }
}