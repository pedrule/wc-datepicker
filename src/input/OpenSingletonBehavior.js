/*
*
* OpenSingleton behavior. This behavior is attached on any component which has to trigger the iris-scroll-list display or hide.
* multi and selectAll are properties which are included in customEvent to help iris-dialog to correctly set itself
*
* */


import {FilterBehavior} from "./FilterBehavior";
import { ReduxBehavior } from './ReduxBehavior';
import {KeyboardEventBehavior} from "./KeyboardEventBehavior";

export const OpenSingletonBehavior = SuperClass => class extends FilterBehavior(KeyboardEventBehavior(SuperClass)) {
    static get properties() {
        return {
            /*
            * property which trigger the connection to singleton
            * */
            attachedList: {
                type: Boolean,
                reflectToAttribute: true,
                observer: '_attachedListChanged',
                value: false
            },

            /*
            * property bound to singleton when connection is made
            * */
            singleton: {
                type: Object,
                observer: '_onSingletonSet'
            },

            /*
            * property to enable real time update of any changes made in singleton
            * */
            live: {
                type: Boolean,
                value: false
            },
            event: {
                type: Object
            }
        }
    }

    static get observers() {
        return [
            '_updateSingletonDataWithFinalList(singleton, finalList)'
        ]
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._onClickEvent);
        this.onSelectedSingletonBind = this._onSelectedInSingleton.bind(this);
        this.event = new CustomEvent('open-iris-singleton', {detail: {target: this, selectedItems: this.selectedItems, live: this.live, filtered: this.isFiltered()}, bubbles: true, composed: true});
    }

    _onClickEvent(event) {
        event.stopImmediatePropagation();//avoid side effect on dom click event
        this.attachedList = true;
    }

    /**
     * if attachedList is true we call on iris-scrollList singleton to attach itself on element
     * @param arg
     * @private
     */
    _attachedListChanged(arg) {
        this.dispatchEvent(new CustomEvent('attached-list-changed', {detail: {value: arg}, bubbles: true, composed: true}));// fire event composed to pierce the shadow dom
        if(arg)this.fireEventToIrisSingleton();// element connect to singleton irisScrolllist
        if(arg === false)this.value = "";//we reset the filter on baseList and finalList
    }

    /**
     * parent function to fire a custom event to open iris sroll list singleton
     * called in mixin OpenSingletonBehavior on each changes in attachedList property
     * this function is completed by override of child element similar function
     * @returns {CustomEvent}
     */
    fireEventToIrisSingleton() {
        let a;
        if(this.finalList) a = this.finalList.concat();
        this.event.detail.data = a;
        this.dispatchEvent(this.event);
    }

    /**
     * @observer
     * function plays each time singleton change
     * we listen on selectedItems changed on singleton and we remove listener
     * @param arg
     * @param prev
     * @private
     */
    _onSingletonSet(arg, prev) {
        if(arg)this.addEventListener('selected-items-changed', this.onSelectedSingletonBind);
        if(prev)this.removeEventListener('selected-items-changed', this.onSelectedSingletonBind);
    }

    /**
     * @observer
     * on multiple properties: singleton and finalList property
     * related on filterBehavior if isFiltered property is true
     * we update singleton data property with finalList property and
     * selectedItems property of singleton with element one.
     * @param singleton
     * @param finalList
     * @private
     */
    _updateSingletonDataWithFinalList(singleton, finalList){
        if(finalList && singleton) {
            if(this.isFiltered()) {
                singleton.data = finalList;
                singleton.selectedItems = this.selectedItems;
            }
        }
    }

    _onSelectedInSingleton(event) {
        //if(!this.live)this.singleton.show = false;// element isn't in live, we close singleton
    }

    /**
     * callback on keyboard event listened if there is only one member in finalList array
     * We dispatch an custom event close to iris scroll list if enter key is taped by user
     * we attach inside of event detail value of selected item.
     * @param event
     * @private
     */
    _onTapOnEnterkeyboard(event) {
        if(event.code === "Enter" || event.keyCode === 13) {//if user press enter key
            if(this.finalList.length === 1)this.singleton.selectItem(this.finalList);
            this.singleton.show = false;
            this.$.input.blur();
        }
    }

}