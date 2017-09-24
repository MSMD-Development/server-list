Vue.component('server-table', {
	template: '#serverTableTemplate',
	props: {
		data: Array,
		columns: Array,
		display: Array
	}
})

var serverTB = new Vue({
	el: '#serverTB',
	data: {
		tbColumns: ['_id', 'name', 'host', 'ver', 'online', 'players', '細節'],
		tbDisplay: ['#', '伺服器名稱', '伺服器 IP', '版本', '狀態', '玩家數量', '細節'],
		tbData: {}
	}
})