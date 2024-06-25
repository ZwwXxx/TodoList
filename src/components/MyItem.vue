<template>
    <div>
        <li>
            <span v-show="!todo.isEdit">{{ todo.title }}</span>
            <input type="checkbox" @change="handleCheck(todo)" :checked="todo.done"/>
            <button style="color: blue" v-show="!todo.isEdit" @click="handleEdit(todo)">编辑</button>
            <input type="text"
                   :value="todo.title"
                   v-show="todo.isEdit"
                   @blur="handleBlur(todo,$event)"
                   ref="inputTile">
            <button style="color: red" @click="handleDelete">删除</button>
        </li>
    </div>
</template>

<script>
import pubsub from 'pubsub-js'

export default {
    name: "MyItem",
    props: ['todo'],
    methods: {
        handleCheck(todo) {
            this.$bus.$emit('checkTodo', todo)
        },
        handleEdit(todo) {
            // eslint-disable-next-line no-prototype-builtins
            if (!todo.hasOwnProperty('todo')) {
                this.$set(todo, 'isEdit', true)
            } else {
                // eslint-disable-next-line vue/no-mutating-props
                todo.isEdit = true
            }
            this.$nextTick(()=>{
                this.$refs.inputTile.focus()
            })
        },
        handleBlur(todo, e) {
            if (!e.target.value.trim()) return alert('输入值不能为空')
            this.$bus.$emit('updateTodo', todo, e.target.value)
            todo.isEdit = false
        },
        handleDelete() {
            if (confirm('确定要删除吗？')) {
                pubsub.publish('deleteTodo', this.todo)
            }
        }
    }
}
</script>

<style scoped>

</style>
