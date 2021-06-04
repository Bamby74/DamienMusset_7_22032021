<template>
<div>
    <div class="container">
        <h1>Mon Profil</h1>
        <div class="row">
            <div class="col-md-6 mx-auto">
                <form :style="{opacity: opacity}">
                    <div class="mb-3">
                        <label for="Name" class="form-label">Nom</label>
                            <input
                                type="text"
                                class="form-control"
                                id="Name"
                                name="name"
                                required
                                v-model.trim="name"
                            />
                    </div>
                    <div class="mb-3">
                        <label for="Surname" class="form-label">Prénom</label>
                            <input
                                type="text"
                                class="form-control"
                                id="Surname"
                                name="surname"
                                aria-describedby="emailHelp"
                                required
                                v-model.trim="surname"
                            />
                    </div>
                    <div class="mb-3">
                        <label for="userName" class="form-label">Pseudo</label>
                        <input
                            type="text"
                            class="form-control"
                            id="userName"
                            name="username"
                            aria-describedby="emailHelp"
                            required
                            v-model.trim="username"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Adresse mail</label>
                        <input
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            name="email"
                            aria-describedby="emailHelp"
                            required
                            v-model.trim="email"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
                        <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        required
                        v-model.trim="$v.password.model"
                        />
                    </div>
                    <button data-message="Bouton pour valider la mise à jour" class="btn btn-danger" @click.prevent="beforeUpdated = true, opacity -= 0.9">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-bar-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M3.646 11.854a.5.5 0 0 0 .708 0L8 8.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zM2.4 5.2c0 .22.18.4.4.4h10.4a.4.4 0 0 0 0-.8H2.8a.4.4 0 0 0-.4.4z"/>
                        </svg>
                        Mettre à jour
                    </button><br/>
                    <button data-message="Bouton pour supprimer le compte" class="btn btn-dark" @click.prevent="disconnect = true, opacity -= 0.9" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                        Supprimer mon compte
                    </button>
                </form>
            </div>
        </div>
    </div>
    <ValidationBox  v-if="disconnect" @delete-box="disconnect = false, opacity = 1" @delete-page="deleteUser" text=" Êtes-vous sûr(e) de vouloir supprimer votre compte?" requestYes="Oui" requestNo="Non"/>
    <ValidationBox  v-if="beforeUpdated" @delete-box="beforeUpdated = false, opacity = 1" @delete-page="updateUser" text=" Confirmez-vous la mise à jour de votre profil?" requestYes="Oui" requestNo="Non"/>
    <div class="container">
        <div class="confirmation-case mx-auto" v-if="updated">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
        <p>Votre profil a été mis à jour</p>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import { required, minLength, alpha, email } from 'vuelidate/lib/validators';
import ValidationBox from '../components/ValidationBox';

export default {
     components: {
        ValidationBox
    },
    data() {
        return {
            name: "",
            surname: "",
            username: "",
            email: "",
            password: "",
            id: "",
            disconnect: false,
            beforeUpdated: false,
            updated: false,
            opacity: 1
        }
    },
    validations: {
      name: {
        required,
        alpha
      },
      surname: {
        required,
        alpha
      },
      username: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    },
    methods: {
        ...mapActions(['checkNavButton']),
        updateUser() {
        this.beforeUpdated = false
        this.opacity -= 0.9
          const newUserProfil = {
            name: this.name,
            surname: this.surname,
            username: this.username,
            email: this.email,
            id: this.id,
          }
          if(this.password){
            newUserProfil.password = this.password
          }
          let token = localStorage.getItem('token')
          axios.put('http://localhost:3000/api/auth/profil', newUserProfil, {
            headers: {
              'Authorization' : 'Bearer '+token
            }
          })
          .then(response => {
            console.log(response)
            this.password = ""
            this.updated = true
            this.opacity = 0.1
            setTimeout(() => {this.updated = false, this.opacity = 1}, 2000)
          })
          .catch(error => console.log(error))
        },
        deleteUser() {
            this.disconnect = true
            this.opacity -= 0.9
            let token = localStorage.getItem('token')
            axios.delete(`http://localhost:3000/api/auth/profil`, {
                headers: {
                    'Authorization' : 'Bearer '+token
                }
            })
            .then(response => {
                console.log(response)
                localStorage.removeItem('token')
                this.$router.push({ name: "Home" });
            })
            .catch(error => console.log(error))
        }
    },
    created() {
      this.checkNavButton();
    },
    mounted() {
        let token = localStorage.getItem('token')
        axios.get('http://localhost:3000/api/auth/profil', {
            headers: {
                'Authorization' : 'Bearer '+token
            }
        })
        .then(user => {
            this.name = user.data.name,
            this.surname = user.data.surname,
            this.username = user.data.username,
            this.email = user.data.email,
            this.id = user.data.id
        })
        .catch(error => console.log(error))
    },
}
</script>

<style scoped>
.row{
    margin-top: 50px;
}
.btn-dark {
    margin-top: 10px;
    margin-bottom: 10px;
}
.confirmation-case {
  position: fixed;
  top: 50%;
  left: 37.5%;
  width: 300px;
  background: white;
  padding: 10px;
}
#yes, #no {
    margin: 0px 10px;
}
</style>