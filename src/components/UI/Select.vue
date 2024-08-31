<template>
    <div class="UISelect" v-click-outside="closeOpener">
        <div class="UISelect__main" @click="opener = !opener" :class="{'UISelect__main-active': opener}">
            <p class="UISelect__main-title" v-if="currentValue && Object.keys(currentValue).length > 0">{{currentValue?.label}}</p>
            <p class="UISelect__main-placeholder" v-else>{{ placeholder }}</p>
            <img src="@/assets/icons/dropdown.svg" :style="opener ? 'rotate: 180deg;' : 'rotate: 0deg;'"/>
        </div>
        <transition name="openSelect">
            <div class="UISelect__content" v-if="opener">
                <p class="UISelect__content-item" :class="{'UISelect__content-item-active': currentValue.id == item.id}" @click="sendValue(item)" v-for="item in data" :key="item.id">{{item?.label}}</p>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: ['data', 'currentValue', 'placeholder'],
    data() {
        return {
            opener: false
        }
    },
    methods: {
        sendValue(value) {
          this.$emit('sendValue', value)
        },
        closeOpener() {
            this.opener = false;
        }
    }
}
</script>

<style scoped lang="scss">
.UISelect {
    position: relative;
    &__main {
        background: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 8px 12px;
        border: 1px solid #BDBDBD;
        border-radius: 5px;
        transition: all 0.3s ease;
        p {
            transition: all 0.3s ease;
        }
        &-title {
            font-size: 14px;
            font-weight: 500;
            color: black;
            overflow: initial;
        }
        &-placeholder {
            font-size: 14px;
            font-weight: 400;
            color: #bbb9b9;
            overflow: initial;
        }
        img {
            width: 12px;
            aspect-ratio: 1;
            rotate: 0deg;
            transition: all 0.3s ease;
        }
        &-active {
            border: 1px solid #FFC300;
            p {
                color: #FFC300;
            }
            img {
                filter: brightness(0) saturate(100%) invert(73%) sepia(85%) saturate(1212%) hue-rotate(357deg) brightness(99%) contrast(106%);
            }
        }
    }
    &__content {
        border-radius: 5px;
        overflow: hidden;
        position: absolute;
        z-index: 1;
        top: 105%;
        width: 100%;
        background: white;
        box-shadow: 0px 0px 10px 0px #00000026;
        &-item {
            font-size: 14px;
            cursor: pointer;
            padding: 8px 12px;
            transition: all 0.3s ease; 
            border-bottom: 1px solid #E3E5E6;
            &-active {
                background: #FFC300;
                color: white;
            }
            &:hover {
                color: white;
                background: #FFC300;
            }
        }
    }
}
</style>