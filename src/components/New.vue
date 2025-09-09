<template>
  <div class="new contents">
    <h2>New employee</h2>
    <div class="row">
      <form 
        class="col s12" 
        @:submit.prevent="saveEmployee">
        <div class="row">
          <div class="input-field col s12">
            <input 
              id="user_id" 
              v-model="user.ep_id" 
              type="text" 
              required >
            <label for="user_id">employee id</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input 
              id="user_name" 
              v-model="user.name" 
              type="text" 
              required >
            <label for="user_name">employee name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input 
              id="user_age" 
              v-model="user.age" 
              type="text" 
              required >
            <label for="user_age">employee age</label>
          </div>
        </div>
        <button 
          type="submit" 
          class="btn blue">저장</button>
        <router-link 
          :to="{ name: 'dashboard' }" 
          class="btn grey"> 취소 </router-link>
      </form>
    </div>
  </div>
</template>
<script>
import { db } from "./firebaseset"
export default {
  name: "Write",
  data() {
    return {
      user: {
        ep_id: null,
        name: null,
        age: null
      }
      // ep_id: null,
      // name: null,
      // age: null
    }
  },
  methods: {
    saveEmployee() {
      db.collection("user")
        .add(this.user)
        .then(() => {
          console.log("Document successfully updated!")
          alert(`${this.user.name}님이 등록 되었습니다.`)
          // this.$router.push('/')
          this.$router.go({ path: this.$router.path })
        })
        .catch(error => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
