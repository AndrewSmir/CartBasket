<template>
    <div class="wrapper">
        <header>
            <search :filtered-goods="filteredGoods" :goods="goods" @search="searchItem" @reset="clearFilters"></search>
            <button class="button cart-button" type="button" @click="openCart()">Корзина</button>
        </header>
        <main>
            <cart v-if="isVisibleCart" @close="isVisibleCart = false" @clear="clearCart" @minus="minusQuantity"
                  @plus="plusQuantity"></cart>
            <goods-list :goods="filteredGoods" @add-good="addGood"></goods-list>
        </main>
    </div>
</template>

<script>
    import goodsList from "./components/Goods-list.vue";
    import search from "./components/Search.vue";
    import cart from "./components/Cart.vue"

    export default {
        el: '#app',

        components: {
            goodsList: goodsList,
            search: search,
            cart: cart,
        },

        data() {
            return {
                goods: [],
                filteredGoods: [],
                isVisibleCart: false
            }
        },

        mounted() {
            this.makeGETRequest(`/catalogData`, (goods) => {
                this.goods = JSON.parse(goods);
                this.filteredGoods = JSON.parse(goods);
            });
        },

        methods: {

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

            makePOSTRequest(url, data, callback) {
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

                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                xhr.send(data);
            },

            openCart() {
                this.isVisibleCart = true;
            },

            addGood(good) {
                this.makePOSTRequest('/addToCart', JSON.stringify(good), response => console.log(response))
            }, //good получаем из дочернего компонента good-list, в good-list значение good передаем из good-item

            clearCart(data) {
                this.makePOSTRequest('/addToCart', JSON.stringify(data), response => console.log(response))
            },

            plusQuantity(data) {
                this.makePOSTRequest('/addToCart', JSON.stringify(data), response => console.log(response))
            },

            minusQuantity(data) {
                this.makePOSTRequest('/addToCart', JSON.stringify(data), response => console.log(response))
            },

            searchItem(value) {
                const regexp = new RegExp(value, 'i');
                this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name))
            },

            clearFilters() {
                this.filteredGoods = this.goods;
            }
        },
    }
</script>