<template>
    <div class="bar-container">
        <v-app-bar app>
            <v-container>
                <v-row justify="space-between" align="center">
                    <v-col cols="auto">
                        <h3 class="logo">Voxel Store</h3>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn icon @click="openCart">
                            <v-icon>mdi-cart</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
        <cart-drawer ref="cartDrawer" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CartDrawer from './CartDrawer.vue';


const cartDrawer = ref(null);
const openCart = () => {
    cartDrawer.value.openCart();
};

onMounted(async () => {
    nextTick(() => {
        console.log('Header mounted');
    });

});
</script>

<style scoped>
.logo {
    font-weight: bold;
    font-size: 1.5rem;
    margin: 0;
}
</style>