import { html } from '@polymer/polymer/polymer-element.js';
import {InputSingleton} from "./input-base-singleton";
import '../singleton/iris-date-picker';
import '../layout/css-variables';

export class IrisInputDatepicker extends InputSingleton {
    static get inputTemplate() {
        return html`
            <input
                type="text"
                placeholder="[[placeholder]]"
                id="input"
                value="{{value::input}}"
                on-focus="_onFocus"
                on-blur="_onBlur"
            />
            <iron-icon icon="icons:date-range"></iron-icon>
        `
    }

    connectedCallback() {
        super.connectedCallback();
        if(!document.body.querySelector('pedrule-datepicker'))document.body.appendChild(document.createElement('pedrule-datepicker'))
    }

    static get styleTemplate() {
        return html`
            ${super.styleTemplate}
            <style>
                :host{
                    @apply --layout-flex;
                }
            </style>
        `
    }

    fireEventToIrisSingleton(day = false, month = false, year = false) {
        let date = new Date(Date.now());
        let selectedDate = this.selectedItems[0] ? this.selectedItems[0] : new Date(year ? year : date.getFullYear(), month ? month-1 : date.getMonth(), day ? day : date.getDate());
        this.dispatchEvent(new CustomEvent('open-datepicker', {detail: {target: this, selectedItems: selectedDate}, bubbles: true, composed: true}));
    }

    _onSelectedItemsChanged(arg) {
        super._onSelectedItemsChanged(arg);
        if(arg && arg[0])this.$.input.value = `${(0+arg[0].getDate().toString()).slice(-2)}/${(0+(arg[0].getMonth()+1).toString()).slice(-2)}/${arg[0].getFullYear()}`;
    }

    /**
     * callback on keyboard event listened if there is only one member in finalList array
     * We dispatch an custom event close to iris scroll list if enter key is taped by user
     * we attach inside of event detail value of selected item.
     * @param event
     * @private
     */
    _onTapOnEnterkeyboard(event) {
        this.selectedItems = [];
        this._regExpOnInputDate(event);
        if(this.$.input.value.length === 2 || this.$.input.value.length === 5)this.$.input.value += '/';
        if(this.$.input.value.length > 10)this.$.input.value = this.$.input.value.slice(0, 10);
        this._manageDateByInput();
        if(event.code === "Enter" || event.keyCode === 13) {//if user press enter key
            this.singleton.show = false;
        }
    }

    _manageDateByInput(){
        let array = this.$.input.value.split('/');
        this.fireEventToIrisSingleton(array[0], array[1], array[2]);
    }

    _regExpOnInputDate(event){
        switch(this.$.input.value.length) {
            case 1:
                if(!event.key.match(/[0-3]/))this.$.input.value = ""
                break;

            case 2:
                if(!event.key.match(/[0-9]/))this.$.input.value = this.$.input.value.slice(0, this.$.input.value.length-1);
                break;

            case 4:
                if(!event.key.match(/[0-1]/))this.$.input.value = this.$.input.value.slice(0, this.$.input.value.length-1);
                break;

            case 5:
                if(!event.key.match(/[0-9]/))this.$.input.value = this.$.input.value.slice(0, this.$.input.value.length-1);
                break;
        }
    }

    reset() {
        this.selectedItems = [];
        this.$.input.value = "";
    }
}
customElements.define('pedrule-input-datepicker', IrisInputDatepicker);