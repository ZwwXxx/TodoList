<style scoped>
.main {
    background-color: #fae3d9;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main2 {
    background-color: #bbded6;
    width: 50%;
    min-height: 60%;
    /*内层黑一点，偏移小一点，外层淡一点，偏移大一点，更立体*/
    box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.3), 0 6px 24px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}


</style>
<template>
    <div class="main">
        <div class="main2">
            <MyHeader @addTodo="addTodo"/>
            <MyList :todos="todos" class="list"/>
            <MyFooter :todos="todos"
                      @checkAllTodo="checkAllTodo" @deleteAllTodo="deleteAllTodo"/>
        </div>
    </div>
</template>

<script>
import pubsub from "pubsub-js";
import MyHeader from "@/components/MyHeader.vue";
import MyList from "@/components/MyList.vue";
import MyFooter from "@/components/MyFooter.vue";

export default {
    name: 'App',
    components: {
        MyHeader, MyList, MyFooter
    },
    data() {
        return {
            //如果 本地存储有数据则使用。没有则初始化空数组，防止reduce计算属性找不到todos.length
            todos: JSON.parse(localStorage.getItem('todos')) || []
        }
    },
    watch: {
        todos: {
            deep: true,
            handler(newValue) {
                localStorage.setItem('todos', JSON.stringify(newValue))
            }
        }
    },
    methods: {
        addTodo(todoObj) {
            this.todos.unshift(todoObj)
        },
        checkTodo(todoObj) {
            this.todos.forEach((todo) => {
                    if (todo.id == todoObj.id) {
                        todo.done = !todo.done
                    }
                }
            )
        },
        updateTodo(todoObj, title) {
            this.todos.forEach((todo) => {
                    if (todo.id == todoObj.id) {
                        todo.title = title
                    }
                }
            )
        },
        deleteTodo(messageName, todoObj) {
            this.todos = this.todos.filter((todo) => {
                return todo.id !== todoObj.id
            })
        },
        checkAllTodo(value) {
            this.todos.forEach((todo) => {
                todo.done = value
            })
        },
        deleteAllTodo() {
            //用错了 把filter用成了forEach，而forEach只是个操作，不返回任何值也就是undefined
            //所以最终会将一个undefined赋值给todos
            this.todos = this.todos.filter((todo) => {
                return !todo.done
            })
        }
    },
    mounted() {
        this.$bus.$on('checkTodo', this.checkTodo)
        this.$bus.$on('updateTodo', this.updateTodo)
        this.pubId = pubsub.subscribe('deleteTodo', this.deleteTodo)
    },
    beforeDestroy() {
        this.$bus.$off('checkTodo')
        this.$bus.$off('updateTodo')
        pubsub.unsubscribe(this.pubId)
    }
}
</script>

