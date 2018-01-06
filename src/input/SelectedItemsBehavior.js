import {ReduxBehavior} from "./ReduxBehavior";

export const SelectedItemsBehavior = SuperClass => class extends ReduxBehavior(SuperClass) {
    static get properties() {
        return {
            selectedItems: {
                type: Array,
                value: [],
                notify: true,
                observer: '_onSelectedItemsChanged'

            },
        }
    }

    _onSelectedItemsChanged(arg) {

    }

    /*/!**
     * @public
     * we manage selectedItems property to remove item argument
     * @param item
     *!/
    removeItem(item) {
        this.selectedItems.splice(this.selectedItems.indexOf(item),1);
        let retour =  [].concat(this.selectedItems);
        this.selectedItems = retour;
    }*/

    /**
     * @public
     * function that remove item argument from selectedItems Element
     * @param item
     */
    removeItem(item) {
        if(this.__checkItemInSelectedList(item) !== false) {
            let a  = this.selectedItems.concat();
            a.splice(this.__checkItemInSelectedList(item), 1);
            this.dispatch('update', a)
        }
    }

    /**
     * method to return index of item if it is already inside of selectedItems array, otherwise return false;
     * @param item
     * @returns {boolean}
     */
    __checkItemInSelectedList(item) {
        return this.selectedItems.indexOf(item) != -1 ? this.selectedItems.indexOf(item) : false;
    }
}