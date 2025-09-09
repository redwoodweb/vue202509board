<template>
  <div class="intro contents">
    <div 
      :class="{ on: isVisible }" 
      class="random-box-wrap">
      <div 
        ref="rbInner" 
        class="inner">
        <div 
          ref="randomAni" 
          :class="['random-ani', { active: isAni }]"/>
        <div 
          ref="randombox" 
          :class="['randombox', { on: randomBoxView }]">
          <div 
            v-for="(items, i) in mlist" 
            :key="i">{{ items }}</div>
        </div>
      </div>
    </div>
    <div class="row flex-wrap">
      <div class="input-items icon">
        <router-link 
          :to="{
            name: 'editcate',
            params: { employee_id: user.ep_id },
            query: { current_cate: currentCate }
        }"><i class="large material-icons">library_add</i></router-link>
      </div>
      <div class="input-items">
        <div 
          class="dropdown" 
          @click="dropDown()">
          <div class="content">
            <input 
              :value="currentCate" 
              type="text" 
              class="no-keyboard" 
              placeholder="" 
              readonly >
            <div class="inner">
              <div 
                v-for="li in cate" 
                :key="li" 
                class="option" 
                @click="show(li)">
                {{ li }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <form @submit.prevent>
        <div class="input-field col s8 m10">
          <input 
            id="input_text" 
            ref="inputText" 
            v-model="inputText" 
            type="text" 
            @keyup.enter="inputTextFunc" >
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
      </form>
    </div>
    <ul class="collection">
      <li class="collection-item">
        <div 
          v-for="items in mlist" 
          :key="items.id" 
          class="chip pink accent-2 white-text">
          {{ items }}<i 
            class="close-btn material-icons" 
            @click="removeList(`${items}`)">close</i>
        </div>
      </li>
    </ul>
    <div class="row">
      <div 
        id="ramdomtext" 
        :class="{ on: isActive }">
        {{ ramdomText }}
      </div>
      <div class="row btn-group">
        <div class="col s6">
          <a 
            class="waves-effect waves-light btn center-text suffle-btn pink accent-3" 
            @click="suffleList">SUFFLE</a>
        </div>
        <div class="col s6">
          <a 
            class="waves-effect waves-light btn center-text reset-btn grey darken-1 white-text"
            @click="resetList">RESET</a>
        </div>
      </div>
    </div>
    <!-- <div class="fixed-action-btn">
      <button class="btn-floating btn-large red" v-on:click="inputTextFunc"><i class="fa fa-plus"></i></button>
    </div> -->
  </div>
</template>
<script>
import firebase from "firebase"
import { db } from "./firebaseset"
export default {
  name: "DashBoard",
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
      randomNum: 0,
      isActive: false, // 랜덤리스트 결과 값을 보여주는 영역 변수
      selectElem: null,
      mlist: [],
      isVisible: false,
      count: 0,
      isAni: false,
      timeOut: null,
      randomBoxView: false,
      listLength: 0
    }
  },
  created() {
    let currentUser = firebase.auth().currentUser.email
    db.collection("user")
      .get()
      .then(querySnapshop => {
        querySnapshop.forEach(doc => {
          try {
            if (currentUser === doc.data().ep_id) {
              this.user.ep_id = doc.data().ep_id
              this.user.list = doc.data().list
              // 카테고리 목록 가져오기
              for (const cates in doc.data().list) {
                this.cate.push(cates)
              }
              //현재 카테고리에 매칭된 데이터 가져오기
              if (doc.data().list.mymenu.length !== 0) {
                for (const [key, value] of Object.entries(doc.data().list)) {
                  if (key === this.currentCate) {
                    value.forEach(val => {
                      this.mlist.push(val)
                    })
                  }
                }
              }
              this.randoAniAddList(this.$refs.randombox)
            }
          } catch (error) {
            console.error("데이터에러", error)
            throw error
          }
        })
      })
  },
  mounted() {
    //mounted에서는 아직 firebase의 데이터가 도착하기 전단계
    this.$nextTick(function() {
      // 모든 화면이 렌더링된 후 실행합니다.
    })
  },
  methods: {
    randoAniAddList: function(el) {
      // 데이터를 가져온 후 처리하기
      // 데이터와 관련된 초기요소는 여기에서 처리
      let rbParent = el
      let rotateCount = 10 // 리스 개수 10개이하 일때 기본 최소한의 회전수를 갖기 위한 상수값 설정
      this.$nextTick(function() {
        function copyElem(parent, other) {
          Array.from(parent.children).forEach(child => {
            let clone = child.cloneNode(true)
            other.appendChild(clone)
          })
        }
        this.$refs.randomAni.innerHTML = ""
        copyElem(rbParent, this.$refs.randomAni) // 기존 메뉴요소를 복사해서 새로 생성한 요소에 추가
        if (this.mlist.length < rotateCount) {
          for (let i = 0; i < rotateCount - this.mlist.length; i++) {
            copyElem(rbParent, this.$refs.randomAni)
          }
        }
      })
    },
    randomAni: function(e) {
      if (e.propertyName === "transform") {
        console.log("transition ended!!")
      }
    },
    inputTextFunc: function() {
      if (this.inputText !== "") {
        this.mlist.push(this.inputText)
        for (const [key, value] of Object.entries(this.user.list)) {
          if (key === this.currentCate) {
            value.push(this.inputText)
          }
        }
        db.collection("user")
          .where("ep_id", "==", this.user.ep_id)
          .get()
          .then(querySnapshop => {
            querySnapshop.forEach(doc => {
              doc.ref.update(this.user)
            })
          })
      }
      this.inputText = ""
      this.$refs.inputText.blur()
      this.$refs.labelText.classList.remove("active")
    },
    removeList: function(text) {
      //리스트 개별 삭제 기능
      let listelm = this.user.list
      for (const i in listelm) {
        if (listelm[i] === text) {
          listelm.splice(i, 1)
        }
      }
      for (const [key, value] of Object.entries(this.user.list)) {
        if (key === this.currentCate) {
          for (const i in value) {
            if (value[i] === text) {
              value.splice(i, 1)
              this.mlist = value
            }
          }
        }
      }
      db.collection("user")
        .where("ep_id", "==", this.user.ep_id)
        .get()
        .then(querySnapshop => {
          querySnapshop.forEach(doc => {
            doc.ref.update(this.user)
          })
        })
    },
    suffleList: function() {
      this.randoAniAddList(this.$refs.randombox)
      this.listLength = this.mlist.length
      this.randomNum = Math.floor(Math.random() * this.listLength)

      if (this.listLength !== 0 && this.listLength !== null) {
        //리스트가 존재할때 만 실행
        this.isActive = true
        this.isVisible = true
        this.isAni = true // 랜덤값이 나오기전 회전하는 애니매이션 구현
        window.setTimeout(() => {
          this.randomBoxView = true // 실제 최종 결과가 나오는 애니매션
          this.$refs.randombox.style.transform = "translateY(" + this.randomNum * 20 * -1 + "vh)"
        }, 1000)
        window.setTimeout(() => {
          // 랜덤 추출후 종료하여 램덤화면 삭제하고 원래 대시보드화면이 보이게 구현
          this.isActive = false
          this.isVisible = false
          this.randomBoxView = false
          this.isAni = false
          this.$refs.randombox.style.transform = "translateY(0vh)"
          this.ramdomText = this.mlist[this.randomNum]
        }, 3000)
      } else {
        // 리스트가 존재하지 않을때
        alert("현재 카테고리에 리스트가 없습니다. 리스트를 추가해주세요!")
      }
    },
    resetList: function() {
      this.ramdomText = "텅"
      this.isActive = false
    },
    show: function(elem) {
      document.querySelector("input").value = elem
      let currentUser = firebase.auth().currentUser.email
      db.collection("user")
        .get()
        .then(querySnapshop => {
          querySnapshop.forEach(doc => {
            if (currentUser === doc.data().ep_id) {
              this.user.ep_id = doc.data().ep_id
              this.user.list = doc.data().list
              // 현재 카테고리에 할당
              this.currentCate = elem
              // 현재 카테고리에 매칭된 데이터 가져오기
              for (const [key, value] of Object.entries(doc.data().list)) {
                if (key === this.currentCate) {
                  this.mlist = value
                }
              }
            }
          })
          this.ramdomText = "텅"
          this.isActive = false
        })
    },
    dropDown: function() {
      document.querySelector(".dropdown").classList.toggle("active")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.collection {
  margin: 0.5rem 0;
  border: 0;

  .collection-item {
    background: none;
    border: 0;
    padding: 0;

    a.secondary-content {
      line-height: 38px;
    }
  }
}

.btn-group {
  position: fixed;
  height: 5rem;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 555;
  margin-bottom: 0;
  background: rgba(252, 228, 236, 0.8);

  @media screen and (min-width: 601px) {
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
  }

  @media screen and (min-width: 993px) {
    width: 70%;
    left: 50%;
    transform: translateX(-50%);
  }
}

.suffle-btn,
.reset-btn {
  display: block;
  line-height: 5rem;
  height: 5rem;
  font-size: 1.5rem;
  border-radius: 2.5rem;

  i.material-icons {
    font-size: 1.7rem;
  }
}

.reset-btn {
  color: #999999;
}

#ramdomtext {
  font-size: 5rem;
  font-weight: 700;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10rem;
  text-align: center;

  &.on {
    color: #ff4081;
  }
}
</style>
