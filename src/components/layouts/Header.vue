<template>
    <header class="header-back">
        <div class="header container">
            <router-link to='/' class="header__left">
                <div class="header__left-logo">
                    <img src="@/assets/logo.png"/>
                </div>
                <p>Currency conversion</p>
            </router-link>
            <div class="header__right">
                <router-link to='/convert'>Конвертация</router-link>
                <Select
                    :data="currencies" 
                    :currentValue="currencies.find(elem => elem.value == getCurrency)" 
                    @sendValue="getValueCurrency"
                    placeholder="Валюта"
                    class="header__right-select"
                />
            </div>
        </div>
    </header>
</template>

<script>
import Select from '@/components/UI/Select.vue'
import { mapGetters, mapMutations } from 'vuex';
export default {
    components: {Select},
    data() {
        const currencies = [
            { id: 1, label: '$', value: 'usd'},
            { id: 2, label: '€', value: 'eur' },
            { id: 3, label: '₽', value: 'rub' }
        ];
        return {
            currencies
        }
    },
    computed: {
        ...mapGetters(['getCurrency'])
    },
    methods: {
        ...mapMutations(["UPDATE_CURRENCY", "GET_API_CURRENCIES"]),
        getValueCurrency(value) {
            this.UPDATE_CURRENCY(value.value);
        }
    },
    created() {
        this.GET_API_CURRENCIES();
    }
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-back {
        padding: 20px 0;
        box-shadow: 0 1px 0 0 rgba(17, 17, 17, .07);
    }
    &__left {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 24px;
        font-weight: 800;
        &-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            aspect-ratio: 1;
        }
    }
    &__right {
        display: flex;
        align-items: center;
        gap: 40px;
        a {
            font-size: 16px;
            font-weight: 400;
            color: #333;
            transition: color 0.3s ease;
            &:hover {
                color: #FFC300;
            }
        }
        &-select {
            min-width: 70px;
        }
    }
}
</style>