<template>
	<div class="login_container">
		<!--登录大盒子-->
		<div class="login_box">
			<!--头像盒子-->
			<div class="avatar_box">
				<img src="~assets/img/logo.png" />
			</div>
			
				<!--登录框密码框按钮-->
				<el-form label-width="0" class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
					<!--登录-->
				  <el-form-item prop="username">
				    <el-input v-model="loginForm.username"><i slot="prefix" class="el-icon-user-solid"></i></el-input>
				  </el-form-item>
					<!--密码-->
					<el-form-item prop="password">
					  <el-input v-model="loginForm.password" type="password"><i slot="prefix" class="el-icon-lock"></i></el-input>
					</el-form-item>
					<!--登录重置按钮-->
					<el-form-item class="btns">
					  <el-button type="primary" @click="login">登录</el-button>
						<el-button type="info" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
				
			</div>
	</div>
</template>

<script>
	import {getLogin} from "network/login/login.js"
	
	export default {
		name: 'Login',
		data() {
			return {
				//登录表单的数据绑定对象
				loginForm: {
					username: '',
					password: ''
				},
				//表单规则的验证对象
				loginFormRules: {
					username: [
						{required: true, message: '请输入用户名', trigger: 'blur'},
						{min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur'}
					],
					password: [
						{required: true, message: '请输入密码', trigger: 'blur'},
						{min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
					]
				}
			}
		},
		methods: {
			//重置函数
			reset() {
				this.$refs.loginFormRef.resetFields()
			},
			//点击登录校验表单内容函数
			login() {
				this.$refs.loginFormRef.validate(flag => {
					//console.log(flag);
					if(!flag) return;
					
					//校验成功后，调用函数 发送网络请求
					getLogin(this.loginForm).then(res => {
						console.log(res);
						if(res.meta.status !== 200) return this.$message.error('登录失败')
						this.$message.success('登录成功')
						//保存下登录用户的token
						window.sessionStorage.setItem("token", res.data.token)
						this.$router.push('/home')  //登录成功  跳转到home页面
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.login_container {
		background-color: #2b4b6b;
		height: 100%;
	}
	/**登录大盒子*/
	.login_box {
		width: 450px;
		height: 300px;
		background-color: #fff;
		border-radius: 3px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		
		/*头像盒子*/
		.avatar_box {
			width: 130px;
			height: 130px;
			background-color: #fff;
			border: 1px solid #eee;
			border-radius: 50%;
			padding: 10px;
			box-shadow: 0 0 10px #ddd;
			position: absolute;
			left: 50%;
			transform: translate(-50%,-50%);
			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #eee;
			}
		}
	}
	.btns {
		float: right;
	}
	.login_form {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
	}
	</style>
