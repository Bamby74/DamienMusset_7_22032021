<template>
  <div>
    <ProfilForm />
  </div>
</template>

<script>
import ProfilForm from '../components/ProfilForm';
export default {
   components: {
     ProfilForm
   }
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
#confirmation-case button {
  margin: 0px 10px;
}
</style>