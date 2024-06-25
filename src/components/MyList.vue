<template>
    <div>
        <ul>
            <MyItem v-for="todoObj in todos"
                    :key="todoObj.id"
                    :todo="todoObj"></MyItem>
        </ul>
    </div>
</template>

<script>
import MyItem from "@/components/MyItem.vue";

export default {
    name: "MyList",
    props: ['todos'],
    components: {MyItem}

}
</script>

<style scoped>

</style>
