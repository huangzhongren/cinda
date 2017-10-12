<template>
	<div v-text='onBank'>
		
	</div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
	export default(){
		data(){
			return {

			}
		},
		methods:{
			//...mapActions(['set'])
		},
		computed:{
			...mapGetters(['onBank'])
		}

	}
</script>
