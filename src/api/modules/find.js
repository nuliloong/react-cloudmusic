import { get, post } from '../axios'

// 接口文档
// https://binaryify.github.io/NeteaseCloudMusicApi/#/


/**获取轮播图 */
export const getSwiperBanner = (type = 2) => get('/banner', { type })
/**获取推荐歌单 */
export const getRecommendSongList = (limit) => get('/personalized', { limit })
/**获取每日推荐歌单(登录) */
export const getEverydayRecommendSongList = () => get('/recommend/resource', { timerstamp: +new Date() })


/**热门电台// offset */
export const getDjHot = (limit) => get('/program/recommend', { limit })

/**
 * 新歌速递
 * @param type 全部:0 华语:7 欧美:96 日本:8 韩国:16
 */
export const getTopSong = (type) => get('/top/song', { type, timerstamp: +new Date() })

/**
 * 
 * @param limit : 返回数量 , 默认为 30
 * @param offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本}
 * ?offset=0&area=ALL&limit=30&year=2022&month=11
 */
export const getTopAlbum = (obj) => get('/top/album', { ...obj, timerstamp: +new Date() })
/**最新音乐 */
export const getNewSong = (limit) => get('/personalized/newsong', { limit, timerstamp: +new Date() })
/**推荐MV */
export const getPersonalizedMv = () => get('/personalized/mv')


/**最新歌单 */
export const getTopPlaylist = ({ cat, limit, offset }) => get('/top/playlist', { cat, limit, offset })
/**热门歌单分类 */
export const getTagHot = () => get('/playlist/hot')
/**全部歌单分类 */
export const getCategory = () => get('/playlist/catlist')
/**全部歌单分类 */
export const getHighquality = ({ cat, limit, before }) => get('/top/playlist/highquality', { cat, limit, before })
/**
 * 查询歌手
 * /artist/list?area=-1&type=-1&initial=a&offset=0&limit=48
 */
export const getArtist = (obj) => get('/artist/list', obj)

/**获取所有排行榜 */
export const getToplist = () => get('/toplist')
/**获取排行榜详情 */
export const getListDetail = (id) => get('/playlist/detail', { id, timerstamp: +new Date() })
/**获取每日推荐 */
export const getRecommendSongs = () => get('/recommend/songs')

/**获取歌单详情 */
export const getPlaylistDetail = (id) => get('/playlist/detail', { id, timerstamp: +new Date() })
/**获取歌单收藏者 */
export const getPlaylistSubscribers = ({ id, offset, limit }) => get('/playlist/subscribers', { id, offset, limit })
/**获取歌单评论 */
export const getPlaylistComment = ({ id, offset, limit }) => get('/comment/playlist', { id, offset, limit, timerstamp: +new Date() })
/**
 * 获取每首歌的详情
 * @param {string} ids 多个用逗号分割
 */
export const getSongDetail = (ids) => get('/song/detail', { ids })
/**
 * 获取歌单所有歌曲
 * @param {string} id 歌单id
 */
export const getPlaylistAll = (id) => get('/playlist/track/all', { id })
/**
 * 给评论点赞
 * @param id 资源 id, 如歌曲 id,mv id
 * @param cid : 评论 id
 * @param t : 是否点赞 , 1 为点赞 ,0 为取消点赞
 * @param type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
 * 0: 歌曲  1: mv  2: 歌单  3: 专辑   4: 电台节目5: 视频6: 动态7: 电台
 * @tip 动态点赞不需要传入 id 参数，需要传入动态的 threadId
 */
export const isLikeComment = (obj) => get('/comment/like', { ...obj, timestamp: +new Date() })
/**
 * 
 * @param t:1 发送, 2 回复
 * @param type: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应类型
 * @param id:对应资源 id
 * @param content :要发送的内容
 * @param commentId :回复的评论 id (回复评论时必填)
 */
export const replyComment = (obj) => get('/comment', obj)
/**
 * 收藏歌单
 * @param t : 类型,1:收藏,2:取消收藏 
 * @param id : 歌单 id
 */
export const subPlayList = (t, id) => get('/playlist/subscribe', { t, id })
/**获取专辑内容 */
export const getAlbumDetail = (id) => get('/album', { id })
/**专辑动态信息 */
export const getAlbumDetailDy = (id) => get('/album/detail/dynamic', { id, timestamp: +new Date()  })

/**
 * 收藏专辑
 * @param t : 类型,1:收藏,2:取消收藏 
 * @param id : 专辑 id
 */
export const subAlbumSub = (t, id) => get('/album/sub', { t, id })
/**获取专辑评论 */
export const getAlbumComment = ({ id, offset, limit }) => get('/comment/album', { id, offset, limit, timerstamp: +new Date() })