import {observable, action, computed, configure} from 'mobx';
configure({ enforceActions: 'observed' });
class ModuleB {
    @observable todos = [
        {
            title: "todo标题",
            done: false,
        },
        {
            title: "已经完成 todo 的标题",
            done: true,
        }
    ];
    @observable test = '测试b';
    @action changeTodoTitle({index, title, done}) {
        this.todos[index].title = title
        this.todos[index].done = done
    }

    @action isShow(index) {
        this.todos[index].done = false
    }

    @computed get unfinishedTodos() {
        return this.todos.filter((todo) => todo.done)
    }
}
export default ModuleB
