<template>
<div>
    
<cmsCarousel />
</div>
   
</template>

<script>

import AssetService from '../../services/asset.service.js'
import BlockchainService from '../../services/blockchain.service';
import Notify from "../../services/notification.service"
import CmsService from "../../services/cms.service"

import CmsCarousel  from "../../custom-components/cms/cms-carousel.vue"

export default {
    setup() {
    },
    components: {
        CmsCarousel
    },
    data: function(){
        return {
            ds:[]
        }
    },
     created: function() {
    },
    props:[],
    methods: {
        
    }
}
</script>
