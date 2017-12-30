/// <reference path="./DOMElementModifiers/About.ts" />
/// <reference path="./DOMElementModifiers/Contact.ts" />
/// <reference path="./DOMElementModifiers/Fullscreen.ts" />
/// <reference path="./DOMElementModifiers/Projects.ts" />
/// <reference path="./DOMElementModifiers/Scrolling.ts" />

/// <reference path="./Inputs/Keyboard.ts" />
/// <reference path="./Inputs/UIButtons.ts" />

enum sides {
    top,
    left,
    right,
    bottom
}

module Hierarchy {

    let about: DOMElementModifiers.About;
    let contact: DOMElementModifiers.Contact;
    let fullscreen: DOMElementModifiers.Resizers;
    let projects: DOMElementModifiers.Projects;
    let scrolling: DOMElementModifiers.Scrolling;

    let keyboardInputs: Navigation.Keyboard;
    let buttonInput: Navigation.UIButtons;

    window.addEventListener('load', () => {
        about = new DOMElementModifiers.About();
        contact = new DOMElementModifiers.Contact();
        fullscreen = new DOMElementModifiers.Resizers();
        projects = new DOMElementModifiers.Projects();
        scrolling = new DOMElementModifiers.Scrolling();

        keyboardInputs = new Navigation.Keyboard(scrolling);
        buttonInput = new Navigation.UIButtons(scrolling);
    });

    window.addEventListener('unload', () => {
        about = null;
        contact = null;
        fullscreen = null;
        projects = null;
        scrolling = null;

        keyboardInputs = null;
        buttonInput = null;
    });

}

function addEventListenerOnce(element: HTMLElement, event: string, fn: Function) {
    
    let editedFunc = () => {
        element.removeEventListener(event, editedFunc);
        fn();
    };
    element.addEventListener(event, editedFunc);
}

let isMobile = {
    android: () => navigator.userAgent.match(/Android/i),
    blackberry: () => navigator.userAgent.match(/BlackBerry/i),
    ios: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
    opera: () => navigator.userAgent.match(/Opera Mini/i),
    windows: () => navigator.userAgent.match(/IEMobile/i),
    any: () => (isMobile.android() || isMobile.blackberry() || 
    isMobile.ios() || isMobile.opera() || isMobile.windows())
  };

isMobile.any() ? document.body.classList.add('is-touch') : null;
