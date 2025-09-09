<template>
  <header>
    <!-- <div class="row center top-logo green valign-wrapper">
      <h1><router-link to="/" class="brand-logo white-text">Let's Have Something</router-link></h1>
    </div> -->
    <nav>
      <div 
        id="nav" 
        class="nav-wrapper">
        <div class="container">
          <ul class="gnb">
            <li 
              v-if="isLoggedIn" 
              class="user-id">{{ currentUser }}</li>
            <!-- <li v-if="isLoggedIn"><router-link to="/">Dashboard</router-link></li> -->
            <li v-if="!isLoggedIn">
              <router-link to="/login">Login</router-link>
            </li>
            <li v-if="!isLoggedIn">
              <router-link to="/register">Resiter</router-link>
            </li>
            <li 
              v-if="isLoggedIn" 
              @click="logout">Logout</li>
          </ul>
        </div>
      </div>
      <!-- <ul class="row">
          <li v-for="(menu,i) in gnb " v-bind:key="`${menu.name}-${i}`" v-bind:class="'col s2'">
            <router-link v-bind:to="{ name: menu.name }" class="white-text">{{menu.name}}</router-link>
          </li>
        </ul> -->
    </nav>
  </header>
</template>

<script>
import firebase from "firebase"
export default {
  name: "Navbar",
  data() {
    return {
      inputText: "",
      labelText: [],
      isLoggedIn: false,
      currentUser: false
    }
  },
  created() {
    // console.log(firebase.auth().currentUser)
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true
      // console.log(this.isLoggedIn)
      this.currentUser = firebase.auth().currentUser.email
    }
  },
  methods: {
    logout: function() {
      // console.log('logout')
      firebase
        .auth()
        .signOut()
        .then(() => {
          // console.log('logout')
          // this.$router.push('login')
          // this.$router.go()
          window.location.href = ""
        })
    },
    inputTextFunc: function(e) {
      if (e.keyCode === "13") {
        // console.log(this.inputText)
        this.labelText.push(this.inputText)
        this.inputText = ""
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top-logo {
  justify-content: center;
}

nav {
  color: #999999;
  background: none;
  webkit-box-shadow: none;
  box-shadow: none;

  .gnb {
    display: flex;
    justify-content: center;

    li {
      margin-right: 10px;

      &:last-of-type(1) {
        margin-right: 0;
      }

      a {
        color: #999999;

        &:hover {
          background: transparent;
        }
      }
    }
  }
}

.nav-wrapper {
  ul {
    li {
      a {
        display: inline-block;
      }
    }
  }
}

.cotainer {
  overflow: hidden;
  height: calc(100vh - 64px);
}
</style>
