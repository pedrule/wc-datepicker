import {IrisInput} from "./iris-input";
import {OpenSingletonBehavior} from "./OpenSingletonBehavior";
import {SelectedItemsBehavior} from "./SelectedItemsBehavior";// no put inside of openSingletonBehavior because of implementation in Iris-chips-base which don't implements OpenSingletonBehavior

export class InputSingleton extends OpenSingletonBehavior(SelectedItemsBehavior(IrisInput)){
    /**
     * @override of OpensingletonBehavior
     */
    fireEventToIrisSingleton() {
        super.fireEventToIrisSingleton();
    }
}
