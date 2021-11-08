<template>
<div>
<CmsTetris />
</div>
   
</template>

<script>

import AssetService from '../../services/asset.service.js'
import BlockchainService from '../../services/blockchain.service';
import Notify from "../../services/notification.service"
import CmsService from "../../services/cms.service"

import CmsTetris  from "../../custom-components/cms/cms-tetris.vue"

export default {
    setup() {
    },
    components: {
        CmsTetris
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
