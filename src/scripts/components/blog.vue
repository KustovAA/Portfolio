<template lang="pug">
    .tab-blog
        span.title Страница "Блог"
        .title.title__small Добавить запись
        form.form(@submit.prevent="sendArticle")
            input(type="text" placeholder='Название' v-model="name").input__field
            input(type="date" placeholder='Дата' v-model="date").input__field
            textarea.input__field.input__field--textarea(type="text" placeholder="Содержание" v-model="text")
            button(type="submit" ).add-btn 
                p Добавить
        ul.article__list
          li(v-for="article in articles").article__item
            p.name {{article.name}}
            .del(@click="deleteArticle(article._id)")
              p X
</template>

<script>
import moment from 'moment';

export default {
  data: () => {
    return {
      moment: moment,
      name: '',
      date: moment(new Date(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
      text: '',
      msgblog: '',
      articles: null
    };
  },
  methods: {
    sendArticle() {
      this.axios({
        method: 'POST',
        url: 'http://localhost:3000/api/blog',
        data: {
          name: this.name,
          date: this.date,
          text: this.text
        }
      }).then(rs => {
        this.msgblog = rs.data.status;
        this.name = '';
        this.text = '';
      });
      this.mounted();
    },
    deleteArticle(id) {
      this.articles = this.articles.filter(el => {
        if (el._id !== id) return true;
        else return false;
      });
      this.axios.delete(`http://localhost:3000/api/blog/${id}`);
    }
  },
  mounted: function() {
    this.axios.get('http://localhost:3000/api/blog').then(rs => {
      this.articles = rs.data.articles;
    });
  }
}
</script>

<style lang="scss" scoped src='styles/admin/blog-worksVue.scss'>
    
</style>