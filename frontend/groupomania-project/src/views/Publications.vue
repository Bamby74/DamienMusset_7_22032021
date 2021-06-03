<template>
  <div class="container">
    <Publications />
    <router-link to="/Post">
      <button class="btn btn-danger">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </button>
    </router-link>
  </div>
</template>

<script>
import Publications from '../components/Publications';

export default {
    components: {
        Publications
    },
};
</script>

<style scoped>
body {
  background-color: #eeeeee;
}

.h7 {
  font-size: 0.8rem;
}

.gedf-wrapper {
  margin-top: 0.97rem;
}
#title {
    height: 20px;
    margin-bottom: 10px;
}
/**Reset Bootstrap*/
.dropdown-toggle::after {
  content: none;
  display: none;
}
.btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 25px;
  height: 50px;
  width: 50px;
  line-height: 20px;
}
svg {
  position: relative;
  top: 2px;
}

</style>
