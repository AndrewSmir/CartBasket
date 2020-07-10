<template>
    <div class="goods-list">

        <div v-if="goods.length === 0">
            <p>Нет данных</p>
        </div>

        <goods-item v-else v-for="good in goods" :good="good" :key="good.id_product"
                    @addGood="addGood"></goods-item>
    </div>
</template>

<script>
    import goodsItem from "./Goods-item.vue";

    export default {
        components: {
            goodsItem: goodsItem,
        },

        props: ['goods'],

        methods: {
            addGood(good) {
                this.$emit('add-good', good)
            }, //Передаем данные в родительский компонент App
        }
    }
</script>

<style scoped>

</style>