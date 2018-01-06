import { IrisDatePicker } from './iris-date-picker.js';
describe('iris-date-picker specs', ()=>{
    let element;
    beforeAll(()=>{
        element = document.createElement('iris-date-picker');
        document.body.appendChild(element);
    });

    afterAll(()=>{
        document.removeChild(element);
    })

    it('should retrieve current date when initialize', ()=>{
        expect(IrisDatePicker.properties.selectedItems).toBeDefined();
        expect(IrisDatePicker.properties.selectedItems.type).toEqual(Date);
    });

    it('should have a activeGrid propertywhich allow to display month day or year grid layer', ()=>{
        expect(IrisDatePicker.properties.activeGrid).toBeDefined();
    })

    it('should set selectedItems on now if there is not selectedItems already set', ()=>{

    });

    describe('display of month and year when selectedItems is set', ()=>{
        it('should display month related on selectedItems')
        it('should display year related on selectedItems')
    })

    describe('if user click on iris-input-datepicker, ', ()=>{
        it('it makes sure the element isn\'t visible  before user action', ()=>{
            expect(element.show).toBeFalsy();
        });

        describe('it should have element', ()=>{
            beforeEach(()=>{
                document.body.dispatchEvent(new CustomEvent('open-datepicker', {detail: {target: element, selectedItems: new Date("2017-12-05T13:57:23.449Z")}, bubbles: true}));
            })
            it(' to become visible', ()=>{
                expect(element.selectedItems.toJSON()).toEqual("2017-12-05T13:57:23.449Z");
            });

            it(' element selectedItems property set with selectedItems property of event detail', ()=>{
                expect(element.show).toBeTruthy();
            });
            it('\'s activeMonth, activeYear and activeDay set accordingly with selectedItems property', ()=>{
                expect(element.selectedYear).toEqual(2017);
                expect(element.selectedMonth).toEqual(11);
                expect(element.selectedDay).toEqual(5);
            })
        });
    })

    describe('actions of user in the header, ', ()=>{
        beforeEach(()=>{
            document.body.dispatchEvent(new CustomEvent('open-datepicker', {detail: {target: element, selectedItems: new Date("2017-10-05T13:57:23.449Z")}, bubbles: true}));
        })
        describe('if he clicks on single right chevron, it ', ()=>{
            it('should have active month increments of one', ()=>{
                expect(element.activeMonth).toEqual(9);
                element.$.moreMonth.dispatchEvent(new MouseEvent('click', {bubbles: true}));
                expect(element.activeMonth).toEqual(10);
            });

            it('should have active month equal to 1 and active year increments of one if previous active month was 11', ()=>{
                element.activeMonth = 11;
                element.$.moreMonth.dispatchEvent(new MouseEvent('click', {bubbles: true}));
                expect(element.activeMonth).toEqual(0);
                expect(element.activeYear).toEqual(2018);
            });
        });

        describe('if he clicks on single left chevron, it ', ()=>{
            it('should have active month decrements of one', ()=>{
                expect(element.activeMonth).toEqual(9);
                element.$.lessMonth.dispatchEvent(new MouseEvent('click', {bubbles: true}));
                expect(element.activeMonth).toEqual(8);
            });

            it('should have active month equal to 1 and active year increments of one if previous active month was 11', ()=>{
                element.activeMonth = 0;
                element.$.lessMonth.dispatchEvent(new MouseEvent('click', {bubbles: true}));
                expect(element.activeMonth).toEqual(11);
                expect(element.activeYear).toEqual(2016);
            });
        });

        describe('if he clicks on double right chevron, it ', ()=>{
            it('should have active year increments of one', ()=>{
                expect(element.activeYear).toEqual(2017);
                element.$.moreYear.dispatchEvent(new MouseEvent('click', {bubbles: true}));
                expect(element.activeYear).toEqual(2018);
            });
        });

        describe('if he clicks on double left chevron, it ', ()=>{
            it('should have active year decrements of one', ()=>{
                expect(element.activeYear).toEqual(2017);
                element.$.lessYear.dispatchEvent(new MouseEvent('click', {bubbles: true}));
                expect(element.activeYear).toEqual(2016);
            });
        });

        describe('if I clicks on month, ', ()=>{
            it('it should display grid of month', ()=> {
                expect(element.activeGrid).toEqual('day');
                element.$.month.dispatchEvent(new MouseEvent('click', {bubbles: true}));
                expect(element.activeGrid).toEqual('month');
                expect(element.selected).toEqual(1);
            })
        })
    });

    describe('update of days displayed ', ()=>{

    });

    describe('action on gridMonth, when user click on a month', ()=>{
        beforeEach(()=>{
            element.activeGrid = "month";
            element.$.gridMonth.children[1].dispatchEvent(new MouseEvent('click', {bubbles: true}))
        });

        it('it should have the month clicked as activeMonth property',()=> {
            expect(element.activeMonth).toEqual(1);
        });

        it('it should display grid day element', ()=>{
            expect(element.activeGrid).toEqual('day');
        })
    });

    describe('action on gridYear, when user click on a year', ()=>{
        beforeEach(()=>{
            element.activeGrid = "year";
            element.$.gridYear.children[10].dispatchEvent(new MouseEvent('click', {bubbles: true}))
        });

        it('it should have the year clicked as activeYear property',()=> {
            expect(element.activeYear).toEqual(2018);
        });

        it('it should display grid day element', ()=>{
            expect(element.activeGrid).toEqual('day');
        })
    });

    describe('when user quit element, ', ()=>{
        beforeEach(()=>{
            document.body.dispatchEvent(new CustomEvent('open-datepicker', {detail: {target: element, selectedItems: new Date("2017-10-05T13:57:23.449Z")}, bubbles: true}));
            element.show = true;
        })
        it('it should have selectedItems property set to date selected by user ', ()=>{
            spyOn(element, '_affectSelectedItemsOnTarget');
            element.show = false;
            expect(element._affectSelectedItemsOnTarget).toHaveBeenCalled();

        })
    })
})