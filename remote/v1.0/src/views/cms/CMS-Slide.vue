<template>
<div>
<CmsSlide />
</div>
   
</template>

<script>

import AssetService from '../../services/asset.service.js'
import BlockchainService from '../../services/blockchain.service';
import Notify from "../../services/notification.service"
import CmsService from "../../services/cms.service"

import CmsSlide  from "../../custom-components/cms/cms-slide.vue"

export default {
    setup() {
    },
    components: {
        CmsSlide
    },
    data: function(){
        return {        }
    },
     created: function() {
    },
    props:[],
    methods: {
        
    }
}
</script>
