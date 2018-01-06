
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { Element } from '@polymer/polymer/polymer-element.js';
import {SingletonBehavior} from "./SingletonBehavior";
import { ConstructOfDate } from "./ConstructOfDateBehavior";
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-pages/iron-pages';
import '../icons/rd-icons';
import {PositionWithCursorBehavior} from "./PositionWithCursor";


export class IrisDatePicker extends ConstructOfDate(SingletonBehavior(PositionWithCursorBehavior(Element))) {
    static get properties() {
        return {
            selectedItems: {
                type: Date,
                observer: '_onSelectedDateChanged'
            },

            activeGrid: {
                type: String,
                reflectToAttribute: true,
                value:'day',
            },

            selected: {
                type: Number,
                computed: '_setSelected(activeGrid)'
            }
        }
    }
    static get template() {
        return `
            ${this.stylePositionTemplate}
            <style include="iron-flex iron-flex-alignment">
                :host{
                    @apply --layout-fit;
                    @apply --layout-vertical;
                    overflow: hidden;
                    color: var(--white);
                    font-family: Lato;
                   
                }
                
                :host(:not([show])){
                    pointer-events: none;
                }
                
                #window{
                    @apply  --no-user-select;
                }
                
                #header{
                    background: var(--black-light);
                    min-width: 305px;
                    min-height: 62px;
                    font-family: Poppins;
                    font-size: 15.2px;
                    font-weight: 500;
                    text-transform: uppercase;
                }
                
                iron-icon{
                    height: 11px;
                }
                
                .less{
                    transform: rotate(180deg);
                }
                
                #date{
                    width: 50%;
                }
                
                #month{
                    margin-right: 10px;
                }
                
                div[hidden]{
                    display: none !important;
                }
                
                #navYear{
                    margin-top: 15px;
                    text-transform: uppercase;
                }
            </style>
            ${this.styleGridTemplate}
            <div id="window" class="appear specialShadow">
                <div id="header" class="layout horizontal center-center" on-click="_handleActionOnHeader">
                    <iron-icon id="lessYear"  icon="iris-icons:double_chevron_datepicker" class="less hoverable"></iron-icon>
                    <iron-icon id="lessMonth" icon="iris-icons:chevron_datepicker" class="less hoverable"></iron-icon>
                    <div id="date" class="layout horizontal center-center" on-click="_onclickDate">
                        <div id="month" class="hoverable">[[setActiveMonth(activeMonth)]]</div>
                        <div id="year" class="hoverable">[[activeYear]]</div>
                    </div>
                    <iron-icon id="moreMonth" class=" hoverable" icon="iris-icons:chevron_datepicker"></iron-icon>
                    <iron-icon id="moreYear" class=" hoverable" icon="iris-icons:double_chevron_datepicker"></iron-icon>
                </div>
                <div id="content" class="layout vertical">
                    <div id="dayOfWeek" class="layout horizontal around-justified" hidden$="[[_daysOfWeekVisible(selected)]]">
                        <div>SUN</div>
                        <div>MON</div>
                        <div>TUE</div>
                        <div>WED</div>
                        <div>THU</div>
                        <div>FRI</div>
                        <div>SAT</div>
                    </div>
                    
                    <iron-pages selected="[[selected]]" class="layout vertical">
                        <div id="gridDay" class="grid" on-click="_selectActiveDay"></div>
                        <div id="gridMonth" class="grid" on-click="_selectActiveMonthOrYear"></div>
                        <div id="gridYear" class="grid" on-click="_selectActiveMonthOrYear"></div>
                    </iron-pages>
                    <div id="navYear" class="horizontal layout justified" hidden$="[[_navYearVisible(selected)]]" on-click="_navYearClicked">
                        <span id="lessAlot">< précédent</span>
                        <span id="moreAlot">suivant ></span>
                    </div>
                </div>
            </div>
            <div id="cursor" class="appear"></div>
        `
    }

    _onSelectedDateChanged(arg) {
        super._onSelectedDateChanged(arg)
    }

    connectedCallback() {
        super.connectedCallback();
        this.multi = true;
        this.onOpenDatepickerEventBind = this.onOpenDatepickerEvent.bind(this);
        document.body.addEventListener('open-datepicker', this.onOpenDatepickerEventBind);
    }

    onOpenDatepickerEvent(event) {
        this.target = event.detail.target;
        this.show = event.detail.show != undefined ? event.detail.show : true;
        this.selectedItems = event.detail.selectedItems;
        this.target.singleton = this;
    }

    _setSelected(activeGrid){
        return activeGrid === "day" ? 0 : activeGrid === "month" ? 1: 2;
    }

    _daysOfWeekVisible(selected) {
        return selected === 0 ? false : true;
    }

    _navYearVisible(selected) {
        return selected === 2 ? false : true;
    }

    /**
     * function that handle user interaction on user header element
     * @param event
     * @private
     */
    _handleActionOnHeader(event) {
        switch(event.target) {
            case this.$.moreMonth:
                this.activeMonth += 1;
                break;

            case this.$.lessMonth:
                this.activeMonth -= 1;
                break;

            case this.$.moreYear:
                this.activeYear += 1;
                break;

            case this.$.lessYear:
                this.activeYear -= 1;
                break;

            case this.$.month:
                this.activeGrid = 'month';
                break;

            case this.$.year:
                this.activeGrid = 'year';
                break;
        }
    }

    _navYearClicked(event) {
        event.target === this.$.moreAlot ? this.activeYear += 20 : this.activeYear -= 20;
    }

    _selectActiveDay(event) {
        this.selectedMonth = this.activeMonth;
        this.selectedYear = this.activeYear;
        this.selectedDay = parseInt(event.target.innerHTML);
    }

    _selectActiveMonthOrYear(event) {
        let index = Array.prototype.reduce.call(event.currentTarget.children, (previous, item, index) =>  item === event.target ? index : previous, -1);
        event.currentTarget === this.$.gridMonth ? this.activeMonth = index : this.activeYear = parseInt(this.$.gridYear.children[index].innerHTML);
        this.activeGrid = 'day';
    }

    /**
     * @IMPORTANT : FUNCTION THAT PLAY SOURCE OF TRUTH
     * we create new array from this element and we send it to the target.
     * We do it because if a new element call iris-scroll-list and update it selectedItems we don't want
     * side effect on previous target. So we send definitively selectedItems updated to target so deal is over and all is good, end of the story.
     * @private
     */
    _affectSelectedItemsOnTarget() {
        this.selectedItems = new Date(this.selectedYear, this.selectedMonth, this.selectedDay);
        super._affectSelectedItemsOnTarget();
    }
}
customElements.define('rd-datepicker', IrisDatePicker);