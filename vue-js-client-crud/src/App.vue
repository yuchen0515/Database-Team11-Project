<template>
  <v-app>
    <!-- 頂部導覽列 -->
    <v-app-bar
      app
      color="primary"
      dark
      :collapse="!collapseOnScroll"
    >
      <!-- <v-app-bar-nav-icon @click.stop="collapseOnScroll = !collapseOnScroll"></v-app-bar-nav-icon> -->
      <v-toolbar-title>GTD system</v-toolbar-title>
      <!-- <v-divider></v-divider> -->
      <v-divider
        class="mx-4"
        vertical
      ></v-divider>
      <!-- <template> -->
      <template v-if="username">
      <v-btn
        v-for="item in items"
        :key="item.name"
        text
        :to="item.path"
        class="mx-2"
      >
        {{item.name}}
      </v-btn>
      </template>
      <!-- <v-divider></v-divider> -->
      <v-spacer></v-spacer>
      <v-text
        v-if="username"
      >
        {{username}}
      </v-text>
      <v-divider
        class="mx-4"
        vertical
      ></v-divider>
      <v-btn
        v-if="username"
        outlined
        :key="'Logout'"
        :to="'/Login'"
        @click="Logout"
      >Logout</v-btn>
      <v-btn
        v-else
        outlined
        :key="'Login'"
        :to="'/Login'"
      >Login</v-btn>
    </v-app-bar>

    <!-- 內容區塊 -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- footer -->
    <v-footer app class="justify-center"></v-footer>

  </v-app>
</template>

<script>
  // import Cookies from 'js-cookie'
  import {mapGetters, mapState, mapActions} from "vuex";
  export default {
    data() {
      return {
        collapseOnScroll: true,
        items: [
          {
            path: '/',
            name: 'Home',
          },
          {
            path: '/Memo',
            name: 'Memo',
          },
          {
            path: '/Project',
            name: 'Project',
          },
          {
            path: '/Calendar',
            name: 'Calendar',
          }
        ],
      }
    },
    computed: {
      ...mapState([
        // 需要的state在這邊
        "username"
      ]),
      ...mapGetters([
        "isLoggedIn"
      ])
    },
    methods: {
      ...mapActions([
        "Logout"
      ])
    }
  }
</script>
