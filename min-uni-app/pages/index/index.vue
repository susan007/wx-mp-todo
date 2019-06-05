<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<input placeholder="用户名" v-model="userName"/>
		<input placeholder="密码" v-model="userPassword" @blur="goto"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'iCleaner',
				userName: '',
				userPassword: ''
			}
		},
		onLoad() {

		},
		methods: {
			goto() {
				console.log('跳转到hone页')
				uni.navigateTo({
					url: `../home/home?userName=${this.userName}&userPassword=${this.userPassword}`,
					success: this.success,
					fail: this.fail
				})
			},
			success() {
				console.log('success!')
			},
			fail() {
				console.log('fail!')
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-bottom: 80upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
	
	input{
		padding: 0.3rem 0;
		border-radius: 0.1rem;
		border: 1px solid #8F8F94;
		margin-bottom: 1rem;
	}
</style>
