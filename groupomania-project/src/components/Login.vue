<template>
    <main class="container">
        <h1>Connectez-vous</h1>
        <br />
        <br />
        <section class="row">
        <form class="col-6 mx-auto">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Adresse mail</label>
                <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="email"
                />
                </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
                <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    v-model="password"
                />
            </div>
            <div class="alert-danger" v-if="error">
                <p>Votre email ou votre mot de passe est incorrect !<br/><br/> Vérifiez vos identifiants de connexion et réessayer de vous connecter ...</p>
            </div>
            <button data-message="Bouton de connexion" class="btn btn-danger" @click.prevent="login">Connexion</button>
        </form>
        </section>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    name: "login",
    data() {
        return {
            email: "",
            password: "",
            error: false
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
                localStorage.setItem('admin', data.data.isAdmin)
                this.$router.push({ name: "publications" });
            })
            .catch(error => {
                this.error = true
                console.log(error)
            })
        }
    },
}
</script>

<style scoped>
.alert-danger {
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 10px;
}
p {
    margin: 0px;
}
</style>