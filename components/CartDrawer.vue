<template>
    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'right' : 'right'" temporary right
        width="500">
        <!-- Drawer Content for Cart -->
        <v-sheet class="pa-4">
            <!-- Header for Cart -->
            <v-row class="justify-space-between align-center">
                <v-col cols="auto">
                    <h4 class="ml-4">Your Cart ({{ cartItems.length }})</h4>
                </v-col>
                <v-col cols="auto">
                    <v-btn icon @click="drawer = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

            <!-- Cart Items List -->
            <v-list dense>
                <v-list-item v-for="(item, index) in cartItems" :key="item.id" class="cart-item">
                    <!-- Product Image -->
                    <v-list-item-avatar class="cart-item-avatar">
                        <v-img :src="item.image" width="100" />
                    </v-list-item-avatar>

                    <!-- Product Title and Price -->
                    <v-list-item-content class="cart-item-content">
                        <v-list-item-title class="cart-item-title">{{ item.title }}</v-list-item-title>
                        <v-list-item-subtitle>
                            <span>${{ item.price.toFixed(2) }}</span>
                            <span @click="removeItem(index)" class="remove-btn">Remove</span>
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <!-- Remove Button -->
                    <!-- <v-list-item-action>
                        <span @click="removeItem(index)" class="remove-btn">Remove</span>
                    </v-list-item-action> -->
                </v-list-item>
            </v-list>

            <!-- Total and Checkout Button -->
            <v-divider class="my-4"></v-divider>

            <div class="d-flex justify-space-between total">

                <span>Total</span>


                <span>${{ totalPrice.toFixed(2) }}</span>

            </div>

            <v-btn class="mt-4 checkout-btn" color="primary" block @click="proceedToCheckout">
                Continue to Checkout
            </v-btn>
        </v-sheet>
    </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue';

// Reactive state to control drawer visibility
const drawer = ref(false);


const cartItems = ref([]);

// Computed property to calculate total price
const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price, 0);
});

// Function to remove an item from the cart
const removeItem = (index) => {
    cartItems.value.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
};

// Proceed to checkout functionality (can be modified for actual usage)
const proceedToCheckout = () => {
    alert('Proceeding to checkout...');
};

function openCart() {
    drawer.value = true;
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartItems.value = JSON.parse(savedCart);
    }
};

function closeCart() {
    drawer.value = false;
};

defineExpose({
    openCart,
    closeCart
});
</script>

<style lang="scss">
.cart-item {
    align-items: center;
    margin-bottom: 2rem;

    .v-list-item__content {
        display: flex;

        .cart-item-content {
            padding-left: 16px;
            flex-grow: 1;
        }

        .cart-item-title {
            font-size: 16px;
            text-wrap: balance;
            width: 14rem;

        }

        .v-list-item-subtitle {
            display: flex;
            font-size: 14px;
            color: #666;
            justify-content: space-between;
        }
    }

    .cart-item-avatar {
        display: block;
        width: 102px;
        height: 102px;
        border-radius: 8px;
        overflow: hidden;
        padding: 16px;
        gap: 10px;
        border-radius: 8px;
        border: 1px;
        opacity: 0px;
        border: 1px solid rgba(26, 26, 26, 0.1);
        background: rgba(255, 255, 255, 1);


    }

    .remove-btn {
        cursor: pointer;
        color: rgba(26, 26, 26, 0.5);

    }
}

.total {
    font-family: Instrument Sans;
    font-size: 22px;
    font-weight: 600;
    line-height: 26.84px;
    text-align: left;

}

.checkout-btn {
    width: Fixed (396px)px;
    height: 59px !important;
    padding: 10px;
    gap: 10px;
    border-radius: 8px;
    opacity: 0px;
    background:
        linear-gradient(0deg, #462DDF, #462DDF);

}

.v-list-item {
    padding: 8px 0;
}

.v-btn:hover {
    background-color: rgba(0, 0, 0, 0.08);
}
</style>