import axios from 'axios';

const state = {
    comments: []
};

const getters = {
    allComments: state => state.comments
};

const actions = {
    getComments({commit}) {
        const token = localStorage.getItem('token')
        let publicationId = localStorage.getItem('publicationId')
        axios.get(`http://localhost:3000/api/comments/${publicationId}`, {
            headers: {
                'Authorization' : 'Bearer '+token
            }
        })
        .then(allComments => {
            commit('setComments', allComments.data[0]);
        })
        .catch(error => console.log(error))
    },
    createComment({commit}, comment) {
        const token = localStorage.getItem('token')
        axios.post('http://localhost:3000/api/comments', comment, {
            headers: {
                'Authorization' : 'Bearer '+token
            }
        })
        .then(createdComment => {
            console.log(createdComment)
            let newComment = createdComment.data
            axios.get('http://localhost:3000/api/auth/profil', {
                headers: { 
                    'Authorization' : 'Bearer '+token
                }
            })
            .then((user) => {
                console.log(user)
                newComment.username = user.data.username
                console.log(newComment)
                commit('addComment', newComment)
            })
            .catch(error => console.log(error))
            // commit('addComment', newComment)
        })
        .catch(error => console.log(error))
        
    }
};

const mutations = {
    setComments: (state, comments) => state.comments = comments,
    addComment: (state, comment) => state.comments.unshift(comment)
};

export default {
    state, getters, actions, mutations
}