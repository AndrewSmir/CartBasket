<template>
    <div class="goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
        <button class="button addToCart" @click="addToCart(good)">Добавить</button>
    </div>
</template>

<script>
    export default {

        props: ['good'],

        methods: {
            addToCart(good) {
                this.$emit('addGood', good);
            }, //Передаем данные в родительский компонент goods-list
        }
    }
</script>
