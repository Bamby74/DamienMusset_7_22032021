<template>
    <div class="postCard">
        <div class="row" v-for="publication in allPublications" :key="publication.id">
            <Publication :publication="publication" />
        </div>
    </div>
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
    methods: {
        ...mapActions(['fetchPublications','checkNavButton']),
        
    },
    computed: mapGetters(['allPublications']),
    created() {
        this.fetchPublications();
        this.checkNavButton();
    }
}
</script>

<style scoped>
</style>