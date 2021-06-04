<template>
    <main class="col-10 card mx-auto">
        <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="true" href="#">Créer une publication</a>
                </li>
                <router-link to="/publications">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                    </svg>
                </router-link>
            </ul> 
        </div>
        <form id="post" class="card-body form" enctype="multipart/form-data">
            <div class="mb-3">
                <span class=" form-control error alert-danger" v-if="validateForm">Vous ne pouvez poster une publication vide ...</span>
                <br/>
                <textarea class="form-control" id="title" name="title" rows="3" placeholder="Title..." v-model="title" @input="updateValidateForm"></textarea>
                <br />
                <textarea class="form-control" id="exampleFormControlTextarea1" name="content" rows="3" placeholder="Message..." v-model="content" @input="updateValidateForm"></textarea>
                <img id="image-preview" src="" class="img-fluid" alt="aperç de la photo de publication" v-show="fileImage" >
                <video v-show="fileVideo" width="100%" controls id="video-preview" src="" type="video/*" alt="aperçu de la video de publication"></video>
            </div>
            <div class="row-link justify-content-between">
                <a href="#" class="btn btn-danger" @click.prevent="post">
                    <svg id="custom-picture" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cursor-fill" viewBox="0 0 16 16">
                        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
                    </svg>
                    <p>Poster</p>
                </a>
                <input type="file" ref="file" id="image" name="file" accept="image/*,video/*" capture="user" @change="onFileSelected">
                <div class="btn btn-danger" @click="addPicture">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="35" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                    </svg>
                </div>
                <div class="btn btn-danger" id="close-picture" v-show="fileImage" @click="fileImage = ''">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="35" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                    </svg>
                </div>
            </div>
        </form>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    name:"WritingPublications",
    data() {
        return {
            title: "",
            content: "",
            fileImage:"",
            fileVideo: "",
            validateForm: ""
        }
    },
    methods: {
        post() {
            if(!this.title && !this.content & !this.fileImage && !this.fileVideo) {
                this.validateForm = true
            }else{
                const publication = {
                title: this.title,
                content: this.content,
                }
                const formData = new FormData();
                if(this.fileImage) {
                        formData.append('file', this.fileImage)
                    }
                if(this.fileVideo) {
                    formData.append('file', this.fileVideo)
                }
                formData.append('publication', JSON.stringify(publication))
                let token = localStorage.getItem('token')
                axios.post('http://localhost:3000/api/publications', formData, {
                    headers: {
                    'Authorization' : 'Bearer '+token
                    }   
                })
                .then(() => {
                    this.$router.push({ name: "publications" })
                })
                .catch(error => console.log(error))
                this.title = "",
                this.content = "",
                this.fileImage = "" ,
                this.fileVideo = "",
                this.validateForm = false  
            }
        },
        addPicture() {
            const realFileBtn = document.getElementById("image");
            realFileBtn.click()
        },
        onFileSelected(event) {
            const imageToPost = event.target.files
            if(imageToPost === 0) {
            console.log("Aucune image sélectionnée !")
            }else{
                if(imageToPost[0].type === ("image/jpeg" || "image/png" || "image/jpg" || "image/.gif")) {
                    let previewImage = document.getElementById('image-preview')
                    this.fileImage = imageToPost[0]
                    const reader = new FileReader()
                    reader.addEventListener("load", function() {
                        previewImage.setAttribute("src", this.result)
                    })
                    reader.readAsDataURL(this.fileImage)
                }else{
                    let previewVideo = document.getElementById('video-preview')
                    this.fileVideo = imageToPost[0]
                    const reader = new FileReader()
                    reader.addEventListener("load", function() {
                        previewVideo.setAttribute("src", this.result)
                    })
                    reader.readAsDataURL(this.fileVideo)
                }
                this.updateValidateForm()
            }
        },
        updateValidateForm() {
            return this.validateForm = ""
        }
    }
}
</script>

<style scoped>
.card {
    margin-left: 0px;
    padding: 0px;
}
.btn {
    display: flex;
    border-radius: 2em;
    width: auto;
    height: 50px;
    line-height: 35px;
}
.bi-cursor-fill {
    position: relative;
    top: 5px;
}
a p {
    margin-left: 10px;
}
.row-link {
    display: flex;
}
#image {
    visibility: hidden;
}
#custom-picture {
    color: white;
}
#title {
    height: 30px;
    padding-top: 5px;
    padding-bottom: 5px;
    line-height: 20px;
    font-weight: bold;
}
ul {
    justify-content: space-between;
}
ul svg, span svg {
    width: 40px;
    cursor: pointer;
    color:rgb(222, 35, 61);
}
#close-picture {
    margin-left: 10px;
}
img,video {
    margin-top: 10px;
    border-radius: 10px;
}
.alert-danger {
    border-radius: 3px;
    padding: 5px;
}
</style>