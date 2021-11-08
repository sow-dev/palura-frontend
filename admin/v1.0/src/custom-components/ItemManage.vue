<template>
    <div class="pro-wrapper" v-show="!isHiddens">
        <!-- <form @submit.prevent="submitForm" method="post" enctype="multipart/form-data"> 
        <div>
            <p><span> 제목: </span></p><input type="text" id="name" v-model="name">
            <p><span> 이미지 등록: </span></p><input type="file" id="image" v-on:change="image" @change="handleChange">
            <p><span> 썸네일: </span></p><input type="file" id="thumbnail" v-on:change="thumbnail" @change="handleChange2">
            <p><span> 상세 설명: </span></p><input type="message" id="description" v-model="description">
             <div>
                <p><span> 발행수 </span></p>
                <input class="kindOfTokenInput" type="number" id="numberOfToken" v-model="numberOfToken" min="0.0001" step="0.0001">
                <p><span>종류</span></p>
                <select v-model="selectToken" class="selectToken">
                        <option disabled value="">Please select one</option>
                        <option>721</option> 
                        <option>1155</option>
                </select>
             </div>
            <p><span> 로얄 티: </span></p><input type="number" id="royalties" v-model="royalties" min="0.01" max="50" step="0.01">
            <p><span> contract_id: </span></p><input type="text" id="contract_id" v-model="contract_id">
            <p><span> collection_id: </span></p> <ContractSelector id="collection_id" v-model="collection_id" />
            <p><span> contract_type: </span></p><input type="text" id="contract_type" v-model="contract_type">
            <p><span> creator: </span></p>
                <select v-model="selectedCreator" class="selectedCreator">
                    <option disabled value="">Please select one</option>
                    <option 
                        v-for="item in creatorInfo" 
                        v-bind:key="item.id"
                        class="intro-x">{{item.public_name}}</option>
                </select>
           
            <p><span> owner: {{selectedCreator}}</span></p>
        </div> -->
        <ProductForm :ds="addObj" />
        <div>
            

            <!-- <input type="text" id="owner" ref="owner" v-model="owner" > -->
            <!-- <p><span> token_id: </span></p><input type="text" id="token_id" v-model="token_id"> -->
            <!-- <p><span> metadata_version: </span></p><input type="text" id="metadata_version" v-model="metadata_version"> -->
            <!-- <p><span> metadata: </span></p><input type="text" id="metadata" v-model="metadata"> -->
            <!-- <p><span> metadata_hist_id: </span></p><input type="text" id="metadata_hist_id" v-m odel="metadata_hist_id"> -->
            <!-- <p><span> metadata_url: </span></p><input type="text" id="metadata_url" v-model="metadata_url"> -->
            <!-- <p><span> content_media_id: </span></p><input type="text" id="content_media_id" v-model="content_media_id"> -->
            
        </div>
            <!-- <p><span> 대표 이미지: </span><input type="file" id="main_img" v-on:change="main_img"></p> -->
            <!-- <p><span> attribute: </span><input type="text" id="attribute" v-model="attribute"></p> -->
            <!-- <p><span> networkid: </span><input type="text" id="network_id" v-model="network_id"></p> -->
            <!-- <p><span> put_on_sale: </span><input type="text" id="put_on_sale" v-model="put_on_sale"></p>
            <p><span> ins_sale_price: </span><input type="text" id="ins_sale_price" v-model="ins_sale_price"></p>
            <p><span> purchase: </span><input type="text" id="purchase" v-model="purchase"></p> -->

            <!-- <p><span> 외부링크: </span><input type="text" ></p>
            <p><span> 이미지 레이아웃: </span><input type="text"></p> 
           
             <button type="submit" class="okok"> 완료 </button>
        </form>
        <div class="button">
         <button type="button" class="close" v-on:click="closeButton()">닫기</button>
        </div>
        -->
    </div>
</template>
<script>
import ProductService from '../services/product.service.js'
import UploadService from '../services/upload.service.js'
import Web3 from 'web3';
import {Parula} from "../parula-js/src/parula.js"
import CreatorService from '../services/creator.service.js'
import ContractSelector from './contract/contractSelector'
import ProductForm from './product/productForm'
export default {
    components:{
        ContractSelector,
        ProductForm
    },
    created: function() {
        this.addObj.selectedCreator = '0x1111'
        CreatorService.list().then(
            res=>{
                this.creatorInfo = res.data
                console.log("ResInfo:", res.data)
            })
    },
    computed: {
    web3() {
      // return this.$store.state.web3
      //
      let web3 = new Web3(window.web3.currentProvider);
      return web3;
    },
    // inputOwner(){
    //     if(this.selectedCreator!=""){
    //         this.$refs.owner.value=this.selectedCreator
    //         }
        
    //     },
  },
  
    data: function() {
        return {
            addObj: {
                name: "",
                description: "",
                sale: "",
                price: "",
                network_id: "",
                purchased: "",
                image: "",
                thumbnail: "",
                numberOfToken: "",
                royal: "",
                proper1: "",
                proper2: "",
                creator_id: "",
                owner_id: "",
                creatorInfo: [],
                selectToken: "",
                source: {
                    done: false,
                    img: "",
                },
                source2: {
                    done: false,
                    img: "",
                },
                bshows: true,
                selectedCreator: ""
            }
        }
        },
    props: {
        isHiddens: Boolean,
    },
    methods:{
        closeButton: function(){
            console.log('1')
            this.$emit("nonViewPop");
            console.log(this.isHiddens)
     
            thumbnail = "";
            image = "";
            this.resetValues()
            
        },
        
        console: function(){
        var abc = document.getElementById("input-file");
        var dfc = document.getElementById("fileName");
        dfc.innerText = abc.value;
        console.log(abc.value);
        },

      resetValues(){
          this.addObj.description="";
            this.addObj.name = "";
            this.addObj.source2.img="";
            this.addObj.source.img="";
            this.addObj.numberOfToken="";
            this.addObj.selectToken="";
            this.addObj.royalties="";
            this.addObj.contract_id="";
            this.addObj.collection_id="";
            this.addObj.contract_type="";
            this.addObj.state="";
            this.addObj.creator="";
            this.addObj.owner="";
            this.addObj.selectedCreator="";
            this.addObj.token_id="";
            this.addObj.metadata_version="";
            this.addObj.metadata="";
            this.addObj.metadata_hist_id="";
            this.addObj.metadata_url="";
            this.addObj.content_media_id="";  
      },
        // submitForm: function(){
        //     // var file = document.getElementById("image");
        //     // var filePath = file.value;
        //     // var filePathSplit = filePath.split('\\'); 
		// 	// 	//전체경로를 \로 나눈 길이.
		// 	// 	var filePathLength = filePathSplit.length;
		// 	// 	//마지막 경로를 .으로 나눔.
		// 	// 	var fileNameSplit = filePathSplit[filePathLength-1].split('.');
		// 	// 	//파일명 : .으로 나눈 앞부분
		// 	// 	var fileName = fileNameSplit[0];

            
        //     var name = this.name;
        //     console.log(name);
        //     var description = this.description;
        //     console.log(description);
        //     var thumbnail = this.source2.img;
        //     console.log(thumbnail);
        //      var image = this.source.img;
        //     console.log(image);
        //      var royalties = this.royalties;
        //     console.log(royalties);
        //      var properties_type = this.properties_type;
        //     console.log(properties_type);
        //      var properties_name = this.properties_name;
        //     console.log(properties_name);
        //      var network_id = this.network_id;
        //     console.log(network_id);
        //      var contract_id = this.contract_id;
        //     console.log(contract_id);
        //      var collection_id = this.collection_id;
        //     console.log(collection_id);
        //      var contract_type = this.contract_type;
        //     console.log(contract_type);
        //     var state = this.state;
        //     console.log(state);
        //     var creator_id = this.creator_id;
        //     console.log(creator_id);
        //     var owner_id = this.owner_id;
        //     console.log(owner_id);
        //     var attribute = this.attribute;
        //     console.log(attribute);
        //     var content_media_id = this.content_media_id;
        //     console.log(content_media_id);
        //     var put_on_sale = this.put_on_sale;
        //     console.log(put_on_sale);
        //     var ins_sale_price = this.ins_sale_price;
        //     console.log(ins_sale_price);
        //     var purchase = this.purchase;
        //     console.log(purchase);


        //     console.log("끝")
        //     ProductService.insert(
        //         name, description,
        //         royalties, properties_type, properties_name, 
        //         image, thumbnail,
        //         network_id, contract_id, 
        //         collection_id, contract_type, 
        //         state, creator_id, 
        //         owner_id, attribute,
        //         content_media_id,
              
        //     )
        //     .then(res=>{
        //         console.log("111")
        //         console.log("Res:", res)
        //         console.log(res.config.data)
        //         // console.log(file)
        //         // console.log(image)
        //         // console.log('파일 경로 : ' + filePath);
		// 		// console.log('파일명 : ' + fileName);
        //     })
        // },
         submitForm: 
            async function (){ //mint 로직 createAsset
                const accounts =  await ethereum.request({ method: 'eth_requestAccounts' });
                console.log('$$$$$$')
                const account = accounts[0];
                // const accounts =  await ethereum.request({ method: 'eth_requestAccounts' });
                console.log('$$$$$$')
                console.log('web3 '+window.ethereum.stringify)
                console.log('window.ethereum.chainId '+window.ethereum.chainId)

                const parula = new Parula(window.ethereum, {}, line=>console.info('[*] ',line));
                console.log('parula '+parula)
                // console.log('parula.stringify '+parula.stringify)

                console.log('accounts '+accounts)        
                
                // make metadata url
                var metadata_url = 'https://api.parula.io/asset/metadata/1'


                const ret = await parula.createProduct(accounts[0], metadata_url);
                // ret : { blockNumber, txHash, contractAddress, tokenId, from, to, isMinted }, if succeed
                console.log('ret '+ret.toString())
                const retLast = await this.productInsertAPI(ret);
                console.log('retLast'+retLast)
                // location.href="/createcollection.html";  
        },
         productInsertAPI: 
        function(ret){
            console.log(ret.toString())
            
            var name = this.addObj.name;
            console.log(name);
            var description = this.addObj.description;
            console.log(description);
            var thumbnail = this.addObj.source2.img;
            console.log(thumbnail);
             var image = this.addObj.source.img;
            console.log(image);
             var royalties = this.addObj.royalties;
            console.log(royalties);
             var contract_id = this.addObj.contract_id;
            console.log(contract_id);
             var collection_id = this.addObj.collection_id;
            console.log(collection_id);
             var contract_type = this.addObj.contract_type;
            console.log(contract_type);
            var state = this.addObj.state;
            console.log(state);
            var creator = this.addObj.selectedCreator; //선택된 저장값
            console.log(creator);
            var owner = this.addObj.selectedCreator; //선택된 저장값 (우선 창작자와 오너는 같다)
            console.log(owner);
            var token_id = ret.tokenId;
            console.log(token_id);
            var metadata_version = this.addObj.metadata_version;
            console.log(metadata_version);
            var metadata = this.addObj.metadata;
            console.log(metadata);
            var metadata_hist_id = this.addObj.metadata_hist_id;
            console.log(metadata_hist_id);
            var metadata_url = this.addObj.metadata_url;
            console.log(metadata_url);


            var content_media_id = this.addObj.content_media_id;
            console.log(content_media_id);
            // var attribute = this.attribute;
            // console.log(attribute);
            //  var network_id = this.network_id;
            // console.log(network_id);
            // var put_on_sale = this.put_on_sale;
            // console.log(put_on_sale);
            // var ins_sale_price = this.ins_sale_price;
            // console.log(ins_sale_price);
            // var purchase = this.purchase;
            // console.log(purchase);


            console.log("끝")
            ProductService.insert(
                name, description, royalties, token_id, metadata_version, metadata, image, thumbnail, 
                metadata_hist_id, metadata_url, contract_id, collection_id, contract_type, state, creator, owner, 
                content_media_id,
              
            )
            .then(res=>{
                console.log("111")
                console.log("Res:", res)
                console.log(res.config.data)
                this.$emit('nonViewPop');
                this.$emit('DoRefresh');
                var name = this.addObj.name;
            console.log(name);

            this.description;
            this.nname = "";
            this.source2.img="";
            this.source.img="";
            thumbnail = "";
            image = "";
            this.numberOfToken="";
            this.selectToken="";
            this.royalties="";
            this.contract_id="";
            this.collection_id="";
            this.contract_type="";
            this.state="";
            this.creator="";
            this.owner="";
            this.selectedCreator="";
            this.token_id="";
            this.metadata_version="";
            this.metadata="";
            this.metadata_hist_id="";
            this.metadata_url="";
            this.content_media_id="";            
            })
            }
    },

}
</script>
<style scoped>
*{
    margin:0;
    padding:0;
}
.pro-wrapper {
    width:33%;
    height: 90vh;
    position: absolute;
    top: -90px;
    left:15%;
    border: 3px solid #172443;
    border-radius: 20px;
    margin:0 auto;
    background:#fff;
    text-align: center;

}

form{
    width:90%;
    height:50%;
    margin: 0 auto;
    padding: 2vw;
    text-align: left;
    display:table-cell;
    margin-left: 5%;
    z-index:9999;
}

form  p, form  input {
margin-top: 2%;
margin-left: 5%;
}
/* form > p > span {
    width:200px;
    border: 1px solid #000;
    display: inline-block;
    height:20px;
} */
form  input {
    width:20vw;
    height:30px;
    border:1px solid #ccc;
    border-radius: 5px;
}
button {
    font-size: 25px;
    width: 120px;
    height:50px;
    margin-left: 5%;
    margin-top:5%;
    border: 1px solid #ccc;
    background:#ccc;
    border-radius: 10px;
}
.button {
   display: flex;
   position:absolute;
   right:25%;
   bottom:7%;
}
form > div:nth-child(1){
    float:left;
    width:50%;
}
form > div:nth-child(2){
    overflow: hidden;
    width:50%;
}
.okok {
    position:absolute;
    right:55%;
    bottom:7%;
}
.close{
    padding: 0;
    margin: 0;
}
.selectedCreator {
    margin-left: 0.9rem;
}
.selectToken {
    margin-left: 0.9rem;
}

.kindOfTokenInput {
    width: 5vw;
}
.kindOfToken {
    margin-left: 10rem;
}
</style>
