export const SingletonBehavior = SuperClass => class extends SuperClass {
    static get properties() {
        return {
            /*
            * this property is a srce of truth to bind selectedItems value to it target
            * */
            show: {
                type: Boolean,
                reflectToAttribute: true,
                value: false,
                observer: '_showChanged'
            },

            target: {
                type: Object,
                observer: '_targetChanged'
            },
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.onCloseSingletonEventBind = this.onCloseSingletonEvent.bind(this);
        this.onClickCallbackBodyBind = this.onClickCallbackBody.bind(this);
        this.addEventListener('click', this.onClickCallbackBodyBind);
        document.body.addEventListener('close-singleton', this.onCloseSingletonEventBind);
    }

    onCloseSingletonEvent(event) {
        this.show = false;
    }

    /**
     * callback on click on document body
     * we set the show and the target's attached list on false if any target in the path of the event isn't the window child container of element
     * @param event
     */
    onClickCallbackBody(event) {
        this.show =  event.path.find(item=>item === this.$.window)? this.multi : false;
    }

    /**
     * when show changes, we check if show previously set true and now is setted to false;
     * if it is we call _affectSelectedItemsOnTarget
     * @param arg
     * @param prev
     * @private
     */
    _showChanged(arg, prev) {
        if(this.target)this.target.attachedList = arg;
        if(!arg && prev )this._affectSelectedItemsOnTarget(); // if show is false and it previous value was true and it's not in live mode, we affect selectedItems property on it target
        if(!arg && prev)this._resetElement();// if we had a target element connected and it is not anymore we reset singleton properties
    }

    /**
     * @observer on target property
     * @param arg
     * @param prev
     * @private
     */
    _targetChanged(arg, prev) {
        if(arg)this.connect(arg);
        if(prev)this.deconnect(prev);
    }

    /**
     * singleton connect on target element and listen on key event on it
     * @param element
     */
    connect(element) {
        element.addEventListener('keyup', element._onTapOnEnterkeyboardBind);
    }

    deconnect(element){
        element.attachedList = false;
        element.singleton = undefined;
        element.removeEventListener('keyup', element._onTapOnEnterkeyboardBind);
    }

    _resetElement() {
        this.target = undefined;
        this.selectAll = false;
    }

    /**
     * @IMPORTANT : FUNCTION THAT PLAY SOURCE OF TRUTH
     * we create new array from this element and we send it to the target.
     * We do it because if a new element call iris-scroll-list and update it selectedItems we don't want
     * side effect on previous target. So we send definitively selectedItems updated to target so deal is over and all is good, end of the story.
     * @private
     */
    _affectSelectedItemsOnTarget() {
        if(this.target && this.selectedItems != null) this.target.dispatch('update', Array.prototype.concat(this.selectedItems));//target implement ScrollTargetBehavior which implements itself reduxBeahvior
    }

    deselectItem(item) {
        for(let i = 0; i <= this.$.ironList.items.length; i++) {
            if(this.$.ironList.items[i].code === item.code) {
                this.$.ironList.deselectIndex(i);
                break;
            }
        }
    }
}