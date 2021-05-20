<template>
  <div class="home">
    <div id="image-container">
      <img id="logo-groupomania" class="img-fluid" alt="groupomania logo" src="../assets/icon-above-font.png" /><br />
      <HelloWorld msg="Bienvenue sur votre réseau social d'entreprise !" /><br />
      <img id="picture-groupomania" alt="Vue logo" class="img-fluid" src="../assets/image-groupomania.png" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
<style scoped>
img {
  width: 600px;
  border-radius: 10px;
}
#picture-groupomania {
  margin-bottom: 20px;
}
#logo-groupomania {
  height: 400px;
  width: auto;
  /* padding-top: 50px; */
}
</style>
