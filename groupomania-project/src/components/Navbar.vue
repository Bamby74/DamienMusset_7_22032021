<template>
    <main>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" >
            <a class="navbar-brand">
                <router-link to="/">Groupomania</router-link>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                <span class="navbar-toggler-icon"></span>
            </button>
            <ul class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="d-flex">
                    <li class="nav-item" v-if="navButton === false">
                        <a class="nav-link btn btn-outline-success " href="#">
                            <router-link to="/login">Se connecter</router-link>
                        </a>
                    </li>
                    <li class="nav-item" v-if="navButton === false">
                        <a class="nav-link btn btn-outline-danger text-danger" href="#">
                            <router-link to="/register" type="submit">S'inscrire</router-link>
                        </a>
                    </li>
                    <div class="navConnected" v-else>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/publications">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
                                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                                </svg>
                                <p>Publications</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/Profil" data-toggle="tooltip" data-placement="bottom" title=" tooltip on Bottom">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>
                                <p>Profil</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link" @click="isDisconnected">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16" >
                                    <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                                    <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
                                </svg>
                                <p>Déconnecter</p>
                            </a>
                        </li>
                    </div>
                </div>
            </ul>
        </nav>
        <ValidationBox v-if="disconnect" @delete-box="changeStyle" @delete-page="goHomePage" text=" Êtes-vous sûr(e) de vouloir vous déconnecter?" requestYes="Oui" requestNo="Non"/>
        <br>
        <router-view />
    </main>
</template>

<script>
import ValidationBox from '../components/ValidationBox';
import {mapGetters,mapActions} from 'vuex';


export default {
    name: 'Navbar',
    props: ['isConnected'],
    components: {
        ValidationBox
    },
    computed: {
        ...mapGetters(['navButton'])
    },
    data() {
        return {
            disconnect: false,
        }
    },
    methods: {
        ...mapActions(['checkNavButton']),
        isDisconnected() {
            this.disconnect = true
        },
        changeStyle() {
            this.disconnect = false
        },
        goHomePage() {
            this.disconnect = false
            localStorage.removeItem('token');
            localStorage.removeItem('publicationId');
            localStorage.removeItem('admin');
            this.$router.push('/')
        }
    },
    created() {
        this.checkNavButton();
    },
    updated() {
        this.checkNavButton();
    }
}
</script>

<style scoped>
.navbar {
    box-shadow: 0px 0.5px 7px rgb(199, 17, 46
    );
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
#navbarSupportedContent {
    flex-direction: row-reverse;
}
.nav-link {
  color: rgb(199, 17, 46);
}
.navConnected {
    display: flex;
}
p {
    margin: 0;
}
.btn-outline-success {
    margin-right: 10px;
}
a {
    text-decoration: none;
    color: black;
}
li {
    list-style-type: none;
}
ul {
    margin: 0px;
    padding: 0px;
}
</style>