export const TranslateDateBehavior = SuperClass => class extends SuperClass {
    static get properties() {
        return {
            translateText: {
                type: Object,
                value: {
                    fr: {
                        week: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'],
                        month: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                    }
                }
            }
        }
    }

    setActiveMonth(activeMonth) {
        return this.translateText.fr.month[activeMonth];
    }
}