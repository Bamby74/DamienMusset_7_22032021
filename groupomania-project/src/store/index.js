import Vue from "vue";
import Vuex from "vuex";
import publications from './modules/publications';
import navbar from './modules/navbar';
import comment from './modules/comment'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    publications,
    navbar,
    comment
  }
});
