<template>
  <div class="edit contents">
    <div v-if="loading">loading</div>

    <h2>Edit Category</h2>

    <div class="row">
      <div class="input-field col s8 m10">
        <input
          id="input_text"
          ref="inputText"
          v-model="inputText"
          type="text"
          @keyup.enter.prevent="inputTextFunc"
        >

        <label 
          ref="labelText" 
          for="input_text"/>
      </div>

      <button 
        class="btn large pink accent-3 col s4 m2" 
        type="button" 
        @click="inputTextFunc">
        <i class="fa fa-plus"/>
      </button>
    </div>

    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <ul class="collection">
              <li class="collection-item">
                <div class="chip gray accent-2 black-text">{{ constCate }}</div>

                <div
                  v-for="items in cateList"
                  :key="items.id"
                  class="chip pink accent-2 white-text"
                >
                  {{ items }}
                  <i 
                    class="close-btn material-icons" 
                    @click="removeList(items)"> close </i>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <button 
          type="button" 
          class="btn pink accent-3 white-text" 
          @click="updateEmployee">
          저장
        </button>

        <router-link
          :to="{
            name: 'dashboard',
            params: { employee_id: user.ep_id },
            query: { current_cate: currentCate }
          }"
          class="btn grey"
        >
          취소
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "./firebaseset"
export default {
  name: "Edit",
  data() {
    return {
      loading: false,
      user: {
        ep_id: null,
        list: null
      },
      inputText: "",
      currentCate: null,
      cateList: [],
      constCate: "mymenu",
      initialCateData: []
    }
  },
  beforeRouteEnter(to, from, next) {
    db.collection("user")
      .where("ep_id", "==", to.params.employee_id)
      .get()
      .then(querySnapshop => {
        querySnapshop.forEach(doc => {
          next(vm => {
            // vm.currentCate = to.query.current_cate
            vm.user.ep_id = doc.data().ep_id
            vm.user.list = doc.data().list
            let list = doc.data().list
            for (let key in list) {
              if (key !== vm.constCate) {
                // console.log(key + "," + list[key])
                vm.cateList.push(key)
              }
            }
          })
        })
      })
  },
  watch: {
    $route: "fetchData"
  },
  mounted() {
    this.$nextTick(function() {
      window.localStorage.setItem("list", JSON.stringify(this.user.list))
      let winLocalList = JSON.parse(window.localStorage.getItem("list"))
      for (const key in winLocalList) {
        if (key !== this.constCate) {
          this.initialCateData.push(key)
        }
      }
    })
  },
  methods: {
    inputTextFunc: function() {
      if (!this.cateList.includes(this.inputText) && this.inputText !== "") {
        this.cateList.push(this.inputText)
        this.user.list[this.inputText] = [] //빈배열의 새로운 카테고리 생성
        this.inputText = ""
        this.$refs.inputText.blur()
        this.$refs.labelText.classList.remove("active")
      } else {
        alert("동일한 카테고리 리스트가 존재합니다.")
        this.inputText = ""
        this.$refs.inputText.focus()
      }
    },
    removeList: function(text) {
      for (const key of Object.keys(this.user.list)) {
        if (key === text) {
          delete this.user.list[key]
        }
      }

      this.cateList = []
      for (const [key] of Object.entries(this.user.list)) {
        if (key !== this.constCate) {
          this.cateList.push(key)
        }
      }
    },
    listEqual: function(initialList, currenttList) {
      if (initialList.length !== currenttList.length) return false
      return initialList.every((val, i) => val === currenttList[i])
    },
    updateEmployee() {
      if (!this.listEqual(this.initialCateData, this.cateList)) {
        alert("저장되었습니다.")
        db.collection("user")
          .where("ep_id", "==", this.$route.params.employee_id)
          .get()
          .then(querySnapshop => {
            querySnapshop.forEach(doc => {
              doc.ref
                .update(this.user)
                .then(() => {
                  // console.log("Document successfully update!")
                  this.$router.push({
                    name: "employeeview",
                    params: { employee_id: this.user.ep_id }
                  })
                  window.location.href = ""
                })
                .catch(error => {
                  console.error("Error removing document: ", error)
                })
            })
          })
      } else {
        alert("변경된 카테고리가 없습니다.")
      }
    }
  }
}
</script>
