export const FilterBehavior = SuperClass => class extends SuperClass {
    static get properties() {
        return {
            baseList: {
                type: Array,
                observer: "_baseListChanged"
            },

            finalList: {
                type: Array,
                computed: '_filterBaseList(baseList, value)',
            }
        }
    }


    /**
     * @observer
     * if baseList and value property set, we return a filtered array of baseList with value and bound it to finalList property
     * @param baseList
     * @param value
     * @returns {*}
     * @private
     */
    _filterBaseList(baseList, value) {
        if(baseList)return value ? baseList.filter(item=>this._filterAlgoOnCriterionObject(value, item)): baseList;
    }

    /**
     * if itemList.label in laguage focused contain inputValue, we return true, false otherwise.
     * @param inputValue
     * @param itemList
     * @returns {boolean}
     * @private
     */
    _filterAlgoOnCriterionObject(inputValue, itemList) {
        return itemList.label.toLocaleLowerCase().indexOf(inputValue.toLowerCase()) != -1;
    }

    _baseListChanged(arg) {

    }

    isFiltered() {
        return this.value !== "" && this.value !== undefined;
    }
}