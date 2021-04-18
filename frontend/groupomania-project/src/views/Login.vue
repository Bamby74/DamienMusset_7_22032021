<template>
  <div class="container">
    <h1>Connectez-vous</h1>
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
          <button  class="btn btn-primary" @click="login">Submit</button>
        </form>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        login: function() {
            /*let newUser = {
                    email: this.email,
                    password: this.password
            }
            axios.post('http://localhost:3000/api/auth/login', {newUser})
            .then(response => console.log(response))
            .catch(error => console.log(error))*/
        }
    }
};
</script>

<style scoped></style>
