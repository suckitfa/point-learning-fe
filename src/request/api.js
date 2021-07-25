import {get, post } from "./http";
// 基本路径定义
const baseUserPath = 'api/user/';
const baseArticlePath = 'api/article/';
const baseReadLogPath = 'api/readlog/';
const baseScorePath = 'api/scores/';
const baseKeyPointPath = 'api/keypoint/';
// 用户
// const login = (params) => post('api/user/login', params);
const login = (params) => post(baseUserPath+'login',params);
const getUserList = () => get(baseUserPath + 'list');
const getUserDetail = (params) => get(baseUserPath + 'detail', params);
const newUser = (params) => post(baseUserPath + 'new', params);
const updateUser = (params) => post(baseUserPath + 'update', params);
const deleteUser = (params) => post(baseUserPath + 'delete', params);

// 文章案例
const getArticleList = (params) => get(baseArticlePath + 'list', params);
const getArticleDetail = (params) => get(baseArticlePath + 'detail', params);
const newArticle = (params) => post(baseArticlePath + 'new', params);
const updateArticle = (params) => post(baseArticlePath + 'update', params);
const deleteArticle = (params) => post(baseArticlePath + 'delete', params);
const addArticleCountOnce = (params) => post(baseArticlePath + 'addonecount', params);
const publishArticle = (params) => post(baseArticlePath + 'publish', params);

// 阅读记录
const getReadLogList = () => get(baseReadLogPath + 'list');
const getReadLogDetail = (params) => get(baseReadLogPath + 'detail', params);
const deleteReadLog = (params) => post(baseReadLogPath + 'delete', params);
const newReadLog = (params) => post(baseReadLogPath + 'new', params);

// 分数管理
const getScoreList = () => get(baseScorePath + 'list');
const getScoreDetail = (params) => get(baseScorePath + 'detail', params);
const newScore = (params) => post(baseScorePath + 'new', params);
const updateScore = (params) => post(baseScorePath + 'update', params);
const deleteScore = (params) => post(baseScorePath + 'delete', params);

// 知识点
const getKeyPointList = () => get(baseKeyPointPath + 'list');
const getKeyPointDetail = (params) => get(baseKeyPointPath + 'detail', params);
const newKeyPoint = (params) => post(baseKeyPointPath + 'new', params);
const deleteKeyPoint = (params) => post(baseKeyPointPath + 'delete', params);
const updateKeyPoint = (params) => post(baseKeyPointPath + 'update', params);
export {
    login,
    getUserList,
    getUserDetail,
    newUser,
    deleteUser,
    updateUser,

    getArticleList,
    getArticleDetail,
    newArticle,
    updateArticle,
    deleteArticle,
    addArticleCountOnce,
    publishArticle,
    // 阅读记录测
    getReadLogList,
    getReadLogDetail,
    newReadLog,
    deleteReadLog,
    // 分数管理
    getScoreList,
    getScoreDetail,
    newScore,
    updateScore,
    deleteScore,
    // 知识点管理
    getKeyPointList,
    getKeyPointDetail,
    newKeyPoint,
    deleteKeyPoint,
    updateKeyPoint
}