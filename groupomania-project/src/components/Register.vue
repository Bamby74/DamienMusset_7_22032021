<template>
  <div class="container">
    <h1>Créer votre compte</h1>
    <br />
    <br />
    <p class="error text-danger" v-if="validateForm == false"> Tous les champs d'inscriptions doivent être remplis pour créer votre compte !</p>
    <div class="row">
        <div class="col-6 mx-auto">
            <form @submit.prevent="">
                <div class="mb-3" :class="{ 'form-group--error': $v.name.$error }">
                    <label for="Name" class="form-label">Nom</label>
                    <input
                        type="text"
                        class="form-control"
                        id="Name"
                        name="name"
                        placeholder="Dupont"
                        v-model.trim="$v.name.$model"
                    />
                    <span class="error text-danger" v-if="!$v.name.required && $v.name.$dirty">Renseignez un nom s'il vous plaît</span>
                </div>
                <div class="mb-3">
                    <label for="Surname" class="form-label">Prénom</label>
                    <input
                        type="text"
                        class="form-control"
                        id="Surname"
                        name="surname"
                        aria-describedby="emailHelp"
                        placeholder="Albert"
                        v-model.trim="$v.surname.$model"
                    />
                    <span class="error text-danger" v-if="!$v.surname.required && $v.surname.$dirty">Renseignez un prénom s'il vous plaît</span>
                </div>
                <div class="mb-3">
                    <label for="userName" class="form-label">Pseudo</label>
                    <input
                        type="text"
                        class="form-control"
                        id="userName"
                        name="username"
                        aria-describedby="emailHelp"
                        v-model="$v.username.$model"
                    />
                    <span class="error text-danger" v-if="!$v.username.required && $v.username.$dirty">Renseignez un pseudo s'il vous plaît</span>
                    <span class="error text-danger" v-if="!$v.username.minLength">Votre pseudo doit comporter 4 caractères minimum</span>
                </div>
                
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Adresse mail</label>
                    <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        name="email"
                        aria-describedby="emailHelp"
                        v-model.trim="$v.email.$model"
                    />
                    <span class="error text-danger" v-if="(!$v.email.required || !$v.email.email) && $v.email.$dirty">Renseignez un email valide s'il vous plaît</span>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
                    <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        v-model.trim="$v.password.$model"
                    />
                    <span class="error text-danger" v-if="(!$v.password.required && !$v.password.minLength) && $v.password.$dirty">Renseignez votre mot de passe</span>
                    <span class="error text-danger" v-if="$v.password.required && !$v.password.minLength">Votre mot de passe doit comporter 8 caractères minimum</span>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword2" class="form-label">Confirmez votre mot de passe</label>
                    <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword2"
                        v-model.trim="$v.repeatPassword.$model"
                    />
                    <span class="error text-danger" v-if="(!$v.repeatPassword.required && !$v.repeatPassword.sameAs) && $v.repeatPassword.$dirty">Veuillez confirmer votre mot de passe</span>
                    <span class="error text-danger" v-if="$v.repeatPassword.required && !$v.repeatPassword.sameAsPassword">Le mot de passe doit être identique ... </span>
                </div>
                <button data-message="Bouton pour vérifier la création du compte" class="btn btn-danger" @click.prevent="register">Enregistrer</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required, minLength, alpha, email, sameAs } from 'vuelidate/lib/validators';

export default {
    name: "register",
  data() {
    return {
        name: "",
        surname: "",
        username: "",
        email: "",
        password: '',
        repeatPassword: "",
        validateForm: true
    };
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
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    register() {
      axios.post('http://localhost:3000/api/auth/signup', { 
          name: this.name,
          surname: this.surname,
          username: this.username,
          email: this.email,
          password: this.password,
          isAdmin: false
      }, {
          headers: {
            'Content-Type': 'application/json'
          }
      })
      .then((response) => {
          let token = response.data.token
          localStorage.setItem('token',token);
          this.$router.push("/publications")})
      .catch((error) => {
          console.log({ error: error })
      })
    }
  }
}
</script>

<style>

</style>