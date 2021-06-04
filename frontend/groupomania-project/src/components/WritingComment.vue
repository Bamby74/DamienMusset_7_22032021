<template>
    <section class="row">
        <article class="col-10 mx-auto">
            <div class="alert-danger">
                <p v-if="(!$v.content.required && $v.content.dirty) || this.submitStatus == 'ERROR'">Vous ne pouvez faire un commentaire sans écrire au minimum une lettre !</p>
            </div>
            <div v-if="(!$v.content.maxLength && this.submitStatus == 'ERROR')" class="alert-danger">
                <p>Vous avez atteint le nombre maximales de 250 caractères</p>
            </div>
            <textarea class="form-control" id="content-comment" v-model="$v.content.$model" name="comment" placeholder="Que voulez-vous dire ?" required @input="changeSubmitStatus"></textarea>
            <button data-message=" bouton pour valider le comentaire" class="btn btn-danger" @click.prevent="submit">Commenter</button>
        </article>
    </section>
</template>

<script>
import {mapActions} from 'vuex';
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
    name:  "WritingComment",
    data() {
        return {
            content: "",
            submitStatus: null
        }
    },
    validations: {
        content: {
            required,
            maxLength: maxLength(250)
        }
    },
    methods: {
        ...mapActions(['createComment']),
        submit() {
            this.$v.$touch()
            if(this.$v.$invalid) {
                this.submitStatus = 'ERROR'
            } else {
                let publicationId = localStorage.getItem('publicationId')
                const newComment = {
                    content: this.content,
                    publicationId: publicationId
                }
                this.createComment(newComment)
                this.submitStatus = 'PENDING'
                setTimeout(() => {
                    this.submitStatus = 'OK'
                },250)
                window.scroll(0,0)
                this.content = "";
            }
        },
        changeSubmitStatus() {
            return this.submitStatus = null
        }
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
    border-color: rgba(250, 24, 24, 0.282);
    margin-bottom: 20px;
}
textarea:focus {
    outline: 0 none;
    border-color: rgb(147, 17, 43, 0.282);
    box-shadow: 0 0 0 0.2rem rgba(147, 17, 43, 0.282)
}
.alert-danger {
    border-radius: 10px;
    margin: 10px 0px;
}
</style>