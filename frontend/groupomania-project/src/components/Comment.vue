<template>
    <div class="col-10 mx-auto ">
        <div class="col card card-body">
            <div class="d-flex justify-content-between">
                <h6>{{ comment.username}}</h6>
                <svg v-if="userAdmin" id="rubish" @click="deletedComment" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </div>
            <p class="card-text text-light">{{ comment.content }}</p>
        </div>
        <p class="col-6">{{ setDate(comment.updatedAt) }}</p>
    </div>
</template>

<script>
import { setDate } from '../mixins/date';
import { mapActions } from 'vuex';

export default {
    name: 'Comment',
    props: ['comment'],
    mixins: [setDate],
    data() {
        return {
            userAdmin: false
        }
    },
    methods: {
        ...mapActions(['deleteComment']),
        deletedComment() {
            this.deleteComment(this.comment)
        },
        adminLow() {
            if(localStorage.getItem('admin') === "true") {
                this.userAdmin = true
            }
        },
    },
    created() {
        this.adminLow()
    }
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
#rubish {
    margin-left: 10px;
    color: white;
    cursor: pointer;
    margin-right: 0px;
}
</style>