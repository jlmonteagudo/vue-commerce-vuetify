<template>
  <v-app>

    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="{path: item.path}"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>



    <v-toolbar fixed app :clipped-left="clipped" color="light-blue darken-1" dark>

      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>

    </v-toolbar>


    <main>
      <v-content>
        <v-container fluid class="ma-3 pr-5">
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>


    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-snackbar
      :timeout=5000
      :color="message.color"
      :right="true"
      :top="true"
      v-model="message.visible"
    >
      <v-icon dark class="mr-2">{{ message.icon }}</v-icon>
      {{ message.text }}
      <v-btn dark flat @click.native="message.visible = false">
        <v-icon dark right>close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>

  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        clipped: true,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'home',
          title: 'Home',
          path: '/'
        },
        {
          icon: 'aspect_ratio',
          title: 'List Products',
          path: '/product'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js'
      }
    },
    computed: {
      ...mapGetters({
        message: 'common/message'
      })
    }
  }

</script>
