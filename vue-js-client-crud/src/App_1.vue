<template>
  <v-app>

    <!-- 側邊導覽列 -->
    <v-navigation-drawer app v-model="drawer">

      <!-- 網頁標題 -->
      <v-list-item to="/">
        <v-list-item-content>
          <v-list-item-title class="title"> GTD system </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- 選單 -->
      <v-list dense>
        <v-list-item
            v-for="v in Nav"
            :key="v"
            :to="v"
        >
          <v-list-item-icon>
            <v-icon>mdi-*</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{v}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <!-- 頂部導覽列 -->
    <v-app-bar app color="primary" dark collapse>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- 內容區塊 -->
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <!-- footer -->
    <v-footer app class="justify-center"></v-footer>

  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        drawer: false,
        Nav: [
            "Memo",
            "Project",
            "Calenar"
        ]
      }
    }
  }
</script>