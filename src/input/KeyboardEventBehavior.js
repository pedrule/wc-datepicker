

export const KeyboardEventBehavior = SuperClass => class extends SuperClass {
    connectedCallback() {
        super.connectedCallback();
        this._onTapOnEnterkeyboardBind = this._onTapOnEnterkeyboard.bind(this);
    }


    /**
     * callback on keyboard event listened if there is only one member in finalList array
     * We dispatch an custom event close to iris scroll list if enter key is taped by user
     * we attach inside of event detail value of selected item.
     * @param event
     * @private
     */
    _onTapOnEnterkeyboard(event) {

    }
}