<style scoped>


.todoBody {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 80%;
    margin-bottom: 15px;
    margin-top: 15px;
    border-bottom: solid 2px darkred;
}

.titleInput {
    font-weight: 600;
    font-size: 15px;
}

.flex {
    display: flex;
}


.edit {
    border-radius: 10px;
    background-color: #61c0bf;
    padding: 5px;
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;

}

.delete {
    border-radius: 10px;
    background-color: #ffb6b9;
    padding: 5px;
    margin-left: 5px;
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
}

label input {
    appearance: none;
}

label {
    position: relative;
}

label span {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 30px;
    background: rgb(231, 49, 49);
    box-shadow: 0 10px 50px rgb(216, 50, 50);
    cursor: pointer;
    border-radius: 15px;
}
label input:checked~span{
    background: rgb(102, 150, 31);
    box-shadow: 0 10px 50px  rgb(128, 180, 50);
}
label span i{
    position: absolute;
    background: #fff;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    top: 4px;
    left: 4px;
    transition: 0.1s;
}
label input:checked~span i{
    left: 34px;
}

label span i::before{
    position: absolute;
    background: rgb(231, 49, 49) ;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    left: 4px;
    top: 4px;
    content: '';
    box-shadow: 8px 0 0  rgb(231, 49, 49) ;
}
label input:checked ~span  i::before{
    background: rgb(102, 150, 31) ;
    box-shadow: 9px 0 0  rgb(102, 150, 31) ;
}

label span i::after{
    position: absolute;
    background-color: rgb(231, 49, 49);
    width: 10px;
    height: 2px;
    left: 6px;
    bottom: 5px;
    content: '';
    transition: 0.1s;
}
label input:checked ~span  i::after{
    background: rgb(102, 150, 31) ;
    height: 6px;
    bottom: 4px;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    box-shadow: 0 0 0  rgb(102, 150, 31) ;
}
</style>

<template>
  <!--        <li>-->
    <div style="display: flex;justify-content: center">
        <div class="todoBody">
            <div style="min-width: 100px;display: flex">
                <label>
                    <input type="checkbox" @change="handleCheck(todo)" :checked="todo.done"/>
                    <span><i></i></span>
                </label>
                <div style="margin-left: 66px">
                    <span v-show="!todo.isEdit" class="titleInput">{{ todo.title }}</span>
                    <input type="text"
                           class="titleInput"
                           :value="todo.title"
                           v-show="todo.isEdit"
                           @blur="handleBlur(todo,$event)"
                           @keydown.enter="handleBlur(todo, $event)"
                           ref="inputTile">
                </div>
            </div>

            <div class="flex ">
                <div class="edit" v-show="!todo.isEdit" @click="handleEdit(todo)">Edit</div>
                <div class="delete" @click="handleDelete">Delete</div>
            </div>
        </div>
    </div>
  <!--        </li>-->
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
            this.$nextTick(() => {
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

