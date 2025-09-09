<template>
  <div class="login contents">
    <div>
      <div class="container">
        <div class="row">
          <div class="col s12 m10 offset-m1">
            <div class="login card-panel grey lighten-4 black-text center">
              <h3>Register</h3>

              <form>
                <div class="input-field">
                  <i class="material-icons prefix">email</i>

                  <input 
                    id="email" 
                    v-model="email" 
                    type="text" 
                    name="" >

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
                    name="" >

                  <label 
                    class="black-text" 
                    for="password">Password</label>
                </div>

                <button 
                  class="btn btn-large grey darken-2 white-text" 
                  @click="register">
                  Register
                </button>
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
import { db } from "./firebaseset"
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      user: {
        ep_id: null,
        list: { mymenu: [] }
      }
    }
  },
  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email.trim(), this.password)
        .then(
          () => {
            this.user.ep_id = this.email.trim()
            db.collection("user")
              .add(this.user)
              .then(() => {
                alert(`Acount created for ${this.email}`)
                // this.$router.go()
                window.location.href = ""
              })
              .catch(error => {
                console.error(error)
              })
            // this.$router.go({ path: this.$router.path })
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

<style lang="css" scoped>
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
