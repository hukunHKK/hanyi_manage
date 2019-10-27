<template>
  <div class="my-modal-wrap" v-if="show">
    <slot></slot>
  </div>
</template>
<script>
import { log } from "util";
export default {
	props:{
		show:{
			default:true
		}
	},
  data() {
    return {}
  },
  methods: {
    ok() {
      console.log(12);
    },
    cancel() {
      console.log(22);
    },
    showDetail(index) {
      console.log(index);
      this.modal1 = true;
    }
  }
};
</script>
<style lang="stylus">
.my-modal-wrap{
  position: absolute;
	top: 64px;
	bottom: 0;
	left: 0;
	right:0;
	z-index: 999;
	background-color:#fff;
	overflow:auto;
}
</style>