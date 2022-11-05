import { get, post } from '../axios'

// 接口文档
// https://binaryify.github.io/NeteaseCloudMusicApi/#/


// 获取轮播图
export const getSwiperBanner = (type = 2) => get('/banner', { type })
// 获取推荐歌单
export const getRecommendSongList = (limit) => get('/personalized', { limit })
// 获取每日推荐歌单(登录)
export const getEverydayRecommendSongList = () => get('/recommend/resource', { timerstamp: +new Date() })


// 热门电台// offset
export const getDjHot = (limit) => get('/program/recommend', { limit })


// 新歌速递
// 全部:0 华语:7 欧美:96 日本:8 韩国:16
export const getTopSong = (type) => get('/top/song', { type, timerstamp: +new Date() })
// 新歌速递


/**
 * 
 * @param limit : 返回数量 , 默认为 30
 * @param offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本}
 * ?offset=0&area=ALL&limit=30&year=2022&month=11
 */
export const getTopAlbum = (obj) => get('/top/album', { ...obj, timerstamp: +new Date() })
// 最新音乐
export const getNewSong = (limit) => get('/personalized/newsong', { limit, timerstamp: +new Date() })
// 推荐MV
export const getPersonalizedMv = () => get('/personalized/mv')





// 最新歌单
export const getTopPlaylist = ({ cat, limit, offset }) => get('/top/playlist', { cat, limit, offset })
// 热门歌单分类
export const getTagHot = () => get('/playlist/hot')
// 全部歌单分类
export const getCategory = () => get('/playlist/catlist')
// 全部歌单分类
export const getHighquality = ({ cat, limit, before }) => get('/top/playlist/highquality', { cat, limit, before })



// 查询歌手
// /artist/list?area=-1&type=-1&initial=a&offset=0&limit=48
export const getArtist = (obj) => get('/artist/list', obj)



// 获取所有排行榜
export const getToplist = () => get('/toplist')
// 获取排行榜详情
export const getListDetail = (id) => get('/playlist/detail', { id, timerstamp: +new Date() })
