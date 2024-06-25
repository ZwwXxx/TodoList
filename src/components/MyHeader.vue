<template>
    <div>
        <input v-model="inputTitle" placeholder="输入完回车确认" @keyup.enter="handleAdd"/>
    </div>
</template>

<script>
import {nanoid} from "nanoid";

export default {
    name: "MyHeader",
    data() {
        return {
            inputTitle: ''
        }
    },
    methods: {
        handleAdd() {
            if (!this.inputTitle.trim()) return alert('输入不能为空')
            const todoObj = {
                id: nanoid(),
                title: this.inputTitle,
                done: false
            }
            this.$emit('addTodo', todoObj)
            this.inputTitle = ''
        }
    }
}
</script>

<style scoped>

</style>
