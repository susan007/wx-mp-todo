<template>
	<div class="content">
		<h3 style="background-color: #efefef;">用户信息</h3>
		<div style="margin: 1rem 1rem;border-bottom: 1px solid #efefef;">
			<label>用户名：</label>
			<span>{{userName}}</span>
		</div>
		<div style="margin: 1rem 1rem;border-bottom: 1px solid #efefef;">
			<label>密码：</label>
			<span>{{userPassword}}</span>
		</div>
		<h3 style="background-color: #efefef;">信息列表</h3>
		<ul style="color: white;">
			<li v-for="(item, index) in items" :key="index" :style="`background-color:${item.color || '#2782D7'};border:1px solid white`">
			<icon :type="item.type" size="18"/>
			{{item.title}}
			<icon class="clear" type="clear" @click="deleteItem(index)"/>
			</li>
		</ul>
		
		<div class="addItem" @click="addItem">
			新增条目+
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: '设备编码',
				num: '',
				userName: '',
				userPassword: '',
				items: [
					{
						title: '设备一',
						type: 'success',
						color: '#D84E43'
					},
					{
						title: '设备二',
						type: 'info',
						color: '#FFBE00'
					},
					{
						title: '设备三',
						type: 'warn'
					}
				]
			}
		},
		onLoad(options) {
			this.userName = options.userName
			this.userPassword = options.userPassword
		},
		onShareAppMessage() {
			uni.showToast({
				title: '感谢您的分享',
				position: 'top'
			})
		},
		methods: {
			getNum() {
				if (this.num) {
					uni.showToast({
						title: this.num,
						position: 'top'
					})
				} else {
					uni.showToast({
						title:'请输入设备编号',
						position: 'top'
					})
				}
				
			},
			addItem() {
				let self = this
				// 弹窗 填写todo内容
				uni.showModal({
					title: '添加事项',
					content: '',
					confirmText: '确认',
					confirmColor:'#10AEFF',
					cancelText: '取消',
					success: function(res) {
						if(res.confirm) {
							console.log('点击了确认')
							// 生成随机颜色
							const colors = ['#2782D7', '#D84E43', 'orange', '#FFBE00', '#1AAD19']
							const types = ['info', 'success', 'warn', 'waiting', 'download']
							const index = parseInt(Math.random()*5)
							const obj = {
								title: colors[index],
								type: types[index],
								color: colors[index]
							}
							self.items.push(obj)
						} else if(res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			deleteItem(index) {
				this.items.splice(index, 1)
			}
		}
	}
</script>

<style scoped>
	.content{
		text-align: left
	}
	
	.addItem{
		background-color: #10AEFF;
		color: white;
		padding: 0.3rem 0.3rem;
		border-radius: 0.1rem;
		margin: 1rem 3rem;
		text-align: center;
	}
	
	.clear{
		display: inline-block;
		float: right;
	}
	
	.show{
		display: inline-block;
	}

</style>
