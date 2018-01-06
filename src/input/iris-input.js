import { Element } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-icon/iron-icon';

/**
 *
 * Iris Input is a special component which as several purposes
 *
 * first : He display an native input with focus automaticaly set
 * second : If it has attachedList property set and data set, he launch a custom event 'open-iris-singleton' to
 * call display of the list inside of iris-scroll-list singleton
 *
 **/

/*
@customEvent
'open-iris-singleton'
data : this data
target:  this
*/

export class IrisInput extends Element {
    static get properties() {
        return {
            placeholder: {
                type: String,
            },

            autofocus: {
                type: Boolean,
                reflectToAttribute: true,
                observer: '_focusChange'
            },

            value: {
                type: String,
                notify: true,
            },
        }
    }

    static get template() {
        return `
            ${this.styleTemplate}
            ${this.inputTemplate}
        `
    }

    static get inputTemplate() {
        return `
            <slot name="preIcon"></slot>
            <input
                type="text"
                placeholder="[[placeholder]]"
                id="input"
                value="{{value::input}}"
                on-focus="_onFocus"
                on-blur="_onBlur"
            />
            <iron-icon icon="icons:expand-more"></iron-icon>
        `
    }

    static get styleHostCenter() {
        return `
            @apply --layout-center-center;
        `
    }

    static get styleTemplate() {
        return `
            <style include="iron-flex iron-flex-alignment">
                :host{
                    @apply --layout-horizontal;
                    @apply --layout-self-stretch;
                    ${this.styleHostCenter}
                    border: 1px solid var(--grey-75);
                    color: var(--grey-400);
                    background: var(--white-medium);
                    outline: none;
                }
                
                :host([hidden]) {
                    @apply  --layout-invisible;
                }
                
                input{
                    @apply --layout-flex;
                    border: 0px solid var(--grey-75);
                    background: var(--white-medium);
                    outline: none;
                    margin-left: 10px;
                    font-family: Lato;
                    font-size: 12.9px;
                    line-height: 1.85;
                    text-align: left;
                    color: var(--grey-400);
                }
                
                ::slotted(iron-icon) {
                    padding: 3px;
                }

            </style>
        `
    }

    _onFocus(event) {
        setTimeout(()=>{
            if(this.$.input.value)this.$.input.setSelectionRange(0,this.$.input.value.length);
        },50);

    }

    /**
     * observer on autofocus if it's true, we call focus on the input child
     * @param arg
     * @private
     */
    _focusChange(arg) {
        if(arg === true) {
            this.$.input.focus();
        }
    }
}
customElements.define('iris-input', IrisInput);
