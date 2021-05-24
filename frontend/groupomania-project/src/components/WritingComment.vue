<template>
    <div class="col-10 mx-auto">
        <textarea class="form-control" id="content-comment" v-model="content" name="comment" placeholder="Que voulez-vous dire ?"></textarea>
        <button class="btn btn-danger" @click.prevent="postComment">Commenter</button>
    </div>
</template>

<script>
// import axios from 'axios';
// import { token } from '../mixins/token';
import {mapActions} from 'vuex';

export default {
    name:  "WritingComment",
    data() {
        return {
            content: ""
        }
    },
    methods: {
        ...mapActions(['createComment']),
        postComment(){
            let publicationId = localStorage.getItem('publicationId')
            const newComment = {
                content: this.content,
                publicationId: publicationId
            }
            this.createComment(newComment)
            this.content = "";
        }
        // createComment() {
        //     const comment = {
        //         content: this.content,
        //         publicationId: localStorage.getItem('publicationId')
        //     }
        //     axios.post('http://localhost:3000/api/comments', comment, {
        //          headers: {
        //             'Authorization': 'Bearer ' + token
        //         }
        //     })
        //     .then(() => this.$router.push({ name: 'comments' }))
        //     .catch(error => console.log(error))
        // }
    }
}
</script>

<style scoped>
.col-12 {
    width: 500px;
    margin-left: -250px;
}
.col-6 {
    padding: 0px;
}
textarea {
    height: 150px;
    border-radius: 10px;
    border-color: rgba(175, 174, 174, 0.282);
    margin-bottom: 20px;
}
</style>