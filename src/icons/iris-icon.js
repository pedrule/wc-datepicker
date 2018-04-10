import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-icon-button/paper-icon-button';

export class IrisIcon extends PolymerElement {
    static get properties() {
        return {
            icon: {
                type: String,
            }

        }
    }
    static get template() {
        return `
        <style include="iron-flex iron-flex-alignment">
            :host{
                @apply --layout-vertical;
                --iris-icon-width: var(--menu-button-width);
                --iris-icon-height: var(--menu-button-height);
                --iris-icon-color: var(--grey-200);
                --iris-icon-border: 50%;
                --iris-icon-background: var(--black-medium);
                
            }
            
            paper-icon-button{
                width: var(--iris-icon-width);
                height: var(--iris-icon-height);
                color: var(--iris-icon-color);
                padding: var(--iris-icon-padding, 8px);
                border-radius: var(--iris-icon-border);
                background: var(--iris-icon-background);
                
                
                
                @apply --layout-vertical;
                @apply --layout-center-center;
            }
            
            iron-icon{
                --iron-icon-width: 50%;
                --iron-icon-height: 50%;
            }
            
            
        </style>
        <paper-icon-button icon=rd-datepicker-icons:[[icon]] no-raise></paper-icon-button>
        `
    }
}
customElements.define('iris-icon', IrisIcon);