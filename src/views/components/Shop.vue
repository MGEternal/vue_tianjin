
<template>
   <!--main page-->
<section class="section-shop">
    
       <div class="container px-4 px-lg-5 mt-5">
           
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            
            <div class="col mb-4" v-for="item in products" >
                
                <div class="card h-100">
                    <!-- Product image-->
                    <img class="card-img-top" :src="item.img" >
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <a href="#" ><h5 class="fw-bolder">{{item.name}}</h5></a>
                            <!-- Product price-->
                            ￥{{item.price}}
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <a href="#cart"><div class="text-center"><button class="btn btn-primary" @click="addcart(item)" >Add to Cart</button></div></a>
                    </div>
                </div>
            </div>
           
           
            
        </div>
        <div class="col" style="overflow-x:auto;" id="cart" v-if="carts!=0">  
            
            <h2><i class="fa fa-shopping-cart"></i>Cart</h2>
            
            <table class="table table-bordered" >
                <thead class="thead-light"> 
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Piece</th>
                        <th scope="col">Total</th>
                        <th scope="col">Delete</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cart in carts">
                        <td><img :src="cart.img" alt="" width="100px" height="120px"></td>
                        <td>{{cart.name}}</td>
                        <td>{{cart.price}}</td>
                        <td>
                            <i class="fa fa-minus qty-minus" @click="minusqty(cart)"></i> 
                            {{cart.qty}} 
                            <i class="fa fa-plus qty-plus" @click="plusqty(cart)"></i>
                        </td>
                        <td>{{cart.total}}</td>
                        <td><button class="btn btn-danger" @click="remove(cart)">
                            <i class="fa fa-trash"></i>
                            </button></td>
                    </tr>
                    <tr>
                        <td colspan="5">
                     <h3 >Total price ￥ {{total()}}</h3>
                     </td>
                        <td>
                            <button class="btn btn-primary">Pay</button>
                        </td>
                  
                </tr>
                </tbody>
               
            </table>
        
        </div>
        
    </div>
    
  </section>

</template>
<script>
export default {
    mounted:function(){
        const script = document.createElement("script");
        script.src = 
        "https://www.paypal.com/sdk/js?client-id=Afu5o0exNDQCNf53iTr6GsXyb_f73zhoqnZsIAzr4SAET2JY06YPPjc5w93TYJJbrR6XSzirGlLfZf8q";
        script.addEventListener("load",this.setLoaded);
        document.body.appendChild(script);
    }
    ,
   pay() {
     function isWeiXin() {
           //This is a ua judgment
        var ua = window.navigator.userAgent.toLowerCase();
        console.log(ua);
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
        } else {
          return false;
        }
      }
      if (isWeiXin()) {
                 // alert("WeChat"); According to the previous section, it can be judged that it is opened in WeChat.
                 // Backend returns the required data
        this.$axios({
          method: "post",
                     Url: "", //your interface address
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
          .then(res => {
            //console.log(res);  
            var that = this;
            if (res.data.status == 1) {
              function onBridgeReady() {
                // const pay_params = JSON.parse(params);
                var str =
                  "appId=" +
                  res.data.data.appId +
                  "&timeStamp=" +
                  res.data.data.timeStamp +
                  "&nonceStr=" +
                  res.data.data.nonceStr +
                  "&prepay_id=" +
                  res.data.data.package +
                  "&signType=" +
                  res.data.data.signType +
                  "&paySign=" +
                  res.data.data.sign;
                console.log(str);
                WeixinJSBridge.invoke(
                  "getBrandWCPayRequest",
                  {
                                         appId: res.data.data.appId, //public name, passed by the merchant
                                         timeStamp: res.data.data.timeStamp, //timestamp, seconds since 1970
                                         nonceStr: res.data.data.nonceStr, //random string
                    package: res.data.data.package,
                                         signType: res.data.data.signType, // WeChat signature:
                                         paySign: res.data.data.sign //WeChat signature sign
                  },
                  function(res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                                         //This is a callback to successfully send WeChat payment, where you can jump to the successful payment page, and your business logic
                                             that.paymentData = "Payment success";
                                             // Use the above method to judge the front end return, WeChat team solemnly prompts:
                                             //res.err_msg will return ok after the user has successfully paid, but it is not guaranteed to be absolutely reliable.
                    } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                         //This is a callback to cancel the WeChat payment, where you can jump to the page you have canceled, and your business logic
                      
                    } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                                         //This is a callback to delay the WeChat payment failure.
                   }
                   
                                         // alert(JSON.stringify(res)); //This can pop up the message of failure or success of the WeChat payment.
                  }
                );
              }
              onBridgeReady();
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
                 // alert('WeChat outside') According to the previous ua judgment, we can judge that WeChat payment is made outside WeChat.
                 // Request relevant data to the background
        // this.$axios({
        //     method: "post",
                 // url: "", your interface address
        //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        //   })
        //   .then(res => {
        //       console.log(res)
        //   })
                 // console.log(this.$refs.link) returns the payment path
                 // this.$refs.link.href = ""; Jump Payments page
      }
    } 
  ,data(){
      return{
          carts:[],
          it1:0,
          it2:0,
          it3:0,
          it4:0,
          it5:0,
          it6:0,
          it7:0,
          it8:0,
          it9:0,
          it10:0,
          it11:0,
          it12:0,
          it13:0,
          it14:0,
          it15:0,
          it16:0,
          it17:0,
          it18:0,
          it19:0,
          it20:0,
          it21:0,
          it22:0,
          it23:0,
          it24:0,
          it25:0,
          it26:0,
          it27:0,
          it28:0,
          it29:0,
          it30:0,
          it31:0,
          it32:0,
          it33:0,
          it34:0,
          it35:0,
          it36:0,
          it37:0,
          it38:0,
          it39:0,
          it40:0,
          
          products:[
              {
              id:1,
              name:'addidas-gold',
              price:550,
              img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvM7q8g0Uf8qIO0zrmcQIkhp585sYXDuw1MsPuRNPOIw8VeRJ-lgIV14Pca2q3BdqDEnJqqLM&usqp=CAc'
              },
              {
              id:2,
              name:'4UTURE RNR CNY',
              price:1333,
              img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGOdCjT1xpYOFQRNfeHmEsUGuPFZuHkB8li6vSxo5vElMm94NFDCvPIhy-DUFdquC3BPv46v0&usqp=CAc' 
              },
               {
              id:3,
              name:'test-black',
              price:233,
              img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq6s3OhgUXgxaLNiPU0LEbQhpEmhM38kXVzmMnBvwqxGV4DH-4MvmORM2GgboYAhad8of4tJWN&usqp=CAc' 
              },
               {
              id:4,
              name:'X9000L4',
              price:746,
              img:'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/0f3045c2c1e04f72968fabe5010da1d5_9366/X9000L4_FW8410_01_standard.jpg' 
              },
              {
              id:5,
              name:'ADIDAS BY STELLA MCCARTNEY ULTRABOOST X',
              price:1244,
              img:'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/6eddc2eb948a4f0a9d9eac6300a18d92_9366/adidas_by_Stella_McCartney_Ultraboost_X_FX3937_01_standard.jpg'
              },
              {
              id:6,
              name:'supernova-black',
              price:1011,
              img:'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/df69b2d4d07f41ce8429ac8b012f21fb_9366/ULTRABOOST_20_CITYLIGHT_GY5007_01_standard.jpg' 
              },
               {
              id:7,
              name:'ULTRABOOST 20 CITYLIGHT',
              price:1011,
              img:'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/df69b2d4d07f41ce8429ac8b012f21fb_9366/ULTRABOOST_20_CITYLIGHT_GY5007_01_standard.jpg'
              },
               {
              id:8,
              name:'ZX 2K BOOST',
              price:715,
              img:'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/07b91fb6e0d64325b262ac0200d5638b_9366/ZX_2K_Boost_FY5725_01_standard.jpg'
              },
              {
              id:9,
              name:'ULTRABOOST 4.0 DNA',
              price:1333,
              img:'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/57cf2d867c174ce6b0cdac6a01682dad_9366/Ultraboost_4.0_DNA_FY9336_01_standard.jpg'
              },
              {
              id:10,
              name:'ZX 2K BOOST',
              price:866,
              img:'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/495b9c9a7d074a02a548ab520120df90_9366/ZX_2K_BOOST_FX0066_01_standard.jpg'
              },
               {
              id:11,
              name:'ULTRABOOST DNA-black',
              price:1333,
              img:'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/37693c5aadfd47029ee7ac840150d9fe_9366/Ultraboost_DNA_GW4924_01_standard.jpg'
              },
               {
              id:12,
              name:'ADIDAS 4uture RNR CNY',
              price:550,
              img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw-10BhJmZvFezRvW83uhPY42RUuENpRl0-nvX2-7FSX7v6_XS9lhgF1IecN6_qnuZ_zy-uZLY&usqp=CAc'
              },
              {
              id:13,
              name:'ULTRA 4D 5',
              price:550,
              img:'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/d90117daae3f4d74afa2ac78011da87f_9366/Ultra_4D_5_G58158_01_standard.jpg'
              },
              {
              id:14,
              name:'supernova-black',
              price:1866,
              img:'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/d90117daae3f4d74afa2ac78011da87f_9366/Ultra_4D_5_G58158_01_standard.jpg'
              },
               {
              id:15,
              name:'Nike Air max 270 React SE',
              price:966,
              img:'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b089e489-b1e5-4bf0-bc41-cc0168d65b02/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-air-max-270-react-se-dr3Pn3.png'
              },
               {
              id:16,
              name:'Nike Air max 270',
              price:1120,
              img:'https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-air-max-270-2V5C4p.jpg'
              },
              {
              id:17,
              name:'Nike Air Presto',
              price:1140,
              img:'https://static.nike.com/a/images/t_default/7b7d84ee-2812-4a2a-b786-adb3a7a3d44b/air-presto-id-shoe.png'
              },
              {
              id:18,
              name:'Nike SuperRep Go',
              price:920,
              img:'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/3dfa1552-0fe1-42ac-8096-88e556cc8e02/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B9%80%E0%B8%97%E0%B8%A3%E0%B8%99%E0%B8%99%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B8%9C%E0%B8%B9%E0%B9%89-superrep-go-SMnpt6.png'
              },
               {
              id:19,
              name:'Nike Air Max III',
              price:920,
              img:'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d72a3e9b-bb1a-42ad-ba09-844e63adca00/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-air-max-plus-3-vcVJWH.png'
              },
               {
              id:20,
              name:'Nike Air Max Impact',
              price:510,
              img:'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/xvztligfqk3arefavufz/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%AA%E0%B9%80%E0%B8%81%E0%B9%87%E0%B8%95%E0%B8%9A%E0%B8%AD%E0%B8%A5-air-max-impact-98c6zd.png'
              },
              {
              id:21,
              name:'ULTRA 4D 5',
              price:1999,
              img:'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/3f01257d8ff34945b5c8ac4d013b0643_9366/Ultra_4D_5_G58159_01_standard.jpg'
              },
              {
              id:22,
              name:'Nike Wearallday',
              price:510,
              img:'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b89cb68c-2da6-4dac-9e64-b9c2ce7df166/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-wearallday-NpvSP5.png'
              },
               {
              id:23,
              name:'Nike ZoomX',
              price:2210,
              img:'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d7585a75-0c13-4e6f-8173-a2bd3b6a6c11/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B9%88%E0%B8%87-zoomx-vaporfly-next-BPqDMN.png'
              },
               {
              id:24,
              name:'Nike Court Vision Low',
              price:550,
              img:'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/hdjlb8wougxgtz1fk7as/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-court-vision-low-41zCWb.png'
              }
              
          ]
      }
  },
  methods:{
       setLoaded: function(resp) {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "USD",
                    value: this.product.price
                  }
                }
              ]
            });
          },
          onApprove: async (carts, actions, resp) => {
            this.loadding = true;
            const order = await actions.order.capture();
            this.carts;
            this.paidFor = true;
            this.loadding = false;
            window.location.href = "./paymentsuccess/" +this.resp;
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    }
      ,
     addcart:function(item){
            
                if(item.id==1){
                    this.it1+=1;
                    if(this.it1<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==2){
                    this.it2+=1;
                     if(this.it2<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }
                else if(item.id==3){
                    this.it3+=1;
                     if(this.it3<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==4){
                    this.it4+=1;
                     if(this.it4<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==5){
                    this.it5+=1;
                     if(this.it5<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==6){
                    this.it6+=1;
                     if(this.it6<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==7){
                    this.it7+=1;
                     if(this.it7<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==8){
                    this.it8+=1;
                     if(this.it8<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==9){
                    this.it9+=1;
                     if(this.it9<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==10){
                    this.it10+=1;
                     if(this.it10<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==11){
                    this.it11+=1;
                     if(this.it11<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==12){
                    this.it12+=1;
                     if(this.it12<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==13){
                    this.it13+=1;
                     if(this.it13<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==14){
                    this.it14+=1;
                     if(this.it14<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==15){
                    this.it15+=1;
                     if(this.it15<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==16){
                    this.it16+=1;
                     if(this.it16<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==17){
                    this.it17+=1;
                     if(this.it17<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==18){
                    this.it18+=1;
                     if(this.it18<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==19){
                    this.it19+=1;
                     if(this.it19<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==20){
                    this.it20+=1;
                     if(this.it20<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==21){
                    this.it21+=1;
                     if(this.it21<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==22){
                    this.it22+=1;
                     if(this.it22<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==23){
                    this.it23+=1;
                     if(this.it23<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==24){
                    this.it24+=1;
                     if(this.it24<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==25){
                    this.it25+=1;
                     if(this.it25<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==26){
                    this.it26+=1;
                     if(this.it26<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==27){
                    this.it27+=1;
                     if(this.it27<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==28){
                    this.it28+=1;
                     if(this.it28<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==29){
                    this.it29+=1;
                     if(this.it29<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==30){
                    this.it30+=1;
                     if(this.it30<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==31){
                    this.it31+=1;
                     if(this.it31<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==32){
                    this.it32+=1;
                     if(this.it32<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==33){
                    this.it33+=1;
                     if(this.it33<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==34){
                    this.it34+=1;
                     if(this.it34<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==35){
                    this.it35+=1;
                     if(this.it35<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==36){
                    this.it36+=1;
                     if(this.it36<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==37){
                    this.it37+=1;
                     if(this.it37<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==38){
                    this.it38+=1;
                     if(this.it38<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==39){
                    this.it39+=1;
                     if(this.it39<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }else if(item.id==40){
                    this.it40+=1;
                     if(this.it40<=1){
                        this.pushData(item)
                    }else{
                       var found = this.findindex(item);
                       this.carts[found].qty+=1;
                       this.carts[found].total=this.carts[found].qty*this.carts[found].price;
                    }
                }
            
       
     },
     pushData(item){
            this.carts.push({
             id:item.id,
             name:item.name,
             price:item.price,
             img:item.img,
             qty:1,
             total:item.price
         })
     },findindex(item){
         for(var i = 0 ; i<this.carts.length;i++){
             if(this.carts[i].id == item.id){
                 return i ;
             }
         }
         return -i ;
     },
      total:function(){
          var sum=0;
          this.carts.forEach(function(item){
            
                  sum+=item.total;
              
          });
          return sum;
      },
      minusqty:function(cart){
          cart.qty-=1;
          if(cart.qty<=1){
              cart.qty=1
          }
          cart.total=cart.price*cart.qty;
      },
      plusqty:function(cart){
          cart.qty+=1;
          
          cart.total=cart.price*cart.qty;
      },
      remove:function(cart){
          if(confirm("Do you want to cancel this?")){   
              var index=this.carts.indexOf(cart);
              this.carts.splice(index,1);
              if(cart.id==1){
                  this.it1=0;
              }else if(cart.id==2){
                  this.it2=0;
              }else if(cart.id==3){
                  this.it3=0;
              }else if(cart.id==4){
                  this.it4=0;
              }else if(cart.id==5){
                  this.it5=0;
              }else if(cart.id==6){
                  this.it6=0;
              }else if(cart.id==7){
                  this.it7=0;
              }else if(cart.id==8){
                  this.it8=0;
              }else if(cart.id==9){
                  this.it9=0;
              }else if(cart.id==10){
                  this.it10=0;
              }else if(cart.id==11){
                  this.it11=0;
              }else if(cart.id==12){
                  this.it12=0;
              }else if(cart.id==13){
                  this.it13=0;
              }else if(cart.id==14){
                  this.it14=0;
              }else if(cart.id==15){
                  this.it15=0;
              }else if(cart.id==16){
                  this.it16=0;
              }else if(cart.id==17){
                  this.it17=0;
              }else if(cart.id==18){
                  this.it18=0;
              }else if(cart.id==19){
                  this.it19=0;
              }else if(cart.id==20){
                  this.it20=0;
              }else if(cart.id==21){
                  this.it21=0;
              }else if(cart.id==22){
                  this.it22=0;
              }else if(cart.id==23){
                  this.it23=0;
              }else if(cart.id==24){
                  this.it24=0;
              }else if(cart.id==25){
                  this.it25=0;
              }else if(cart.id==26){
                  this.it26=0;
              }else if(cart.id==27){
                  this.it27=0;
              }else if(cart.id==28){
                  this.it28=0;
              }else if(cart.id==29){
                  this.it29=0;
              }else if(cart.id==30){
                  this.it30=0;
              }else if(cart.id==31){
                  this.it31=0;
              }else if(cart.id==32){
                  this.it32=0;
              }else if(cart.id==33){
                  this.it33=0;
              }else if(cart.id==34){
                  this.it34=0;
              }else if(cart.id==35){
                  this.it35=0;
              }else if(cart.id==36){
                  this.it36=0;
              }else if(cart.id==37){
                  this.it37=0;
              }else if(cart.id==38){
                  this.it38=0;
              }else if(cart.id==39){
                  this.it39=0;
              }else if(cart.id==40){
                  this.it40=0;
              }

          }
      }
  }
  
};

</script>
<style scoped>


.qty-minus{
    cursor: pointer;
    margin-right:20px ;
}
.qty-plus{
    cursor: pointer;
    margin-left:20px ;
}
</style>
