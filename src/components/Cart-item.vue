<template>
    <ul>
        <li>Наименование: {{ good.product_name }}</li>
        <li>Цена: {{ good.price }}</li>
        <li>Количество:
            <button class="change-quantity" @click="minus(good)">-</button>
            {{ good.quantity }}
            <button class="change-quantity" @click="plus(good)">+</button>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "Cart-item",

        props: ['good'],

        methods: {
            plus(good) {
                this.$emit('plus', {plus: true, good});
            },

            minus(good) {
                this.$emit('minus', {minus: true, good});
            },
        },
    }
</script>

<style scoped>

</style>