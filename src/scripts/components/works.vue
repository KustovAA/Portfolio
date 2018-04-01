<template lang="pug">
    .tab-blog
        span.title Страница "Мои работы"
        .title.title__small Добавить работу
        form.form
            input(type="text", placeholder='Название проекта').input__field
            input(type="text", placeholder='Технологии').input__field
            .download
                .download__icon(style='background-image: url(assets/images/works-icon.png)')
                .download__text Зарузить картинку
            button.add-btn 
                p Добавить
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped src='styles/admin/blog-worksVue.scss'>
    
</style>