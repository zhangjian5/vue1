// 解析url参数   把它们转成对象
export function urlParse() {
    let url = window.location.search;
    let obj = {};
    // 第一个是匹配问号  第二个是匹配除去？之外的任意字符
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    if(arr){
        arr.forEach((item)=>{
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key]=val;
        });
    }
    
    return obj;
  }