import axios from 'axios';

const url = 'https://news-at.zhihu.com/api/4';

// 获取首页日报列表
export const getNewsLatest = () => {
  return axios.get( `${url}/news/latest` ).then( res => res.data );
};

// 获取日报内容 和 离线下载
export const getNewsBody = ( id: number ) => {
  return axios.get( `${url}/news/${id}` ).then( res => res.data );
};

export const befterNews = ( date: number | string ) => {
  return axios.get( `${url}/news/before/${date}` ).then( res => res.data );
};

// 获取主题日报列表
export const getNewsThemes = () => {
  return axios.get( `${url}/themes` ).then( res => res.data );
};

// 获取主题日报的 内容
export const getNewsThemeBody = ( id: number ) => {
  return axios.get( `${url}/theme/${id}` ).then( res => res.data );
};

// 获取之前主题日报的内容

export const getBefterThemeBody = ( themeId: number, newsId: number ) => {
  return axios.get( `${url}/theme/${themeId}/before/${newsId}` ).then( res => res.data );
};


// 获取 文章 额外信息，如评论数量，所获的『赞』的数量.
export const getNewsStoryExtra = ( id: number ) => {
  return axios.get( `${url}/story-extra/${id}` ).then( res => res.data );
};

// 获取 日报 长评论
export const getNewsLongComments = ( id: number ) => {
  return axios.get( `${url}/story/${id}/long-comments` ).then( res => res.data );
};

// 获取 日报 短评论
export const getNewsShortComments = ( id: number ) => {
  return axios.get( `${url}/story/${id}/short-comments` ).then( res => res.data );
};

















