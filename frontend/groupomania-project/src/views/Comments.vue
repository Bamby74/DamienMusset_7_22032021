<template>
    <div>
        <div class="row">
            <Publication :publication="publication"/>
        </div>
        <div class="row" v-for="comment in allComments" :key="comment.id">
            <Comment v-if="allComments" :comment="comment"/>
        </div>
        <div class="row">
            <WritingComment />
        </div>
        <p v-if="!allComments">Aucun commentaires encore laissé pour ce post ...</p>
    </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from 'vuex';
import Publication from "../components/Publication";
import WritingComment from "../components/WritingComment";
import Comment from "../components/Comment";
import { token } from "../mixins/token";

export default {
    name: "Comments",
    components: {
        Publication,
        Comment,
        WritingComment
    },
    data() {
        return {
            publication : this.Publication,
            content: ""
        }
    },
    props: ['comments'],
    computed: mapGetters(['allComments']),
    methods: {
        ...mapActions(['getComments', 'createComment']),
        getPublication() {
            let publicationId = localStorage.getItem('publicationId')
            axios.get(`http://localhost:3000/api/publications/comments/${publicationId}`, {
                headers: {
                'Authorization' : 'Bearer '+token
                }
            })
            .then(publicationFound => {
                this.publication = publicationFound.data[0][0]})
            .catch(error => console.log(error))
        },
        createComment() {
            let publicationId = localStorage.getItem('publicationId')
            const newComment = {
                content: this.content,
                publicationId: publicationId
            }
            this.createComment(newComment)
        }
    },   
    created() {
        this.getPublication();
        this.getComments();
    }
};
</script>

<style scoped>
#icone-writing {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 25px;
  height: 50px;
  width: 50px;
  line-height: 20px;
}
svg {
  position: relative;
  top: 2px;
}
</style>