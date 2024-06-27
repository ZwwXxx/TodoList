<template>
    <div class="listBody">
        <MyItem v-for="todoObj in todos"
                :key="todoObj.id"
                :todo="todoObj"
        ></MyItem>
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
.listBody {
    background-color: #a9d3d1;
    margin-top: 20px;
    height: 500px;
    overflow-y: auto;
    border-radius: 10px;
}

.listBody::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

.listBody::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
    border-radius: 8px;
}

</style>
