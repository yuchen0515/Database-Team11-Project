<template>
  <div>home</div>
</template>

<script>

  export default {
    name: 'Home',

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
