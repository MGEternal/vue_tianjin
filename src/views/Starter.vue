<template>
    <div>
           <hero2></hero2>
        <shop></shop>
        <paypal></paypal>
        <carousel></carousel>
    </div>
</template>
<script>
import Hero2 from "./components/Hero2";
import Shop from "./components/Shop";

import Carousel from "./components/Carousel";
import Icons from "./components/Icons";
import Paypal from './components/Paypal';
export default {
  name: "components",
  components: {
    Hero2,
    Shop,
    Paypal,
    Carousel
    
  }
};
</script>
<style>
</style>
