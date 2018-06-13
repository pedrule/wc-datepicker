import { html } from '@polymer/polymer/polymer-element.js';

export const PositionBehavior = SuperClass => class extends SuperClass {
    static get properties() {
        return {

            boundTarget: {
                type: Object,
                computed: '_setBoundTarget(target)'
            },

            shouldBeOnTop: {
                type: Boolean,
                computed: '_setShouldBeOnTop(boundTarget)'
            }
        }
    }

    static get observers() {
        return [
            '_adjustSizeAndPosition(boundTarget, shouldBeOnTop)'
        ]
    }

    static get stylePositionTemplate() {
        return html`
        <style include="iron-flex iron-flex-alignment">
                :host{
                    @apply --layout-fit;
                    overflow: hidden;
                    
                }
                
                :host #window{
                    transform-origin: top center;
                    position: absolute;
                    background: var(--white);
                    overflow: hidden;
                    box-sizing: border-box;
                    z-index: 99;
                }
                
                :host .appear{
                    opacity: 0;
                    /*transition: opacity .15s ease-in-out;*/
                }
                
                :host([show]) .appear{
                    opacity: 1;
                    /*transition: opacity .15s ease-in-out;*/
                }
                
                :host([show]) #window{
                    pointer-events: all;
                    @apply --box-shadow;
                }
            </style>
        `
    }

    /**
     * @computed
     * property boundTarget set if target is available.
     * @param target
     * @returns {ClientRect|*|{top, bottom, left, right, width, height}|any}
     * @private
     */
    _setBoundTarget(target) {
        if(target) {
            let boundTarget = target.getBoundingClientRect();
            this.$.window.style.width = `${boundTarget.width}px`;
            this.$.window.style.left = `${boundTarget.left}px`;
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
        if(boundTarget)return boundTarget.top > (window.innerHeight - (boundTarget.top + boundTarget.height));
    }

}