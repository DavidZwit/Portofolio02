/// <reference path="./DOMElementModifiers/About.ts" />
/// <reference path="./DOMElementModifiers/Contact.ts" />
/// <reference path="./DOMElementModifiers/Fullscreen.ts" />
/// <reference path="./DOMElementModifiers/Projects.ts" />
/// <reference path="./DOMElementModifiers/Scrolling.ts" />

/// <reference path="./Inputs/Keyboard.ts" />
/// <reference path="./Inputs/UIButtons.ts" />

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