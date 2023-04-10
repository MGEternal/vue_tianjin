<template>

            

                   <div class="container px-4 px-lg-5 mt-5">
           
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div  ref="paypal"></div>
                </div>
               </div>
        

</template>
<script>

export default {
  components: { 

   },
props: ['categories', 'subcategories'],
    data(){
        return{
            loaded: false,
            showpaypal: false,
            loadding: false,
      paidFor: false,
      product: {
        price: 3.99,
        description: "backlink from"
      },
            form: new Form({
                url: '',
                email: '',
                title: '',
                shortdescription: '',
                description:'',
                img: '',
                category_id:'1',
                subcategory_id:'',
            })
        }
    },
     mounted: function() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=Afu5o0exNDQCNf53iTr6GsXyb_f73zhoqnZsIAzr4SAET2JY06YPPjc5w93TYJJbrR6XSzirGlLfZf8q";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
methods: {
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
          onApprove: async (data, actions, resp) => {
            this.loadding = true;
            const order = await actions.order.capture();
            this.data;
            this.paidFor = true;
            this.loadding = false;
            window.location.href = "./paymentsuccess/" +this.resp;
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    },
    submitDomain(){
        let data = new FormData();
        data.append('title', this.form.title);
        data.append('url', this.form.url);
        data.append('email', this.form.email);
        data.append('shortdescription', this.form.shortdescription);
        data.append('description', this.form.description);
        data.append('category_id', this.form.category_id);
        data.append('subcategory_id', this.form.subcategory_id);
        if(document.getElementById('img').files[0]){data.append('img', document.getElementById('img').files[0])};
        axios.post('/domain', data)
        .then( (response)=> {
            this.form.reset();
            this.showpaypal = true;
           this.resp= response.data;
        })
        .catch(error => this.form.errors.record(error.response.data));
    }
},
 computed: {
        filteredSubcategories: function() {
            return this.subcategories.filter((item) => item.category_id == this.form.category_id);    
     }
    },
}

</script>