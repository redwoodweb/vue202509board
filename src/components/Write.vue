<template>
  <div id="write">
    <div class="mdc-data-table">
      <div class="mdc-data-table__table-container">
        <table 
          class="mdc-data-table__table" 
          aria-label="Dessert calories">
          <thead>
            <tr class="mdc-data-table__header-row">
              <th 
                class="mdc-data-table__header-cell" 
                role="columnheader" 
                scope="col">Dessert</th>
              <th 
                class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" 
                role="columnheader" 
                scope="col">Carbs (g)</th>
              <th 
                class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" 
                role="columnheader" 
                scope="col">Protein (g)</th>
              <th 
                class="mdc-data-table__header-cell" 
                role="columnheader" 
                scope="col">Comments</th>
            </tr>
          </thead>
          <tbody class="mdc-data-table__content">
            <tr class="mdc-data-table__row">
              <th 
                class="mdc-data-table__cell" 
                scope="row">Frozen yogurt</th>
              <td class="mdc-data-table__cell mdc-data-table__cell--numeric">24</td>
              <td class="mdc-data-table__cell mdc-data-table__cell--numeric">4.0</td>
              <td class="mdc-data-table__cell">Super tasty</td>
            </tr>
            <tr class="mdc-data-table__row">
              <th 
                class="mdc-data-table__cell" 
                scope="row">Ice cream sandwich</th>
              <td class="mdc-data-table__cell mdc-data-table__cell--numeric">37</td>
              <td class="mdc-data-table__cell mdc-data-table__cell--numeric">4.33333333333</td>
              <td class="mdc-data-table__cell">I like ice cream more</td>
            </tr>
            <tr class="mdc-data-table__row">
              <th 
                class="mdc-data-table__cell" 
                scope="row">Eclair</th>
              <td class="mdc-data-table__cell mdc-data-table__cell--numeric">24</td>
              <td class="mdc-data-table__cell mdc-data-table__cell--numeric">6.0</td>
              <td class="mdc-data-table__cell">New filing flavor</td>
            </tr>
          </tbody>
        </table>
      </div>
      <label class="mdc-text-field mdc-text-field--filled">
        <span class="mdc-text-field__ripple"/>
        <span 
          id="my-label-id" 
          class="mdc-floating-label">Hint text</span>
        <input 
          class="mdc-text-field__input" 
          type="text" 
          aria-labelledby="my-label-id">
        <span class="mdc-line-ripple"/>
      </label>
    </div>
    <StyledButton 
      :size="btnSize" 
      primary 
      @click="changeBtn">button</StyledButton>
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
