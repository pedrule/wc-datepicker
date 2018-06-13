import {PositionBehavior} from "./PositionBehavior";
import { html } from '@polymer/polymer/polymer-element.js';

export const PositionWithCursorBehavior  = SuperClass => class extends PositionBehavior(SuperClass) {
    static get properties() {
        return {
            canBeBelow: {
                type: Boolean,
                computed: '_canBeBelowTheTarget(boundTarget)'
            }
        }
    }

    static get observers() {
        return [
            '_positionLeft(shouldBeOnTop, canBeBelow, boundTarget)'
        ]
    }

    static get stylePositionTemplate() {
        return html`
            ${super.stylePositionTemplate}
            <style>
                :host{
                    --box-shadow-left: var(--grey-200) 5px -5px 7px, var(--grey-75) 5px -5px 7px;
                        
                    
                    --box-shadow-top: var(--grey-200) -2px -2px 3px, var(--grey-75) -1px -1px 1px;
                        
                    
                    --box-shadow-bottom: var(--grey-200) 5px 5px 9px, var(--grey-75) 5px 5px 9px;
                    
                    --box-shadow-date: {
                        box-shadow: var(--grey-400) 0px 0px 15px, var(--grey-75) 0px 5px 9px;
                    };
                }
                
                :host([show]) #window.specialShadow{
                    @apply --box-shadow-date;
                }
                
                #cursor{
                    width: 10px;
                    height: 10px;
                    position: absolute;
                    background: var(--black-light);
                    position: absolute;
                    z-index: 99;
                    
                }
            </style>
        `
    }

    get efficientHeight() {
        return this.$.window.getBoundingClientRect().height + (this.$.cursor.getBoundingClientRect().height/2);
    }

    /**
     * @computed
     * @override
     * property boundTarget set if target is available.
     * @param target
     * @returns {ClientRect|*|{top, bottom, left, right, width, height}|any}
     * @private
     */
    _setBoundTarget(target) {
        if(target) {
            let boundTarget = target.getBoundingClientRect();
            return boundTarget;
        }
    }


    /**
     * function that handle to display on top or not of target accordingly to it position in window coordonate
     * @param boundTarget
     * @returns {boolean}
     * @private
     */
    _setShouldBeOnTop(boundTarget) {
        if(boundTarget)return this.efficientHeight <= boundTarget.top;
    }

    _canBeBelowTheTarget(boundTarget){
        if(boundTarget)return this.efficientHeight <= window.innerHeight - boundTarget.bottom;
    }

    _positionLeft(shouldBeOnTop, canBeBelow, boundTarget) {
        if(boundTarget)canBeBelow ? this._placeElement(1) : shouldBeOnTop ? this._placeElement(2) : this._placeElement(3);
    }

    _placeElement(position) {
        //position => 1 = position on below of the target; 2 = position on top of the target ; otherwise position on left of target
        this.$.cursor.style.transform = '';
        switch(position) {
            case 1:
                this.$.cursor.style.background = `var(--black-light)`;
                this.$.cursor.style.boxShadow = "var(--box-shadow-top)";
                this.$.cursor.style.transform = `translate3d(${this.boundTarget.left + (this.boundTarget.width/2)}px, ${this.boundTarget.top + this.boundTarget.height}px, 0) `;
                this.$.cursor.style.transform += `rotate(45deg)`;
                this.$.window.style.top     = `${this.$.cursor.getBoundingClientRect().top + (this.$.cursor.getBoundingClientRect().height/2)}px`;
                this.$.window.style.left    = `${this.$.cursor.getBoundingClientRect().left - (this.$.window.getBoundingClientRect().width/2)}px`;
                break;

            case 2:
                this.$.cursor.style.background = `var(--white)`;
                this.$.cursor.style.boxShadow = "var(--box-shadow-bottom)";
                this.$.cursor.style.transform = `translate3d(${this.boundTarget.left + (this.boundTarget.width/2)}px, ${this.boundTarget.top - (this.$.cursor.getBoundingClientRect().height)}px, 0) `;
                this.$.cursor.style.transform += `rotate(45deg)`;
                this.$.window.style.top     = `${this.$.cursor.getBoundingClientRect().top - this.$.window.getBoundingClientRect().height + (this.$.cursor.getBoundingClientRect().height/2)}px`;
                this.$.window.style.left    = `${this.$.cursor.getBoundingClientRect().left - (this.$.window.getBoundingClientRect().width/2)}px`;
                break;

            case 3:
                this.$.cursor.style.background = `var(--white)`;
                this.$.cursor.style.boxShadow = "var(--box-shadow-left)";
                this.$.cursor.style.transform = `translate3d(${this.boundTarget.left - this.$.cursor.getBoundingClientRect().width}px, ${this.boundTarget.top + this.boundTarget.height/2 - this.$.cursor.getBoundingClientRect().height/2}px, 0) `;
                this.$.cursor.style.transform += `rotate(45deg)`;
                this.$.window.style.top     = `${this.$.cursor.getBoundingClientRect().top - this.$.window.getBoundingClientRect().height/2 + (this.$.cursor.getBoundingClientRect().height/2)}px`;
                this.$.window.style.left    = `${this.$.cursor.getBoundingClientRect().left - this.$.window.getBoundingClientRect().width + (this.$.cursor.getBoundingClientRect().width/2)}px`;
                break;
        }


    }
}