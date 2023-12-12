<script lang="ts" setup>
import { ref } from "vue";

const editable = ref(false);

function clickEdit() {
  editable.value = !editable.value;
}
</script>
<template>
    <button @click="clickEdit" class="custom-btn ProfileButton">    {{!editable?'Edit':'Save'}}</button>
</template>
<style scoped>
.custom-btn {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 130px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: "Lato", sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
  }
.ProfileButton {
  background-color: #f77062;
  background-image: linear-gradient(315deg, #f77062 0%, #fe5196 74%);
  border: none;
  z-index: 1;
}
.ProfileButton:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  border-radius: 5px;
  background-color: #f77062;
  background-image: linear-gradient(315deg, #f77062 0%, #fe5196 74%);
  box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
  transition: all 0.3s ease;
}
.ProfileButton:hover {
  color: #fff;
}
.ProfileButton:hover:after {
  top: 0;
  height: 100%;
}
.ProfileButton:active {
  top: 2px;
}
</style>