import {observable, action, computed, configure} from 'mobx';
configure({ enforceActions: 'observed' });
class TestA {
    @observable MenuIndex = 0;
    @observable collapsed = false;
    @observable path = null;
    @action changePath(newValue){
        this.path = newValue
    }
    @action isCollapse(boolean){
        this.collapsed = !boolean
    }
    @action changeIndex(index){
        this.MenuIndex = index
    }
    @action changeTest(newValue){
        this.test = newValue
    }
    @computed get value(){
        return true
    }
}
export default TestA
