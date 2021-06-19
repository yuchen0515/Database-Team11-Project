<template>
  <hello-world />
</template>

<script>
  import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'Home',

    components: {
      HelloWorld,
    },

    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$router.push('/Login')
      }
    },
    methods: {
      logout: function () {
        this.$session.destroy()
        this.$router.push('/Login')
      }
    }
  }
</script>
