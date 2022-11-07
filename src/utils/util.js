/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path, routes) => {
	let result = {};
	for (let item of routes) {
		if (item.path === path) return item;
		if (item.children) {
			const res = searchRoute(path, item.children);
			if (Object.keys(res).length) result = res;
		}
	}
	return result;
};

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

/* 格式化日期 */
export const formatDate = (date, fmt) => {
	if (!date) return
	const _date = new Date(date)
	var o = {
		"M+": _date.getMonth() + 1,                 //月份 
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