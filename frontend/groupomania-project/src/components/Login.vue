<template>
<div class="container">
    <h1>Connectez-vous</h1>
    <br />
    <br />
    <div class="row">
      <div class="col-6 mx-auto">
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Adresse mail</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="email"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Mot de passe</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="password"
            />
          </div>
          <button  class="btn btn-danger" @click.prevent="login">Connexion</button>
        </form>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: "login",
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        login() {
            axios.post('http://localhost:3000/api/auth/login', { 
                email: this.email,
                password: this.password
            })
            .then((data) => {
                let token = data.data.token
                localStorage.setItem('token',token);
                this.$router.push({ name: "publications" });
            })
            .catch(error => console.log(error))
        }
    },
}
</script>

<style>

</style>