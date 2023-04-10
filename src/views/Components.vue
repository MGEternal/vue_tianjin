<template>
    <div>
        <hero></hero>
        <viewshop></viewshop>
       
        <carousel></carousel>
    </div>
</template>
<script>
import Hero from "./components/Hero";
import Viewshop from "./components/Viewshop";

import Carousel from "./components/Carousel";
import Icons from "./components/Icons";

export default {
  name: "components",
  components: {
    Hero,
    Viewshop,
    Carousel
  }
};
</script>
