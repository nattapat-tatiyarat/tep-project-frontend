<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
                  document.title = "Smart Grow Room";
                  var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = '../assets/sprout.svg';
    document.getElementsByTagName('head')[0].appendChild(link);
                      }
};
</script>
