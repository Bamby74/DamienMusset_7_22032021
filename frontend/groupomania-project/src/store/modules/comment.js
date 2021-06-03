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
            let newComment = createdComment.data
            axios.get('http://localhost:3000/api/auth/profil', {
                headers: { 
                    'Authorization' : 'Bearer '+token
                }
            })
            .then((user) => {
                newComment.username = user.data.username
                commit('addComment', newComment)
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
        
    },
    deleteComment({commit}, comment) {
        const admin = localStorage.getItem('admin')
        if(admin === 'true') {
            const token = localStorage.getItem('token')
            axios.delete(`http://localhost:3000/api/comments/${comment.id}`, {
                headers: { 
                    'Authorization' : 'Bearer '+token
                }
            }).then((commentDeleted) => {
               if(commentDeleted) {
                    commit('deletedComment', comment)
               }
            })
        }
        
    }
};

const mutations = {
    setComments: (state, comments) => state.comments = comments,
    addComment: (state, comment) => state.comments.push(comment),
    deletedComment: (state, comment) => {
        const goodComment = state.comments.find(c => c.id === comment.id);
        let index = state.comments.indexOf(goodComment)
        if(index > -1) {
            state.comments.splice(index, 1)
        }
    }
};

export default {
    state, getters, actions, mutations
}