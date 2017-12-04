module DOMElementModifiers {
    export class Resizers {
        constructor() {
            window.addEventListener('resize', resizeFullscreenElements);
            window.addEventListener('load', resizeFullscreenElements);
        
            function resizeFullscreenElements() {
                let flObjects: any = document.getElementsByClassName('fullscreen');
                
                for (let i: number = flObjects.length; i--; ) {
                    flObjects[i].style.width = window.innerWidth + 'px';
                    flObjects[i].style.height = window.innerHeight + 'px';
                }
                
            }
        }
    }
}