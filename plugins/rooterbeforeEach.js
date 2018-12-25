/** 路由守卫*/
export default function (context) {
    context.app.router.beforeEach((to, from, next) => {
      if(!context.app.store.use){
        if(to.path=='/1/login'||to.path=='/2/login'){
          next();
        }else if(to.path.indexOf('/1/')>-1){
          next({ path: "/1/login", query: { redirect: to.name } })
        }else if(to.path.indexOf('/2/')>-1){
          next({ path: "/2/login", query: { redirect: to.name } })
        }else{
          next({ path: "/1/login", query: { redirect: to.name } })
        }        
      }else{
        next();
      }
    })
}