<style scoped>
.title {
    font-weight: bolder;
    font-size: 30px;
    text-align: center;
    padding: 20px;
}

.inputBody {
    width: 100%;
    position: relative;
    left: 25%;
}

.inputBody input {
    border-radius: 10px;
    outline: none;
    padding: 10px;
    width: 50%;
    border: 2px solid #6e0816;
    background: #bbded6;
    font-weight: bolder;
}

.inputBody span {
    position: absolute;
    color: #a67f8a;
    top: 0;
    left: 0;
    padding: 10px;
    font-size: 0.8em;
    font-weight: 900;
    pointer-events: none;
    transition: all  0.5s;
}

.inputBody input:valid ~ span,
.inputBody input:focus ~ span {
    transform: translateX(10px) translateY(-7px);
    font-size: 0.8em;
    font-weight: bold;
    color: #c5450d;
    padding: 0 10px;
    background-color: #bbded6;
}

.inputBody input:focus,
.inputBody input:valid {
    border: 2px solid #c5450d;
}


</style>

<template>
    <div>
        <div class="title">TodoList</div>
        <div class="inputBody">
            <input v-model="inputTitle" @keyup.enter="handleAdd" required/>
<!--            <span>请输入待办事项</span>-->
            <span>Please enter the to-do list</span>
        </div>
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

