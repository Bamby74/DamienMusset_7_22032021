<template>
    <div>
        <article v-if="publication" class="card col-10 mx-auto" :style="{opacity: opacity}">
            <div class="card-header">
                <div class="d-flex justify-content-between">
                    <h5>{{ publication.username }}</h5>
                    <svg v-if="userAdmin" id="rubish" @click.prevent="disconnect = true, opacity -= 0.9" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </div>
                <p class="card-text" >{{ setDate(publication.updatedAt) }}</p>
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ publication.title }}</h5>
                <p class="card-text">{{ publication.content }}</p>
                <img v-if="publication.attachment && findTypeFile() == 'image'" :src="publication.attachment" alt="image de publication">
                <video v-else-if="publication.attachment &&  findTypeFile() == 'video'" :src="publication.attachment" alt="video de la publication" controls></video>
                <div class="icones-nav row justify-content-around">
                    <div class="col-4 text-center">
                        <svg @click="likedPublication"  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-up-fill" :class="isLikeByUser()" viewBox="0 0 16 16">
                            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                        </svg>
                        <span>{{ (publication.c === 0 || publication.c == null) ? "0" : publication.c}}</span>
                    </div>
                    <div class="col-4 text-center">
                        <svg @click="getComments" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chat-dots-fill text-danger" viewBox="0 0 16 16">
                            <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                        </svg>
                        <span>{{ (publication.countcoments === 0 || publication.countcoments == null)? "0": publication.countcoments}}</span>
                    </div>
                </div>
            </div>
        </article>
        <ValidationBox  v-if="disconnect" @delete-box="disconnect = false, opacity = 1" @delete-page="deletePublications" text=" Êtes-vous sûr(e) de vouloir supprimer cette publication ?" requestYes="Oui" requestNo="Non"/>
    </div>
</template>

<script>
// import axios from 'axios'
import { mapActions } from 'vuex';
import{ setDate } from "../mixins/date";
import ValidationBox from '../components/ValidationBox';

export default {
    components: {
        ValidationBox
    },
    name: "Publication",
    props: ["publication"],
    mixins: [setDate],
    data() {
        return {
            userAdmin: false,
            color: "",
            opacity: 1
        }
    },
    methods: {
        ...mapActions(['likePublication','deletePublication']),
        isLikeByUser() {
            if(this.publication.userLike) {
                 return this.color = "text-success"
            }
            return this.color = "text-danger"
        },
        likedPublication() {
            this.likePublication(this.publication)
        },
        getComments() {
            localStorage.setItem('publicationId', this.publication.id);
            this.$router.push("/comments")
        },
        findTypeFile() {
            const fileAttachment = this.publication.attachment
            if(fileAttachment) {
                const fileType = fileAttachment.split('.')
                let typeImage = ["jpeg","jpg","png","gif"]
                if(typeImage.indexOf(fileType[2]) !== -1) {
                    return "image"
                }
                let typeVideo = ["mp4","wov","avi","wmf"]
                if(typeVideo.indexOf(fileType[2]) !== -1) {
                    return "video"
                }
            }
        },
        adminLow() {
            if(localStorage.getItem('admin') === "true") {
                this.userAdmin = true
            }
        },
        deletedPublication() {
            this.deletePublication(this.publication)
        },
        deletePublications() {
            this.disconnect = true
            this.opacity -= 0.9
            this.deletedPublication()
        },
    },
    created() {
        this.adminLow();
    },
}
</script>

<style scoped>
.card {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0px;
    border-radius: 10px;
    box-shadow: 0px 0px 6px rgb(199, 17, 46)
}
.card-header, .card-body {
    text-align: left;
}
.card-header h5, #rubish {
    color: rgb(199, 17, 46);
}
.card-body {
    padding-bottom: 5px;
}
.postCard {
    margin-left: 0px;
}
svg {
    margin-right: 5px;
    cursor: pointer;
}
img,video {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 0px 4px black;
}
.icones-nav {
    margin-top: 10px;
}
span {
    position: relative;
    bottom: 3px
}
#rubish {
    margin-right: 0px;
}

</style>