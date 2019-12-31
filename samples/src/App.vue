<template>
  <div id="app">
    <img id="gimg" src="./assets/logo.png" @click="showChange(true, $event)" />
    <drawimgmodal
      ref="drawmodal"
      :confirmText="modalContent"
      :is-show="showModal"
      @showChange="showChange"
      @updateImg="updateImg"
    ></drawimgmodal>
  </div>
</template>

<script>
//import drawimgmodal from 'vue-drawimg'

export default {
  name: "app",
  components: {
    //drawimgmodal
  },
  data() {
    return {
      showCancle: true,
      modalContent: "确认优化",
      showModal: false,
      editImg: null
    };
  },
  methods: {
    showChange(v, e) {
      if (v) {
        this.editImg = e.target;
        this.$refs.drawmodal.openOptimg(e.target.src);
      } else {
        this.editImg = null;
      }
      this.showModal = v;
    },
    updateImg(value) {
      if (value != undefined && value.length > 0) {
        this.editImg.src = value;
      }
      this.showModal = false;
    }
  }
};
</script>

<style>
</style>
