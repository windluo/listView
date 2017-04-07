<template>
	<div class="items">
		<list-view 
			:on-load="getDataLists"
			:nomore="nomore"
		>
			<div class="item-list" v-for="data in dataLists">
				{{data}}
			</div>
		</list-view>
	</div>
</template>

<script>
	import listView from './ListView'

	export default {
		data () {
			return {
				dataLists: [],
				loop: 1,
				nomore: false
			}
		},

		components: {
			listView
		},

		methods: {
			createDataLists () {
				let arr = []
				for (let i = (this.loop - 1) * 10; i < this.loop * 10; i++) {
					arr.push(`我是第${i + 1}条数据`)
				}

				this.dataLists = this.dataLists.concat(arr)
			},

			getDataLists () {
				console.log('Start：数据生成中...')
				return new Promise((resolve, reject) => {
					this.loop++
					if (this.loop > 4){
						this.nomore = true
						console.log('Nomore：没有更多数据了.')
						resolve()
					} else {
						setTimeout(() => {
							this.createDataLists()
							console.log('End：数据生成完成.')
							resolve()
						}, 1500)
					}
				})
			}
		},

		mounted () {
			this.createDataLists()
		}
	}
</script>

<style lang="less">
	body{margin: 0;}
	#app{
		max-width: 640px;
		overflow: hidden;
		margin: 0 auto;
	}
	.item-list{
		height: 100px;
		border: 1px solid #e5e5e5;
		padding: 12px;
		color: #333;
		font-size: 14px;
		font-weight: bold;
		margin-bottom: 12px;
		&:last-of-type{
			margin-bottom: 0;
		}
	}
</style>