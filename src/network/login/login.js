import {request} from "network/request.js"
//解构赋值  调用此函数时传一个对象
export function getLogin({username, password} = {}){
	return request({
		url: '/login',
		method: 'post',
		params: {
			username,
			password
		}
	})
}