<template>
    <div>
        <input type="text" class="goods-search" placeholder="Введите название товара" v-model="searchLine">
        <button class="button search-button" type="button" @click="search()">Искать</button>
        <button class="button reset-button" type="button" @click="resetFilters()" v-if="filteredGoods.length<goods.length">Сбросить фильтры</button>
    </div>
</template>

<script>
    export default {


        props: ['filteredGoods', 'goods'],

        data: function () {
            return {
                searchLine: '',
            }
        },


        methods: {

            search() {
                this.$emit('search', this.searchLine)
            },

            resetFilters() {
                this.$emit('reset')
            },

        }
    }
</script>

<style scoped>

</style>