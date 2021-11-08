<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-10">Customer</h2>
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
      >
        <!-- <button class="btn btn-primary shadow-md mr-2" v-on:click="clickManage()">Add New Creator</button> -->
       
        <!-- <div class="dropdown">
          <button
            class="dropdown-toggle btn px-2 box text-gray-700 dark:text-gray-300"
            aria-expanded="false"
          >
            <span class="w-5 h-5 flex items-center justify-center">
              <PlusIcon class="w-4 h-4" />
            </span>
          </button>
          <div class="dropdown-menu w-40">
            <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
              <a
                href=""
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <PrinterIcon class="w-4 h-4 mr-2" /> Print
              </a>
              <a
                href=""
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <FileTextIcon class="w-4 h-4 mr-2" /> Export to Excel
              </a>
              <a
                href=""
                class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >
                <FileTextIcon class="w-4 h-4 mr-2" /> Export to PDF
              </a>
            </div>
          </div>
        </div> -->
        <div class="hidden md:block mx-auto text-gray-600">
         
        </div>
        <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <div class="w-56 relative text-gray-700 dark:text-gray-300">
            <input
              type="text"
              class="form-control w-56 box pr-10 placeholder-theme-13"
              placeholder="Search..."
            />
            <SearchIcon
              class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
            />
          </div>
        </div>
      </div>
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <table class="table table-report -mt-2">
          <thead>
            <tr>
              <th class="whitespace-nowrap">IMAGES</th>
              <th class="whitespace-nowrap">User Name</th>
              <th class="text-center whitespace-nowrap">NAME</th>
              <th class="text-center whitespace-nowrap">AVATA</th>
              <th class="text-center whitespace-nowrap">MAIL</th>
            </tr>
          </thead>
          <tbody>
             <!-- <tr
              v-for="(faker, fakerKey) in $_.take($f(), 9)"
              :key="fakerKey"
              class="intro-x"
            > -->
            <tr              
              v-for="info in userInfo" 
              class="intro-x"
            >
              <td class="w-40">
                <div class="flex">
                  <!-- <div class="w-10 h-10 image-fit zoom-in">
                    <Tippy
                      tag="img"
                      alt="Icewall Tailwind HTML Admin Template"
                      class="rounded-full"
                      :src="require(`@/assets/images/${faker.images[0]}`)"
                      :content="`Uploaded at ${faker.dates[0]}`"
                    />
                  </div>
                  <div class="w-10 h-10 image-fit zoom-in -ml-5">
                    <Tippy
                      tag="img"
                      alt="Icewall Tailwind HTML Admin Template"
                      class="rounded-full"
                      :src="require(`@/assets/images/${faker.images[1]}`)"
                      :content="`Uploaded at ${faker.dates[0]}`"
                    />
                  </div>
                  <div class="w-10 h-10 image-fit zoom-in -ml-5">
                    <Tippy
                      tag="img"
                      alt="Icewall Tailwind HTML Admin Template"
                      class="rounded-full"
                      :src="require(`@/assets/images/${faker.images[2]}`)"
                      :content="`Uploaded at ${faker.dates[0]}`"
                    />
                  </div> -->
                </div>  
              </td>
              <td>
                <a href="" class="font-medium whitespace-nowrap">{{
                  info.name
                }}</a>
                <div class="text-gray-600 text-xs whitespace-nowrap mt-0.5">
                  {{ info.nickname }}
                </div>
              </td>
              <td class="text-center">{{ info.name  }}</td>
              <td class="text-center">{{ info.avata }}</td>
              <td class="text-center">{{ info.mail  }}</td>
          
              <td class="w-40">
                <div
                  class="flex items-center justify-center"
                  :class="{
                    'text-theme-20': info.description,
                    'text-theme-21': !info.description
                  }"
                >
                  <CheckSquareIcon class="w-4 h-4 mr-2" />
                  {{ info.description ? "Active" : "Inactive" }}
                </div>
              </td>
              <td class="table-report__action w-56">
                <div class="flex justify-center items-center">
                  <a class="flex items-center mr-3" href="javascript:;">
                    <CheckSquareIcon class="w-4 h-4 mr-1" />
                    Edit
                  </a>
                  <a
                    class="flex items-center text-theme-21"
                    href="javascript:;"
                    data-toggle="modal"
                    data-target="#delete-confirmation-modal"
                    v-on:click="addDeleteIndex(info.uid)"
                  >
                    <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- END: Data List -->
      <!-- BEGIN: Pagination -->
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
      >
        <ul class="pagination">
          <li>
            <a class="pagination__link" href="">
              <ChevronsLeftIcon class="w-4 h-4" />
            </a>
          </li>
          <li>
            <a class="pagination__link" href="">
              <ChevronLeftIcon class="w-4 h-4" />
            </a>
          </li>
          <li>
            <a class="pagination__link" href="">...</a>
          </li>
          <li>
            <a class="pagination__link" href="">1</a>
          </li>
          <li>
            <a class="pagination__link pagination__link--active" href="">2</a>
          </li>
          <li>
            <a class="pagination__link" href="">3</a>
          </li>
          <li>
            <a class="pagination__link" href="">...</a>
          </li>
          <li>
            <a class="pagination__link" href="">
              <ChevronRightIcon class="w-4 h-4" />
            </a>
          </li>
          <li>
            <a class="pagination__link" href="">
              <ChevronsRightIcon class="w-4 h-4" />
            </a>
          </li>
        </ul>
        <select class="w-20 form-select box mt-3 sm:mt-0">
          <option>10</option>
          <option>25</option>
          <option>35</option>
          <option>50</option>
        </select>
      </div>
      <!-- END: Pagination -->
    </div>
    <!-- BEGIN: Delete Confirmation Modal -->
    <div
      id="delete-confirmation-modal"
      class="modal"
      tabindex="-1"
      aria-hidden="true"
      ref="input"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="p-5 text-center">
              <XCircleIcon class="w-16 h-16 text-theme-21 mx-auto mt-3" />
              <div class="text-3xl mt-5">Are you sure?</div>
              <div class="text-gray-600 mt-2">
                Do you really want to delete these records? <br />This process
                cannot be undone.
              </div>
            </div>
            <div class="px-5 pb-8 text-center">
              <button
                type="button"
                data-dismiss="modal"
                class="btn btn-outline-secondary w-24 mr-1"
              >
                Cancel
              </button>
              <button type="button" class="btn btn-danger w-24" v-on:click="deleteBtn(uid)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Delete Confirmation Modal -->
  </div>
</template>
<!--<template>
<div>
    <div class="main-wrapper">
        <div class="main">-->
            <!-- <CustomerManage  v-bind:isHiddens="isHidden" v-on:nonViewPop="nonShow"/> -->
            <!--<div>
                <div>
                    <input type="text">
                    <button>검색</button>-->
                   <!-- <button v-on:click="clickManage()">고객등록</button> -->
                <!--</div>
            </div>
            <li v-for="info in userInfo" class="post">
              <div class="name">{{info.name}}</div>
              <div class="name">{{info.nickname}}</div>
              <div class="name">{{info.mail}}</div>
              <div class="name">{{info.kyc}}</div>
              <div class="name">{{info.avata}}</div>
            </li>
        </div>
    </div>
</div>
</template>-->
<script>
import UserService from '../services/user.service.js'

export default {
    data: function(){
        return {
            isHidden: true,
            userInfo:[],
            addIndex:""
        }
    },
    created: function() {
        UserService.list().then(
            res=>{
                console.log("ResInfo:", res)
                this.userInfo = res.data
            })
    },
    methods: {
      deleteBtn: function(uid) {
          console.log('uid'+uid)
          uid =this.addIndex
          console.log('id22'+uid)
          UserService.delete(uid).then(
              res=>{
                  console.log("ResInfo:", res)
                  // $('#delete-confirmation-modal').removeClass(".show");
                  // document.getElementById("").remove("show")
                  // element.className = "modal overflow-y-auto";
                  //삭제후 list api 불러서 다시 재로드
                  this.$refs.input.className = "modal overflow-y-auto";
                   UserService.list().then( 
                      res=>{
                          console.log("ResInfo:", res)
                          this.userInfo = res.data
                          
                      })
              }).catch(error => {
                 alert(error)
              });
        },
        addDeleteIndex : function(uid) {
          this.addIndex = uid
          if(this.$refs.input.className != "modal overflow-y-auto show"){
          this.$refs.input.className = "modal overflow-y-auto show";
          }
      }
    }
}
</script>
<!--<style scoped>
*{
    margin:0;
    padding:0;
}

.post {
    list-style: none;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    }
.name {
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  color: #42b883;
  margin-right: 5rem;
}
input {
    width:500px;
    height: 30px;
    border: 2px solid #000;
}
.main-wrapper {
    width:100%;
    height:100vh;
    background: #ccc;
}
.main {
    width:100%;
    height:100%;
    text-align: center;
    position:relative;
}
button {
    width:120px;
    height:30px;
    margin-left: 3%;
}
ul{
    text-align:center;
    margin: 2% 0;
}
li{
    display: inline;
    font-size: 23px;
    font-weight: 600;
    border:5px solid #000;
    padding:10px 50px;
    margin:0 1px;
}
</style>-->