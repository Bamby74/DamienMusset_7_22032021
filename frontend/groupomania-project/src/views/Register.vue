<template>
  <div class="container">
    <h1>Créer votre compte</h1>
    <br />
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <!-- <div class="mb-3">
            <img src="../assets/icon-above-font.png" alt="logo groupomania"/>
        </div> -->
        <form>
          <div class="mb-3">
            <label for="Name" class="form-label">Nom</label>
            <input
              type="text"
              class="form-control"
              id="Name"
              placeholder="Albert"
              v-model="name"
            />
          </div>
          <div class="mb-3">
            <label for="Surname" class="form-label">Prénom</label>
            <input
              type="text"
              class="form-control"
              id="Surname"
              aria-describedby="emailHelp"
              placeholder="Dupont"
              v-model="surname"
            />
          </div>
          <div class="mb-3">
            <label for="userName" class="form-label">Pseudo</label>
            <input
              type="text"
              class="form-control"
              id="userName"
              aria-describedby="emailHelp"
              v-model="username"
            />
          </div>
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
          <button class="btn btn-primary" @click="register">Submit</button>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "register",
  data() {
    return {
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
    };
  },
  methods: {
    register() {
      debugger;
    //   axios.post('http://localhost:3000/api/auth/signup', { 
    //       name: this.name,
    //       surname: this.surname,
    //       username: this.username,
    //       email: this.email,
    //       password: this.password
    //   }, {
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //       }
    //   })
    fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: {
            name: this.name,
            surname: this.surname,
            username: this.username,
            email: this.email,
            password: this.password
        }
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
    }
  },
};
</script>

<style scoped></style>
