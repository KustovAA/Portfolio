<template lang="pug">
    .tabs
        ul.list
            each item, ndx in ['Обо мне', 'Блог', 'Мои работы']
                case ndx
                    default
                        li(@click='makeActive($event)' data-tab= `${ndx+1}`).item= item
                    when 0
                        li(@click='makeActive($event)' data-tab= `${ndx+1}`).item.active= item
</template>

<script>
export default {
    methods: {
        makeActive(event) {
            let siblings = [...event.target.parentElement.children].filter(n => n != event.target)
            event.target.classList.add('active');
            siblings.forEach(item => {
                item.classList.remove('active');
            });
            this.$emit('tabNum', event.target.dataset.tab);
        }
    }
}
</script>

<style lang="scss" scoped src='styles/admin/tabs.scss'></style>