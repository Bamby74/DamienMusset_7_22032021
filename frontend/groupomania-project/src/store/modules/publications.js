import axios from 'axios';


const state = {
    publications: []
};

const getters = {
    allPublications: state => state.publications
};

const actions = {
    async fetchPublications({ commit }) {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:3000/api/publications', {
            headers: {
                'Authorization' : 'Bearer '+token
            }
        })
        commit('setPublications', response.data);
    },

    addPublications({ commit }, publication) {
        const token = localStorage.getItem('token')
        axios.post('http://localhost:3000/api/publications', publication, {
            headers: {
            'Authorization' : 'Bearer '+token
            }   
        }).then(newPublication => {
            newPublication.data.username = publication.username ;
            commit('newPublication', newPublication.data)
        }).catch(error => console.log(error))
    },

    likePublication({ commit }, publication) {
        const token = localStorage.getItem('token')
        axios.post(`http://localhost:3000/api/like/publications/${publication.id}`, publication, {
            headers: {
            'Authorization' : 'Bearer '+token
            }   
        }).then(publicationLiked => {
            commit('likedPublication', publicationLiked)
        }).catch(error => console.log(error))
    }
};

const mutations = {
    setPublications: (state, publications) => state.publications = publications,
    newPublication: (state, publication) => state.publications.unshift(publication),
    likedPublication: (state, publication) => {
        const publicationId = JSON.parse(publication.config.data)
        if(publication.status === 200){
            const goodPublication = state.publications.find(p => p.id === publicationId.id);
            goodPublication.c--
        }else{
            const goodPublication = state.publications.find(p => p.id === publicationId.id);
            goodPublication.c++
        }
    }
};

export default {
    state, getters, actions, mutations
}