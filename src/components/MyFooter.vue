<template>
    <div v-show="total">
        <input type="checkbox" v-model="isAll"> 已完成{{ doneTotal }} \ 总数 {{ total }}

        <button style="color: red" @click="handleDelete">删除所有已完成的</button>

    </div>

</template>

<script>
export default {
    name: "MyFooter",
    props: ['todos'],
    computed: {
        total() {
            return this.todos.length
        },
        doneTotal() {
            return this.todos.reduce((pre, todo) => {
                return pre + (todo.done ? 1 : 0)
            }, 0)
        },
        isAll: {
            get() {
                return this.total == this.doneTotal
            },
            set(value) {
                this.$emit('checkAllTodo', value)
            }
        }
    },
    methods: {
        handleDelete() {
            confirm('你是否要删除所有已完成的？')
            {
                this.$emit('deleteAllTodo')
            }
        }
    }
}
</script>

<style scoped>

</style>
