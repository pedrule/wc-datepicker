import { TranslateDateBehavior } from "./TranslateDateBehavior";

export const ConstructOfDate = SuperClass => class extends TranslateDateBehavior(SuperClass) {
    static get properties() {
        return {

            activeMonth: {
                type: Number,
                observer: '_activeMonthChanged'
            },

            activeYear: {
                type: Number,
                observer: '_activeYearChanged'
            },

            selectedMonth: {
                type: Number
            },

            selectedYear: {
                type: Number
            },

            selectedDay: {
                type:Number
            }
        }
    }

    static get observers(){
        return [
            '_changeDaysDisplayed(activeMonth, activeYear, selectedDay)'
        ]
    }

    static get styleGridTemplate() {
        return `
        <style>
                #content{
                    background: var(--white);
                    margin-top: 37px;
                    margin-bottom: 41px;
                    color: var(--grey-400);
                    font-family: Poppins;
                    font-size: 12px;
                    font-weight: 500;
                }
                
                #dayOfWeek{
                    color: var(--grey-200);
                    margin-bottom: 15px;
                }
                
                :host([active-grid=month]) #content{
                    margin-left: 35px;
                    margin-right: 35px;
                }
                
                :host([active-grid=day]) #content{
                    margin-left: 35px;
                    margin-right: 35px;
                }
                
                :host([active-grid=year]) #content{
                    margin-left: 35px;
                    margin-right: 35px;
                }
                
                .grid{
                    display: grid;
                    @apply --layout-flex;
                    grid-auto-rows: 30px;
                }
                
                :host([active-grid=day]) .grid {
                    grid-template-columns: repeat(7, 1fr);
                    grid-gap: 5px;
                }
                
                :host([active-grid=day]) .grid div{
                    opacity: .3;
                }
                
                :host([active-grid=month]) .grid {
                    grid-template-columns: repeat(3, 1fr);
                    grid-auto-rows: 50px;
                    grid-gap: 3px;
                }
                
                :host(:not([active-grid=day])) .grid div{
                    background: var(--grey-100);
                    border-radius: 3px;
                }
                
                :host(:not([active-grid=day])) .grid div:hover{
                    background: var(--yellow-light);
                }
                
                :host([active-grid=day]) .grid .activeMonth:hover{
                    color: var(--black-medium);
                }
                
                :host([active-grid=day]) .grid .selectedDay{
                    background: var(--yellow-medium);
                    color: var(--grey-400);
                    border-radius: 50%;
                    font-size: 12px;
                    font-weight: 600;
                }
                
                :host([active-grid=year]) .grid {
                    grid-template-columns: repeat(4, 1fr);
                    grid-gap: 5px;
                }
                
                .hoverable:hover {
                    color: var(--yellow-light);
                }
                
                .grid div{
                    @apply --layout-vertical;
                    @apply --layout-center-center;
                    
                    font-size: 13px;
                }
                
                .grid div.activeMonth{
                    opacity: 1;
                }
                
                :host(:not([active-grid=day])) .grid div.selected{
                    -webkit-transition: opacity  .15s ease-in-out;-moz-transition: opacity  .15s ease-in-out;-ms-transition: opacity  .15s ease-in-out;-o-transition: opacity  .15s ease-in-out;transition: opacity  .15s ease-in-out;
                    background: var(--yellow-medium);
                    font-size: 12px;
                    font-weight: 600;
                }
            </style>
        `
    }
    connectedCallback() {
        super.connectedCallback();
        this._initDiv(42, "gridDay");
        this._initDiv(12, "gridMonth", true);
        this._initDiv(20, "gridYear");
    }

    _initDiv(limit, container, isMonth = false) {
        for(let i = 0; i < limit; i++) {
            let element = document.createElement('div');
            if(isMonth)element.innerHTML = this.translateText.fr.month[i];
            this.$[container].appendChild(element)
        }
    }

    _onSelectedDateChanged(arg) {
        if(arg) {
            this.selectedDay    =   arg.getDate();
            this.activeYear   =   this.selectedYear     = arg.getFullYear();
            this.activeMonth  =   this.selectedMonth    = arg.getMonth();
        }
    }

    /**
     * function that create and place days of previous month
     * it returns index of the last days of previous month
     * @param arg
     * @returns {number}
     * @private
     */
    _placeLastDayOfPreviousMonth() {
        let lastDayOfPrevMonth = new Date(this.activeYear, this.activeMonth, 0).getDate();
        let indexOfLastDateOfPrevMonth = new Date(this.activeYear, this.activeMonth, 0).getDay();
        if(this.$.gridDay.children[indexOfLastDateOfPrevMonth])
        {
            this.$.gridDay.children[indexOfLastDateOfPrevMonth].innerHTML = lastDayOfPrevMonth;
            for(let i = indexOfLastDateOfPrevMonth; i>= 0; i--) {
                this.$.gridDay.children[i].innerHTML = lastDayOfPrevMonth - (indexOfLastDateOfPrevMonth-i);
                this._addClassDay(i, false);
            }
        }
        return indexOfLastDateOfPrevMonth;
    }

    /**
     * iterate inside children of gridDay element to attach days of current month
     * if there is space available inside of children of gridDay element it attach first days of next month
     * @param arg
     * @param index
     * @private
     */
    _placeActualMonth(index) {
        let lastDayOfCurrentMonth = new Date(this.activeYear, this.activeMonth+1, 0).getDate();
        for(let i = 1; i < lastDayOfCurrentMonth+1; i++) {
            this.$.gridDay.children[index+i].innerHTML = i;
            this._addClassDay(index+i, true);
        }
        if(index+lastDayOfCurrentMonth < this.$.gridDay.children.length-1)this._placeNextMonth(index+lastDayOfCurrentMonth);
    }

    /**
     * iterate to place first days of next month in div available of gridDay div
     * @param index
     * @private
     */
    _placeNextMonth(index) {
        for(let i =  1; i <= this.$.gridDay.children.length -1 - index; i++) {
            this.$.gridDay.children[index + i].innerHTML = i;
            this._addClassDay(index+i, false);
        }
    }

    /**
     * function that manage css class on div of days displayed to gracefully show days of curretnMonth anf others
     * @param index
     * @param isInCurrentMonth
     * @private
     */
    _addClassDay(index, isInCurrentMonth) {
        isInCurrentMonth ? this.$.gridDay.children[index].classList.add('activeMonth') : this.$.gridDay.children[index].classList.remove('activeMonth');
    }

    /**
     * observer on active Month property to handle properly change of year on junuary and december changes
     * we manage display of activeMonth in gridMonth element
     * @param arg
     * @private
     */
    _activeMonthChanged(arg, prev) {
        if(arg === 12) {
            this.activeYear += 1;
            this.activeMonth = 0;
            return;
        };
        if(arg < 0) {
            this.activeYear -= 1;
            this.activeMonth = 11;
            return;
        };
        Array.prototype.forEach.call(this.$.gridMonth.children, item => item.classList.remove('selected'));
        this.$.gridMonth.children[arg].classList.add('selected');
    }

    /**
     * @observer multiple on activeMonth and activeYear it construct each time these values changes
     * grid of days of current Month of current year
     * @param activeMonth
     * @param activeYear
     * @private
     */
    _changeDaysDisplayed(activeMonth, activeYear, selectedDay) {
        if(activeMonth != undefined && activeYear && selectedDay) {
            let index = this._placeLastDayOfPreviousMonth();
            this._placeActualMonth(index);
            this._displayActiveDay();
        }
    }

    _displayActiveDay() {
        Array.prototype.forEach.call(this.$.gridDay.children, item => {
            item.classList.remove('selectedDay');
            if(this.selectedYear === this.activeYear && this.activeMonth === this.selectedMonth && parseInt(item.innerHTML) === this.selectedDay && item.classList.contains('activeMonth'))item.classList.add('selectedDay')
        })
    }

    _activeYearChanged(arg) {
        for(let i = 0; i < this.$.gridYear.children.length; i++) {
            this.$.gridYear.children[i].innerHTML = arg - (9 - i);
        };
        Array.prototype.forEach.call(this.$.gridYear.children, item => item.classList.remove('selected'));
        this.$.gridYear.children[9].classList.add('selected');
    }
}