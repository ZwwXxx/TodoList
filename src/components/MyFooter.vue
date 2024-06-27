<style scoped>
.footer {
    position: sticky;
    top: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.deleteAll {
    background-color: #ffb6b9;
    border-radius: 10px;
    padding: 5px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
}

</style>

<template>
    <div class="footer">
        <div ><input type="checkbox" v-model="isAll"> DoneTotal <span style="font-weight: bold ">{{ doneTotal }}</span> \ Total <span style="font-weight: bold "> {{ total }}</span>
        </div>
        <div class="deleteAll" @click="handleDelete">DeleteAll</div>
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
            if (confirm('你是否要删除所有已完成的？'))
            {
                this.$emit('deleteAllTodo')
            }
        }
    }
}
</script>

