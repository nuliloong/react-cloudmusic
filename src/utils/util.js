/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path, routes) => {
	let result = {};
	for (let item of routes) {
		if (/\/\:/.test(item.path)) {
			const p = item.path.split('/:')
			if (path.includes(p[0])) {
				return item
			}
		}
		if (item.path === path) return item;
		if (item.children) {
			const res = searchRoute(path, item.children);
			if (Object.keys(res).length) result = res;
		}
	}
	return result;
};
// /**
//  * @description 递归查询对应的路由
//  * @param {String} path 当前访问地址
//  * @param {Array} routes 路由列表
//  * @returns array
//  */
// export const searchRoute = (path, routes) => {
// 	let result = {};
// 	for (let item of routes) {
// 		if (item.path === path) return item;
// 		if (item.children) {
// 			const res = searchRoute(path, item.children);
// 			if (Object.keys(res).length) result = res;
// 		}
// 	}
// 	return result;
// };

/**封装promise */
export const to = (promise, errorExt) => {
	return promise
		.then((res) => [null, res])
		.catch((err) => {
			if (errorExt) {
				const parsedError = Object.assign({}, err, errorExt);
				return [parsedError, undefined];
			}
			return [err, undefined];
		})
}


/**节流 */
export function throttle(fn, wait = 1000) {
	let timer
	return function () {
		if (!timer) {
			timer = setTimeout(() => {
				fn.apply(this, arguments)
				timer = null
			}, wait)
		}
	}
}
/**匹配替换http为https */
export const httpToHttps = (path) => {
	if (!path) return ''
	let reg = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i
	path = path.replace(reg, "https://$2$3$4$5$6");
	return path
}

/**检测是否全屏 */
export const isFullscreen = () => {
	var fullscreenEle = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	return fullscreenEle;
}
/**页面最大化 */
export const requestFullScreen = () => {
	let docElm = document.body
	// const docElm = document.documentElement;
	if (docElm.requestFullscreen) {
		docElm.requestFullscreen();
	} else if (docElm.msRequestFullscreen) {
		docElm.msRequestFullscreen();
	} else if (docElm.mozRequestFullScreen) {
		docElm.mozRequestFullScreen();
	} else if (docElm.webkitRequestFullScreen) {
		docElm.webkitRequestFullScreen();
	}
}
/**退出最大化 */
export const exitFullscreen = () => {
	const de = window.parent.document;

	if (de.exitFullscreen) {
		de.exitFullscreen();
	} else if (de.mozCancelFullScreen) {
		de.mozCancelFullScreen();
	} else if (de.webkitCancelFullScreen) {
		de.webkitCancelFullScreen();
	} else if (de.msExitFullscreen) {
		de.msExitFullscreen();
	}
}

/**时长格式化 */
export const formatDuration = (time) => {
	// 如果超过了100000 基本都是毫秒为单位的了 先转成秒的
	time = parseInt(time)
	if (time > 10000) {
		time = Math.floor(time / 1000);
	} else {
		time = Math.floor(time)
	}
	let m = Math.floor(time / 60);
	let s = Math.floor(time % 60);
	m = m < 10 ? '0' + m : m;
	s = s < 10 ? '0' + s : s;
	return m + ':' + s;
}
// 格式化数字10万
// export const formatCount = (val) => {
// 	if (!val) return
// 	if (val < 100000) return val
// 	return val.toString().slice(0, -4) + '万'
// }
export const formatCount = (num) => {
	if (num > 100000000) {
		num = (num / 100000000).toFixed(2);
		return num + "亿"
	}
	else if (num > 10000) {
		num = (num / 10000).toFixed(1);
		return num + "万";
	} else return num;
}
/**判断数字不为Infinity和NaN */
export const isNumber = (value) => {
	return typeof value === 'number' && isFinite(value);
}

/**排除当前的其他随机数 */
export const randomOther = (index, max) => {
	let random = Math.floor(Math.random() * max)
	return random !== index ? random : randomOther(index, max)
}

/**
 * 格式化日期
 * @param {Date,Number} date
 * @param {String} fmt yyyy-MM-dd hh:mm:ss
 */
export const formatDate = (date, fmt) => {
	if (!date) return
	const _date = new Date(date)
	var o = {
		"M+": _date.getMonth() + 1,               //月份 
		"d+": _date.getDate(),                    //日 
		"h+": _date.getHours(),                   //小时 
		"m+": _date.getMinutes(),                 //分 
		"s+": _date.getSeconds(),                 //秒 
		"q+": Math.floor((_date.getMonth() + 3) / 3), //季度 
		"S": _date.getMilliseconds()             //毫秒 
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

// 格式化歌词
export const formatLyric = (lyric_str) => {
	const result = []
	// 将歌词字符串 根据换行符 转换为 数组
	let lyric_arr = lyric_str.split("\n")
	// 遍历歌词数组
	for (let i = 0; i < lyric_arr.length; i++) {
		//得到每一行歌词
		let lyric_row = lyric_arr[i]
		//再将每一行歌词根据”]“分隔为时间和歌词,变为每行歌词数组
		let lyric_row_arr = lyric_row.split("]")
		// 通过pop()方法得到每行歌词文本
		let lryic_row_text = lyric_row_arr.pop()
		// 处理每行歌词时间
		lyric_row_arr.forEach((item, index) => {
			let LyricRowObj = {}
			let time_arr = item.substr(1, item.length - 1).split(":") //去掉"[",并且分离出 分钟和秒
			// 将每行歌词时间转换为秒
			let seconds_row = time_arr[0] * 60 + Math.ceil(time_arr[1])
			// 将每行歌词时间和文本添加到每行歌词对象中
			if (lryic_row_text.trim().length !== 0) {
				LyricRowObj.time = seconds_row
				LyricRowObj.text = lryic_row_text
				//再将每行歌词对象添加到数组中
				result.push(LyricRowObj)
			}
		})
	}

	// 根据时间对歌词排序
	return result.sort((a, b) => a.time - b.time)
}