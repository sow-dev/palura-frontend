<template>
<div>
    <div class="grid ">
        <div class="intro-y col-span-12 lg:col-span-6">
            <!-- BEGIN: Form Layout -->
            <div class="intro-y box p-5">
                <div class="mt-3">
                    <label for="name" class="form-label">Name</label>
                    <input id="name" type="text" class="form-control w-full" v-model="ds.name" placeholder="" />
                </div>
                <div class="mt-3">
                    <label for="short_name" class="form-label">Short name</label>
                    <input id="short_name" type="text" class="form-control w-full" v-model="ds.short_name"
                        placeholder="" />
                </div>
                <div class="mt-3">
                    <label class="form-label"></label>
                    <div class="sm:grid grid-cols-2 gap-2">
                        <div class="input-group">
                            <div id="input-group-3" class="input-group-text">Chain</div>
                            <input type="text" class="form-control" v-model="ds.chain" placeholder=""
                                aria-describedby="input-group-3" />
                        </div>
                        <div class="input-group">
                            <div id="input-group-3" class="input-group-text">Chain ID</div>
                            <input type="text" v-model="ds.chain_id" class="form-control" placeholder=""
                                aria-describedby="input-group-3" />
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <label class="form-label"></label>
                    <div class="sm:grid grid-cols-2 gap-2">
                        <div class="input-group">
                            <div id="input-group-3" class="input-group-text">Network</div>
                            <input type="text" class="form-control" v-model="ds.network" placeholder=""
                                aria-describedby="input-group-3" />
                        </div>
                        <div class="input-group">
                            <div id="input-group-3" class="input-group-text">Network ID</div>
                            <input type="text" v-model="ds.network_id" class="form-control" placeholder=""
                                aria-describedby="input-group-3" />
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <label for="name" class="form-label">Currency Name</label>
                    <input id="name" type="text" class="form-control w-full" v-model="ds.currency_name"
                        placeholder="" />
                </div>
                <div class="mt-3">
                    <label class="form-label"></label>
                    <div class="sm:grid grid-cols-2 gap-2">
                        <div class="input-group">
                            <div id="input-group-3" class="input-group-text">Currency Symbol</div>
                            <input type="text" class="form-control" v-model="ds.currency_symbol" placeholder=""
                                aria-describedby="input-group-3" />
                        </div>
                        <div class="input-group">
                            <div id="input-group-3" class="input-group-text">Currency Decimals</div>
                            <input type="text" v-model="ds.currency_decimals" class="form-control" placeholder=""
                                onchange="this.value=parseInt(this.value); if(this.value>18)this.value=18; if(this.value<0)this.value=0;"
                                aria-describedby="input-group-3" />
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <label for="icon_thumbnail" class="form-label">icon thumbnail</label>
                    <input id="icon_thumbnail" type="text" class="form-control w-full" v-model="ds.icon_thumbnail"
                        placeholder="http://icon-thumbnail-url" />
                </div>

                <div class="mt-3">
                    <label for="explorer_url" class="form-label">Explorer Url</label>
                    <input id="explorer_url" type="text" class="form-control w-full" v-model="ds.explorer_url"
                        placeholder="http://explorer-url" />
                </div>

                <div class="mt-3">
                    <label>Enable</label>
                    <div class="mt-2">
                        <input type="checkbox" class="form-check-switch" v-model="ds.enable" />
                    </div>
                </div>
            </div>
            <!-- END: Form Layout -->
        </div>
    </div>
</div>
</template>

<script >

export default {
    props: {
        ds: {
            name: String,
            short_name: String,
            chain: String,
            network: String,
            chain_id: Number,
            network_id: Number,
            currency_name: String,
            currency_symbol: String,
            currency_decimals: Number,
            icon_thumbnail: String,
            explorer_url: String,
            info_url: String,
            enable: Boolean
        },
    },
    methods: {
        save: function () {

        },
        edit: function () {

        }
    }
}
</script>
