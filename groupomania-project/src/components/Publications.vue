<template>
    <section class="postCard">
        <div class="row" v-for="publication in allPublications.slice().reverse()" :key="publication.id">
            <Publication :publication="publication" />
        </div>
        <span v-if="allPublications.length == 0" class=" col-6 mx-auto card border-success text-success">Soyez le premier à publier !</span>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Publication from './Publication';

export default {
    components: {
        Publication
    },
    name: 'Publications',
    props: ["publications"],
    computed: mapGetters(['allPublications']),
    methods: {
        ...mapActions(['fetchPublications','checkNavButton']),
    },
    created() {
        this.fetchPublications();
        this.checkNavButton();
    }
}
</script>

<style scoped>
</style>