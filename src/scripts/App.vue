<template lang="pug">
    .admin
        header.head
            app-header
        .tabs
            app-tabs(@tabNum='chooseActiveTab')
        .content(style='background-image: url(assets/images/admin-bg.png)')
            .tab1(v-show='tab1')
                tab-about
            .tab2(v-show='tab2')
                tab-blog
            .tab3(v-show='tab3')
                tab-works
            .overlay
</template>

<script>
import header from './components/header.vue'
import tabs from './components/tabs.vue'
import about from './components/about.vue'
import blog from './components/blog.vue'
import works from './components/works.vue'

export default {
    data() {
        return {
            tab1 : true,
            tab2 : false,
            tab3 : false
        }
    },
    methods: {
        chooseActiveTab(tabNum) {
            this.tabFirst = tabNum == 1;
            this.tabSecond = tabNum == 2;
            this.tabThird = tabNum == 3;
        }
    },
    computed : {
        tabFirst: {
            get() {
                return this.tab1
            },

            set(value) {
                this.tab1 = value;
            }
        },
        tabSecond: {
            get() {
                return this.tab2
            },

            set(value) {
                this.tab2 = value;
            }
        },
        tabThird: {
            get() {
                return this.tab3
            },

            set(value) {
                this.tab3 = value;
            }
        }
    },
    components: {
        appHeader : header,
        appTabs : tabs,
        tabAbout : about,
        tabBlog : blog,
        tabWorks : works
    }
}
</script>

<style lang="scss" scoped>
    .content {
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        position: relative;
    }

    .overlay {
        background: rgba(#fff, 0.8);
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .admin {
        display: flex;
        flex-direction: column;
    }
</style>

