<template lang="pug">
    .tab-blog
        span.title Страница "Блог"
        .title.title__small Добавить запись
        form.form
            input(type="text", placeholder='Название').input__field
            input(type="text", placeholder='Дата').input__field
            textarea.input__field.input__field--textarea(type="text" placeholder="Содержание")
            button.add-btn 
                p Добавить
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped src='styles/admin/blog-worksVue.scss'>
    
</style>