<template>
  <div class="view contents">
    <h2>View</h2>
    <ul class="collection with-header">
      <li class="collection-header">
        <h5>{{ name }}</h5>
      </li>
      <li class="collection-item">{{ ep_id }}</li>
      <li class="collection-item">{{ age }}</li>
    </ul>
    <router-link 
      :to="{ name: 'dashboard' }" 
      class="btn grey">Back</router-link>
    <button 
      class="btn red" 
      @click="deleteEmployee">Delete</button>
    <div class="fixed-action-btn">
      <router-link
        :to="{ name: 'edit', params: { employee_id: ep_id } }"
        class="btn-floating btn-large red"
      ><i 
        class="fa fa-pencil"
      /></router-link>
    </div>
  </div>
</template>

<script>
import { db } from "./firebaseset"
export default {
  name: "Employeeview",
  data() {
    return {
      ep_id: null,
      name: null,
      age: null
    }
  },
  watch: {
    $route: "fetchData"
  },
  created() {
    console.log("view")
    // db.collection('user').where('ep_id', '==', '001').get().then(querySnapshop => {
    //   querySnapshop.forEach(doc => {
    //     console.log(doc.data())
    //   })
    // })
  },
  beforeCreate() {},
  beforeRouteEnter(to, from, next) {
    db.collection("user")
      .where("ep_id", "==", to.params.employee_id)
      .get()
      .then(querySnapshop => {
        querySnapshop.forEach(doc => {
          next(vm => {
            vm.ep_id = doc.data().ep_id
            vm.name = doc.data().name
            vm.age = doc.data().age
            console.log((vm.ep_id = doc.data().ep_id))
          })
          // console.log(doc.data())
        })
      })
    // console.log(to.params.employee_id)
  },
  methods: {
    fetchData() {
      db.collection("user")
        .where("ep_id", "==", this.$route.params.employee_id)
        .get()
        .then(querySnapshop => {
          querySnapshop.forEach(doc => {
            this.ep_id = doc.data().ep_id
            this.name = doc.data().name
            this.age = doc.data().age
            console.log(doc.data().ep_id)
            console.log("method:view")
          })
        })
    },
    deleteEmployee() {
      if (confirm("정말 삭제를 원해요?")) {
        db.collection("user")
          .where("ep_id", "==", this.$route.params.employee_id)
          .get()
          .then(querySnapshop => {
            querySnapshop.forEach(doc => {
              // console.log(doc.data())
              doc.ref
                .delete()
                .then(() => {
                  console.log("Document successfully deleted!")
                  this.$router.push("/")
                })
                .catch(error => {
                  console.error("Error removing document: ", error)
                })
            })
          })
      }
    }
  }
}
</script>

<style lang="css" scoped></style>
