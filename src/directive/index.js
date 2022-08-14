export const ImgError={
    //定义自定义指令
    inserted:function(el,{value}){
      if(!el.src){
        el.src=value;
      }else{
        el.onerror=function(){
          el.src=value
        }
      }
       
      }
}
// update(el,{value}){
//   if(!el.src){
//     el.src=value
//   }
// }


