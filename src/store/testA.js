import {observable, action, computed, configure} from 'mobx';
configure({ enforceActions: 'observed' });
class TestA {
    @observable test = '测试a';
    @observable MenuIndex = 0;
    @observable collapsed = false;
    @action isCollapse(boolean){
        this.collapsed = !boolean
    }
    @action changeIndex(index){
        this.MenuIndex = index
    }
    @action changeTest(newValue){
        this.test = newValue
    }
}
export default TestA
