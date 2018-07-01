<template>
  <section class="advertise-box" v-if="adobj">
    <a :href="adobj.link" target="_blank">
      <img :src="adobj.cover" :alt="adobj.title">
    </a>
  </section>
</template>

<script>
export default {
  props: ['adobj']
}
</script>

<style lang="scss" scoped>
.advertise-box{
  margin-bottom: 20px;
  width: 100%;
  img{
    display: block;
    width: 100%;
    height: 200px;
  }
}
</style>
