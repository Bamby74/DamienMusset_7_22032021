<template>
    <div class="col-10 mx-auto ">
        <div class="col card card-body">
            <h6>{{ comment.username}}</h6>
            <p class="card-text text-light">{{ comment.content }}</p>
        </div>
        <p class="col-6">{{ setDate(comment.updatedAt) }}</p>
    </div>
</template>

<script>
import { setDate } from '../mixins/date';
export default {
    name: 'Comment',
    props: ['comment'],
    mixins: [setDate]
}
</script>

<style scoped>
.col-6 {
    padding: 0px;
}
.card {
    background-color: rgba(199, 17, 46);
    margin-top: 5px;
    margin-bottom: 5px;
    height: auto;
    width: fit-content;
    text-align: left;
    padding: 5px;
    border-radius: 10px;
}
h6 {
    color: white;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: bold;
    margin: 0px;
    font-size: 0.6em;
}
p.col-6 {
    font-size: 0.7em;
    font-style: italic;
    text-align: left;
    margin-bottom: 5px;
}
</style>