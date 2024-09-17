<template>
    <div class="products-page">
        <div class="header-image"></div>

        <div v-if="isMobile" class="category-select-container">
            <v-select v-model="selectedCategory" :items="categories" label="Select Category" class="category-select"
                outlined />
        </div>
        <v-card v-else class="categories-select-card">
            <v-tabs v-model="selectedCategory" align-tabs="start" color="black" class="categories-tabs">
                <v-tab :value="''" class="category-tab">All Categories</v-tab>
                <v-tab v-for="category in categories" :key="category" :value="category" class="category-tab">
                    {{ category }}
                </v-tab>
            </v-tabs>
        </v-card>
        <div class="products-grid">
            <v-row class="g-3">
                <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="4" md="3">
                    <div class="product-card">
                        <img :src="product.image" :alt="product.title" />
                        <div class="description">
                            <h2 class="product-title">{{ product.title }}</h2>
                            <p class="product-price">{{ product.price }}</p>
                        </div>

                        <v-btn :loading="loading" class="flex-grow-1 add-btn" height="48" variant="tonal" block
                            prepend-icon="mdi-plus" @click="addToCart(product)">
                            Add to Cart
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </div>
        <cart-drawer ref="cartDrawer" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFetch } from '@vueuse/core'
import CartDrawer from '~/components/CartDrawer.vue';
// Composibles
import useBreakpoint from '@/composables/useBreakpoints'

// Destructure the composible
const { isMobile } = useBreakpoint()

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref('');

const cartDrawer = ref(null);
const openCart = () => {
    cartDrawer.value.openCart();
};

const filteredProducts = computed(() => {
    return selectedCategory.value
        ? products.value.filter(product => product.category === selectedCategory.value)
        : products.value;
});

const fetchProducts = async () => {
    console.log('Fetching products');
    const { isFetching, error, data } = await useFetch('https://fakestoreapi.com/products').json()
    console.log('data', data);
    products.value = data.value;
};

const fetchCategories = async () => {

    const { data } = await useFetch('https://fakestoreapi.com/products/categories').json()

    categories.value = data.value;

};

const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    openCart();
};

onMounted(() => {
    fetchProducts();
    fetchCategories();
});
</script>

<style lang="scss">
.products-page {
    padding: 64px 0;

    .categories-select-card {
        height: 4rem;

        .categories-tabs {
            height: 4rem;

            .v-slide-group__content {
                margin-left: 5rem;
            }

            .category-tab {
                color: rgba(26, 26, 26, 0.5);
                height: 4rem;
            }
        }

    }

    .category-select-container {
        padding: 1rem 2rem;

        .category-select {
            .v-input__control {
                gap: 12px;
                border-radius: 8px;

                border: 1px solid rgba(26, 26, 26, 0.1)
            }

            .v-field__outline {
                display: none;
            }
        }
    }

    .header-image {
        width: 100%;
        height: 300px;
        /* Default height for larger screens */
        background-image: url("../assets/Hero.png");
        background-size: cover;
        background-position: center;
        /* Ensures the image is centered */
        background-repeat: no-repeat;
        /* Prevents repeating the image */

        /* For tablet screens and smaller (adjust height for responsiveness) */
        @media screen and (max-width: 1024px) {
            height: 250px;
        }

        /* For mobile screens (max-width: 600px) */
        @media screen and (max-width: 600px) {
            height: 200px;
        }

        /* For very small screens (like older phones) */
        @media screen and (max-width: 400px) {
            height: 150px;
        }
    }

    h1 {
        color: white;
        text-align: center;
        padding: 20px;
    }

    .category-filter {
        margin: 20px 0;
        text-align: center;

        select {
            padding: 10px;
            font-size: 16px;
        }
    }
}

.products-grid {
    padding: 2rem 2rem;
}

.product-card {
    text-align: center;
    height: 450px;
    padding: 24px;
    gap: 32px;
    border-radius: 12px;
    border: 1px;
    border: 1px solid rgba(26, 26, 26, 0.1);

    .description {
        text-align: center;
        margin-top: 8px;
        height: 25%;

        .product-title {
            font-family: Instrument Sans;
            font-size: 16px;
            font-weight: 600;
            line-height: 19.52px;
            text-align: left;
            color: rgba(26, 26, 26, 1);

        }

        .product-price {
            font-family: Instrument Sans;
            font-size: 16px;
            font-weight: 500;
            line-height: 19.52px;
            text-align: left;
            color: rgba(26, 26, 26, 0.5);

        }
    }


    img {
        width: 100%;
        max-height: 200px;
        min-height: 60%;
        object-fit: contain;
    }

    .add-btn {
        margin-top: auto;
    }

}
</style>
