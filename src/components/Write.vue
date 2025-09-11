<template>
  <div id="write">
    <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <input id="first_name" type="text" class="validate">
          <label for="first_name">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate">191
          <label for="last_name">Last Name</label>
        </div>
      </div>      
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate">
          <label for="password">Password</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate">
          <label for="email">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          This is an inline input field:
          <div class="input-field inline">
            <input id="email_inline" type="email" class="validate">
            <label for="email_inline">Email</label>
            <span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
          </div>
        </div>
      </div>
    </form>
  </div>
    <!-- <StyledButton 
      :size="btnSize" 
      primary 
      @click="changeBtn">button</StyledButton> -->
  </div>
</template>
<script>
// import { component } from "vue/types/umd"
import styled from "vue-styled-components"
const btnProps = { primary: Boolean, size: String }
const StyledButton = styled("button", btnProps)`
  &:focus {
    background: black;
    color: white;
  }
  background-color: ${props => (props.primary ? "red" : "blue")};
  border: 1px solid ${props => (props.primary ? "blue" : "red")};
  width: ${props =>
    props.size === "small"
      ? "100px"
      : props.size === "mid"
        ? "300px"
        : props.size === "big"
          ? "400px"
          : "200px"};
  height: 100px;
`
export default {
  name: "Write",
  components: { StyledButton },
  data() {
    return {
      count: 0,
      btnSize: "small"
    }
  },
  methods: {
    changeBtn: function() {
      this.count++
      if (this.count === 1) {
        this.btnSize = ""
      } else if (this.count === 2) {
        this.btnSize = "mid"
      } else if (this.count === 3) {
        this.btnSize = "big"
      } else if (this.count === 4) {
        this.btnSize = "small"
        this.count = 0 // 다시 순환하도록 초기화
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
