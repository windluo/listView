<template>
	<div class="ListViewContainer"
		@scroll="scrollHandle"
		ref="listview"
	>
		<div class="listview-data-container" ref="listviewdatacontaniner">
			<slot></slot>
		</div>
		<div class="listview-loading" v-show="isloadingShow">
			<div class="listview-loading-img" v-show="isloadingShow&&!nomore"></div>
			<span>{{loadingText}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		props: {
			onLoad: {
				type: Function
			},
			nomore: {
				type: Boolean,
				default: false
			}
		},

		data () {
			return {
				isloadingShow: false,
				loadingText: '加载中，请稍后...'
			}
		},

		events: {
			listViewLoading () {
				this.isloadingShow = false
			}
		},

		methods: {
			scrollHandle () {
				let scrollheight = this.$refs.listviewdatacontaniner.scrollHeight;	 //滚动区域的正文全高
      	let clientheight = this.$refs.listview.clientHeight;   //滚动区域容器的高度
      	let scrolltop = this.$refs.listview.scrollTop;		 //滚动高度
				
				if (clientheight + scrolltop + 30 >= scrollheight) {
					if (this.isloadingShow) return
					this.isloadingShow = true

					if (this.onLoad && !this.nomore) {
						this.loadingText = '加载中，请稍后...'
						this.onLoad()
							.then((res) => {
								this.isloadingShow = false
							})
							.catch((res) => {
								console.log(res)
							})
					}
				}
			}
		},

		watch: {
			nomore () {
				if (this.nomore) {
					this.loadingText = '没有更多了'
				}
			}
		},

		mounted () {
			this.$nextTick(() => {
				this.$refs.listview.style.height = document.documentElement.clientHeight + "px";
			})
		}
	}
</script>

<style lang="less">
	.ListViewContainer{
		overflow-x: hidden;
		overflow-y: auto;
		.listview-data-container{
			padding: 12px;
		}

		.listview-loading{
			padding-left: 12px;
			padding-right: 12px;
			padding-bottom: 12px;
			text-align: center;
		}

		.listview-loading-img{
			display: inline-block;
			width: 20px;
			height: 21px;
			background: url(../images/loading.png) no-repeat;
			background-size: 100% 100%;
			vertical-align: bottom;
			-webkit-animation: loadingRotate 0.8s infinite;
			animation: loadingRotate 0.8s infinite;
		}
	}
	@-webkit-keyframes loadingRotate{
		0%{transform: rotate(0deg)}
		12.5%{transform: rotate(45deg)}
		25%{transform: rotate(90deg)}
		37.5%{transform: rotate(135deg)}
		50%{transform: rotate(180deg)}
		62.5%{transform: rotate(225deg)}
		75%{transform: rotate(270deg)}
		87.5%{transform: rotate(315deg)}
		100%{transform: rotate(360deg)}
	}
	@keyframes loadingRotate{
		0%{transform: rotate(0deg)}
		12.5%{transform: rotate(45deg)}
		25%{transform: rotate(90deg)}
		37.5%{transform: rotate(135deg)}
		50%{transform: rotate(180deg)}
		62.5%{transform: rotate(225deg)}
		75%{transform: rotate(270deg)}
		87.5%{transform: rotate(315deg)}
		100%{transform: rotate(360deg)}
	}
</style>