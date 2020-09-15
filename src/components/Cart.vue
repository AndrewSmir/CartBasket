<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="cart-container">
                <div>
                    <div class="modal-header">
                        <p>Ваши покупки:</p>
                    </div>

                    <cart-item class="cart-item" v-for="good in cartGoods" :good="good" :key="good.product_id"
                               @plus="plus" @minus="minus"></cart-item>

                    <div class="modal-footer">
                        <p>Общая стоимость: {{ totalPrice }}</p>
                        <button class="button clear-cart" @click="clearCart()">
                            Очистить корзину
                        </button>
                        <button class="button close-cart" @click="$emit('close')">
                            Закрыть корзину
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import cartItem from "./Cart-item.vue"

    export default {
        components: {
            cartItem: cartItem,
        },

        data: function () {
            return {
                cartGoods: [],
            }
        },

        mounted() {
            this.makeGETRequest(`/cart`, (goods) => {
                this.cartGoods = JSON.parse(goods);
            });
        },

        methods: {

            clearCart() {
                this.$emit('clear', {clear: true});
                this.cartGoods = [];
            },

            makeGETRequest(url, callback) {

                let xhr;

                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        callback(xhr.responseText);
                    }
                }

                xhr.open('GET', url, true);
                xhr.send();
            },

            plus(data) {
                this.$emit('plus', data);//Отправляем данные в родительский компонент app

                //Отображение корзины на фронт части
                if (this.cartGoods.find(el => el.product_id === data.good.product_id)) {
                    this.cartGoods.find(el => el.product_id === data.good.product_id).quantity++
                }
            },

            minus(data) {
                this.$emit('minus', data);

                if (this.cartGoods.find(el => el.product_id === data.good.product_id)) {
                    this.cartGoods.find(el => el.product_id === data.good.product_id).quantity--
                }

                if (this.cartGoods.find(el => el.product_id === data.good.product_id).quantity < 1) {
                    this.cartGoods.splice(this.cartGoods.findIndex(el => el.product_id === data.good.product_id), 1)
                }
            },
        },

        computed: {
            totalPrice() {
                return this.cartGoods.reduce((sum, good) => sum + good.price * good.quantity, 0)
            }
        },
    }
</script>