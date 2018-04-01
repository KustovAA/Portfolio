<template lang="pug">
    .tab-about
        span.title Страница "обо мне"
        - 
            var items = [
                {
                    title: 'Frontend',
                    skills: ['HTML5', 'CSS3', 'JavaScript']
                },
                {
                    title: 'Backend',
                    skills: ['Node.js', 'Mongo.db', 'PHP', 'MySQL']
                },
                {
                    title: 'Workflow',
                    skills: ['Git', 'Gulp', 'Webpack']
                }
            ]
        ul.list
            each item in items
                li.item
                    .title.title__name= item.title
                    ul.skills
                        each skill in item.skills
                            li.skill
                                .title.title__skill= skill
                                .skill__value
                                    input(type="number").skill__input
                                    p %
        .save-btn 
            p Сохранить
        
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped src='styles/admin/aboutVue.scss'>

</style>
