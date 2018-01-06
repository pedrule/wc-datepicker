export const ReduxBehavior = SuperClass => class extends SuperClass {
    static get properties() {
        return {
            reduxEvent: {
                type: Object,
                value: ()=>{
                    return new CustomEvent('selected-items-redux-changed', {detail: {}, bubbles: true, composed: true});
                }
            }
        }
    }
    dispatch(action, info) {
        switch(action) {
            case "update":
            this.affectDetailAndFireEvent(info);
            break;
        }
    }

    affectDetailAndFireEvent(info) {
        this.reduxEvent.detail.value = info;
        this.selectedItems = info;
        this.dispatchEvent(this.reduxEvent);
    }
}