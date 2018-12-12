//在这里汇总所有的状态
import TestA from './testA'
import TestB from './testB'
class Store {
    constructor(){
        this.TestA = new TestA();
        this.TestB = new TestB();
    }
}
export default new Store()