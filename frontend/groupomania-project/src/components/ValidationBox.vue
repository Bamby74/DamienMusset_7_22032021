<template>
    <div class="container">
        <article class="col-6 confirmation-case mx-auto">
            <p>{{ text }}</p>
            <button data-message="Bouton oui" id="yes" class="btn btn-success" @click.prevent="positiveResponse">{{ requestYes }}</button>
            <button data- message="Bouton non" id="no" class="btn btn-danger" @click.prevent="negativeResponse">{{ requestNo }}</button>
        </article>
    </div>
</template>

<script>
export default {
    name: "ValidationBox",
    props: ['text', 'requestYes','requestNo'],
    methods: {
        negativeResponse() {
            this.$emit('delete-box')
        },
        positiveResponse() {
            this.$emit('delete-page')
        }
    }
}
</script>

<style scoped>
.confirmation-case {
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 25%;
  background: white;
  padding: 10px;
}
#yes, #no {
    margin: 0px 10px;
}
</style>