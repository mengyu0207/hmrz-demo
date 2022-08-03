export const ImgError={
    //定义自定义指令
    inserted:function(el,{value}){
        el.onerror=function(){
          el.src=value
        }
      }
}


