<template>
    <div class="pro-wrapper" v-if="!isHiddens">
        <form @submit.prevent="submitForm" method="post" enctype="multipart/form-data">
            <p><span> 아이디 </span></p><input type="text" id="public_id" v-model="public_id">
            <p><span> public_name </span></p><input type="text" id="public_name" v-model="public_name">
            <p><span> 이름 </span></p><input type="text" id="name" v-model="name">
            <p><span> 영어이름 </span></p><input type="text" id="name_eng" v-model="name_eng">
            <p><span> 이미지등록 </span></p>
                <input type="file" id="avata_1" v-on:change="avata_1" @change="handleChange" v-if="!sourceImg.done">
                <img :src="sourceImg.img" class="w-20" v-else/>
            <p><span> 대표 이미지 </span></p>
                <input type="file" id="avata_1_min" v-on:change="avata_1_min" @change="handleChange2"  v-if="!sourceMainImg.done">
                <img :src="sourceMainImg.img" class="w-20" v-else/>
            <p><span> 썸네일 </span></p>
                <input type="file" id="avata_1_id" v-on:change="avata_1_id" @change="handleChange3" v-if="!sourceThumnails.done">
                <img :src="sourceThumnails.img" class="w-20" v-else/>
            <p><span> 상세 설명 </span></p><input type="text" id="description" v-model="description">
            <p><span> 커리어 </span></p><input type="text" id="role" v-model="role">
                <div class="button">
                <button type="submit"> 완료 </button>
                <button  class="close" v-on:click="closeButton()">닫기</button>
                </div>
        </form>
        
    </div>
</template>
<script>
import CreatorService from '../services/creator.service.js'
import UploadService from '../services/upload.service.js'

export default {
    data: function() {
        return {
           uid:"", 
           public_id:"",
           public_name:"",
           name:"",
           name_eng:"",
           description:"",
           avata_1:"", 
           avata_1_min:"", 
           avata_1_id:"", 
           role:"", 
           profile_id:"",
            sourceImg:{
                done:false,
                img:""
            },
            sourceMainImg:{
                done:false,
                img:""
            },
            sourceThumnails:{
                done:false,
                img:""
            }
        }
    },
   
    props: {
        isHiddens: Boolean,
    },
   
    methods:{
        closeButton: function(){
            console.log('1')
            // this.isHiddens = !this.isHiddens;
            this.$emit('nonViewPop');
            console.log(this.isHiddens)
        },
    handleChange(event) {
          console.log('handleChange Start')
          console.log('event.target.files',event.target.files);
        //   console.log("MediaInfo:::", MediaInfo)
        //   console.log('file received', file);
        const file = event.target.files[0]
        
        MediaInfo({ format: 'JSON' }, mediaInfo =>{
            if (file) {
                // console.log('file received', file);

                const reader = new FileReader();
                const getSize = () => file.size;
                const readChunk = (chunkSize, offset) =>
                    new Promise((resolve, reject) => {
                        
                        reader.onload = (event) => {
                            if (event.target.error) {
                            reject(event.target.error);
                            }
                            resolve(new Uint8Array(event.target.result));
                        }
                        reader.readAsArrayBuffer(file.slice(offset, offset + file.size));
                    })

                mediaInfo.analyzeData(getSize, readChunk)
                    .then((info) => {
                        // this.$refs.ta.value = JSON.stringify(result, null, 2);
                        console.log('result:::', info)
                        UploadService.media(file, 'account', info, reader).then(res=>{
                            console.log('res:::' +JSON.stringify(res.path))

                            console.log('파일:::' +JSON.stringify(file))
                            console.log('파일:::' +JSON.stringify(file))
                            console.log('인포:::' +info)
                            console.log('리더:::' +JSON.stringify(reader))

                        let imgPath = res.path
                        console.log(imgPath)
                        this.sourceImg.done = true;
                        this.sourceImg.img = "https://parular-contents.s3.ap-northeast-2.amazonaws.com/"+ imgPath
                        
                        this.avata_1 = this.sourceImg.img;
                        // console.log('this.avata_1'+this.avata_1)
                       })
                    })
                    .catch((error) => {
                    console.error(error);
                    });
            }
        })
      },
      handleChange2(event) {
          console.log('handleChange Start')
          console.log('event.target.files',event.target.files);
        //   console.log("MediaInfo:::", MediaInfo)
        //   console.log('file received', file);
        const file = event.target.files[0]
        
        MediaInfo({ format: 'JSON' }, mediaInfo =>{
            if (file) {
                // console.log('file received', file);

                const reader = new FileReader();
                const getSize = () => file.size;
                const readChunk = (chunkSize, offset) =>
                    new Promise((resolve, reject) => {
                        
                        reader.onload = (event) => {
                            if (event.target.error) {
                            reject(event.target.error);
                            }
                            resolve(new Uint8Array(event.target.result));
                        }
                        reader.readAsArrayBuffer(file.slice(offset, offset + file.size));
                    })

                mediaInfo.analyzeData(getSize, readChunk)
                    .then((info) => {
                        // this.$refs.ta.value = JSON.stringify(result, null, 2);
                        console.log('result:::', info)
                        UploadService.media(file, 'account', info, reader).then(res=>{
                            console.log('res:::' +JSON.stringify(res.path))

                            console.log('파일:::' +JSON.stringify(file))
                            console.log('파일:::' +JSON.stringify(file))
                            console.log('인포:::' +info)
                            console.log('리더:::' +JSON.stringify(reader))

                        let imgPath = res.path
                        console.log(imgPath)
                        this.sourceMainImg.done = true;
                        this.sourceMainImg.img = "https://parular-contents.s3.ap-northeast-2.amazonaws.com/"+ imgPath
                        
                        this.avata_1_min = this.sourceMainImg.img;
                        // console.log('this.avata_1_id'+this.avata_1_id)
                       })
                    })
                    .catch((error) => {
                    console.error(error);
                    });
            }
        })
      },
      handleChange3(event) {
          console.log('handleChange Start')
          console.log('event.target.files',event.target.files);
        //   console.log("MediaInfo:::", MediaInfo)
        //   console.log('file received', file);
        const file = event.target.files[0]
        
        MediaInfo({ format: 'JSON' }, mediaInfo =>{
            if (file) {
                // console.log('file received', file);

                const reader = new FileReader();
                const getSize = () => file.size;
                const readChunk = (chunkSize, offset) =>
                    new Promise((resolve, reject) => {
                        
                        reader.onload = (event) => {
                            if (event.target.error) {
                            reject(event.target.error);
                            }
                            resolve(new Uint8Array(event.target.result));
                        }
                        reader.readAsArrayBuffer(file.slice(offset, offset + file.size));
                    })

                mediaInfo.analyzeData(getSize, readChunk)
                    .then((info) => {
                        // this.$refs.ta.value = JSON.stringify(result, null, 2);
                        console.log('result:::', info)
                        UploadService.media(file, 'account', info, reader).then(res=>{
                            console.log('res:::' +JSON.stringify(res.path))

                            console.log('파일:::' +JSON.stringify(file))
                            console.log('파일:::' +JSON.stringify(file))
                            console.log('인포:::' +info)
                            console.log('리더:::' +JSON.stringify(reader))

                        let imgPath = res.path
                        console.log(imgPath)
                        this.sourceThumnails.done = true;
                        this.sourceThumnails.img = "https://parular-contents.s3.ap-northeast-2.amazonaws.com/"+ imgPath
                        
                        this.avata_1_id = this.sourceThumnails.img;
                        // console.log('this.avata_1_min'+this.avata_1_min)
                       })
                    })
                    .catch((error) => {
                    console.error(error);
                    });
            }
        })
      },
        submitForm: function(){
           var id = this.id; 
           var public_id = this.public_id;
           var public_name =this.public_name;
           var name = this.name;
           var name_eng = this.name_eng;
           var description = this.description;
           var avata_1 =this.avata_1; 
           var avata_1_min = this.avata_1_min; 
           var avata_1_id =this.avata_1_id; 
           var role = this.role;
           var profile_id= this.profile_id;
           CreatorService.create(
               id, 
               public_id, 
               public_name, 
               name, name_eng, 
               description, 
               avata_1, 
               avata_1_min, 
               avata_1_id, 
               role, 
               profile_id
           ).then(res=>{
                console.log("Resssss:", res)
                this.$emit('nonViewPop');
                this.$emit('DoRefresh');
                console.log(this.isHiddens)
                this.user_id=""; 
                this.public_id="";
                this.public_name="";
                this.name="";
                this.name_eng="";
                this.description="";
                this.avata_1=""; 
                this.avata_1_min=""; 
                this.avata_1_id=""; 
                this.role="";
                this.profile_id="";
                this.sourceThumnails.img="";
                this.sourceThumnails.done=false;
                this.sourceMainImg.img="";
                this.sourceMainImg.done=false;
                this.sourceImg.img="";
                this.sourceImg.done=false;
            })
        }
    }

}
</script>

<style scoped>
*{
    margin:0;
    padding:0;
}
.pro-wrapper {
    width:30%;
    height: 85vh;
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
    height:100%;
    margin: 0 auto;
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
    width:95%;
    display: flex;
    justify-content: flex-end;
}

</style>
