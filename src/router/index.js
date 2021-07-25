import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path:'/article-reading',
      component: () => import('../components/common/StudentBase.vue'),
      meta: {
        title:'学生公共部分',
      },
      children:[
        {
          path: '/article-reading',
          component: () => import('../components/page/ArticleManagement.vue'),
          meta: {
            title: '文章阅读'
          },
        },
        {
          path: '/table',
          component: () => import('../components/page/Scores.vue'),
          meta: {
            title: '表格'
          }
        },
        {
          path:'/article',
          component: () =>import('../components/page/Article.vue'),
          meta: {
            title: '文章'
          },
        },
      ]
    },
    {
      path: '/user-management',
      component: () => import('../components/common/Base.vue'),
      meta: {
        title: '管理员公共部分'
      },
      children: [
        {
          path:'/knowledgepoint',
          component: ()=> import('../components/page/KnowledgePointManagement.vue'),
          meta:{
            title:'知识点管理'
          }
        },
        {
          path:'/browse_article',
          component: () =>import('../components/page/BrowseArticles.vue'),
          meta: {
            title: '浏览文章'
          },
        },
        {
          path: '/case-management',
          component: () => import('../components/page/CaseManagement.vue'),
          meta: {
            title: '文章管理'
          },
          children: [
            {
              path: '',
              redirect: 'case_list'
            },
            {
              path: 'case_list',
              component: () => import('../components/common/CaseTable'),
              meta: {
                title: '案例列表'
              }
            },
            {
              path: 'case_add',
              component: () => import('../components/common/CaseAdd'),
              meta: {
                title: '添加案例'
              }
            }
          ]
        },
        {
          path: '/user-management',
          component: () => import('../components/page/UserManagement.vue'),
          meta: {
            title: '用户管理'
          }
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../components/page/Login.vue')
    },
    {
      path: '/modify_password',
      component: () => import('../components/page/ModifyPassword.vue')
    },
  ]
})

