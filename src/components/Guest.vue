<template>
  <div class="guest contents">
    <h2>this is guest page</h2>
    <p>hello!! welcome to Homepage</p>
  </div>
</template>
<script>
import firebase from "firebase"
import { db } from "./firebaseset"
export default {
  name: "Guest",
  data() {
    return {
      user: {
        ep_id: null,
        list: []
      },
      currentCate: "mymenu",
      cate: [],
      inputText: "",
      ramdomText: "텅",
      isActive: false,
      selectElem: null,
      mlist: [],
      isVisible: false,
      timeOutId: null,
      count: 0
    }
  },
  created() {
    let currentUser = firebase.auth().currentUser.email
    db.collection("user")
      .get()
      .then(querySnapshop => {
        querySnapshop.forEach(doc => {
          if (currentUser === doc.data().ep_id) {
            this.user.ep_id = doc.data().ep_id
            this.user.list = doc.data().list
            // console.log(doc.data().list)
            // 카테고리 목록 가져오기
            // for( const items in doc.data().list){
            //   console.log(items)
            // }
            for (const [key] of Object.entries(doc.data().list)) {
              this.cate.push(key)
              // console.log("카테고리모음"+this.cate)
            }
            // 현재 카테고리에 할당
            // this.currentCate = this.cate[0]
            // console.log(this.user.list)
            // 현재 카테고리에 매칭된 데이터 가져오기
            for (const [key, value] of Object.entries(doc.data().list)) {
              if (key === this.currentCate) {
                value.forEach(val => {
                  this.mlist.push(val)
                })
              }
            }
            // 데이터를 가져온 후 처리하기
            // 데이터와 관련된 초기요소는 여기에서 처리
            // this.$nextTick(function () {
            //   let rbParent = this.$refs.randombox
            //   let rbInner = this.$refs.rbInner
            //   let rbRef = this.$refs.rbRef
            //   function copyElem(parent, other) {
            //     Array.from(parent.children).forEach((child) => {
            //       let clone = child.cloneNode(true)
            //       other.appendChild(clone)
            //     })
            //   }

            //   copyElem(rbParent, rbRef) // 기존 메뉴요소를 복사해서 새로 생성한 요소에 추가
            //   rbInner.appendChild(rbRef) // 추가된 요소를 애니메이션이 동작할 위치에 추가

            //   for (let i; 50 > rbRef.children.length; i++) {
            //     copyElem(rbRef, rbRef) //새로 생성한 요소에 복사한 요소의 개수를 복사해서 늘려줌
            //   }
            // })
          }
        })
      })
  },
  mounted() {
    this.$nextTick(function() {
      console.log("mounted")
    })
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
