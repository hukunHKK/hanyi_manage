import Vue from 'vue'
Vue.filter('listToStr',function(value) {
  if (value.length === 0) {
    return "";
  } else if (value.length === 1) {
    return "含 " + value.join("、");
  } else {
    return "含 " + value.join("、") + "；";
  }
})