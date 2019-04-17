//在这里汇总所有的状态
import ModuleA from './ModuleA'
import ModuleB from './ModuleB'
class Store {
    constructor(){
        this.ModuleA = new ModuleA();
        this.ModuleB = new ModuleB();
    }
}
export default new Store()
