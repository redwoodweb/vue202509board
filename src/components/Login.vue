<template>
  <div class="login contents">
    <div>
      <div class="container">
        <div class="row">
          <div class="col s12 m10 offset-m1">
            <div class="login card-panel gray lighten-3 black-text center">
              <h3>Login</h3>

              <form>
                <div class="input-field">
                  <i class="material-icons prefix">email</i>

                  <input 
                    id="email" 
                    v-model="email" 
                    type="email" 
                    name="" 
                    value="" >

                  <label 
                    class="black-text" 
                    for="email">Email</label>
                </div>

                <div class="input-field">
                  <i class="material-icons prefix">lock</i>

                  <input 
                    id="password" 
                    v-model="password" 
                    type="password" 
                    name="" 
                    value="" >

                  <label 
                    class="black-text" 
                    for="password">Password</label>
                </div>

                <button 
                  class="btn btn-large pink accent-3 white-text" 
                  @click="login">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
// import {db} from './firebaseset'
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      user: {
        id: "",
        list: ""
      }
    }
  },
  methods: {
    login: function(e) {
      // console.log(this.email)
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email.trim(), this.password)
        .then(
          () => {
            alert(`You logined in as ${this.email}`)
            // console.log(this.user)
            // this.$router.push('/')
            // this.$router.go()
            window.location.href = ""
          },
          err => {
            alert(err.message)
          }
        )
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: block;
  width: 100%;
}

.login {
  .input-field {
    width: 100%;

    input:focus {
      width: calc(100% - 42px);
      /* border: 1px solid #f50057; */
      border: none;
      border-bottom: 1px solid #9e9e9e;
    }
  }
}
</style>
