import { get, post } from '../axios'

// 接口文档
// https://binaryify.github.io/NeteaseCloudMusicApi/#/


/**检查歌曲是否可用 */
export const checkMusic = (id) => get('/check/music', { id })
/**获取歌曲url */
export const getSongUrl = (id) => get('/song/url', { id })

/**喜欢歌曲 */
export const likeSong = (id, like) => get('/like', { id, like, timestamp: +new Date() })