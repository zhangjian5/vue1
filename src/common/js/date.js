export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
        // RegExp.$1 就是捕获到的YYYY替换成字符串  从下标为0 的时候截取
        // 如果是两个数字的话例如2016  截取到的就是16
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};

// 这个是截取月份前面的位数01  11
function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}
