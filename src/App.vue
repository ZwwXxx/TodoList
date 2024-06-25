<template>
    <div id="app">
        <MyHeader @addTodo="addTodo"/>
        <MyList :todos="todos"/>
        <MyFooter :todos="todos"
                  @checkAllTodo="checkAllTodo" @deleteAllTodo="deleteAllTodo"/>
    </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import MyList from "@/components/MyList.vue";
import MyFooter from "@/components/MyFooter.vue";
import pubsub from "pubsub-js";

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
            this.todos=this.todos.filter((todo) => {
                return !todo.done
            })
        }
    },
    mounted() {
        this.$bus.$on('checkTodo', this.checkTodo)
        this.$bus.$on('updateTodo', this.updateTodo)
        this.pubId=pubsub.subscribe('deleteTodo', this.deleteTodo)
    },
    beforeDestroy() {
        this.$bus.$off('checkTodo')
        this.$bus.$off('updateTodo')
        pubsub.unsubscribe(this.pubId)
    }
}
</script>

<style>

</style>
