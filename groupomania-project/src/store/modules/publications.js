import axios from 'axios';

const state = {
    publications: []
};

const getters = {
    allPublications: state => state.publications
};

const actions = {
    fetchPublications({ commit }) {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:3000/api/publications', {
            headers: {
                'Authorization' : 'Bearer '+token
            }
        }).then(response => {
            commit('setPublications', response.data);
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
    },

    deletePublication({ commit }, publication) {
        const admin = localStorage.getItem('admin')
        if(admin == "true") {
            const token = localStorage.getItem('token')
            axios.delete(`http://localhost:3000/api/publications/${publication.id}`, {
                headers: {
                    'Authorization' : 'Bearer '+token
                }
            }).then(publicationDeleted => {
                if(publicationDeleted) {
                    commit('deletedPublication', publication)
                }
            }).catch(error => console.log(error))
        }
        
    }
};

const mutations = {
    setPublications: (state, publications) => state.publications = publications,
    likedPublication: (state, publication) => {
        const publicationId = JSON.parse(publication.config.data)
        if(publication.status === 200){
            const goodPublication = state.publications.find(p => p.id === publicationId.id);
            goodPublication.c--
            goodPublication.userLike = false
        }else{
            const goodPublication = state.publications.find(p => p.id === publicationId.id);
            goodPublication.c++
            goodPublication.userLike = true
        }
    },
    deletedPublication: (state, publication) => {
        const goodPublication = state.publications.find(p => p.id === publication.id);
        let index = state.publications.indexOf(goodPublication)
        if(index > -1) {
            state.publications.splice(index, 1)
        }
    }
};

export default {
    state, getters, actions, mutations
}