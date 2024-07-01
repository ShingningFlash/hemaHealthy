export default {
    init: function (){
      const AK = "BYMBZ-EVVC6-EDAST-MM3GR-6VLCK-KXB6D";
      const TMap_URL = "https://map.qq.com/api/gljs?v=1.exp&libraries=tools,service&key="+ AK+"&callback=onMapCallback";
       
      return new Promise((resolve, reject) => {
        // 如果已加载直接返回
        if(typeof TMap !== "undefined") {
          resolve(TMap);
          return true;
        }
        // 地图异步加载回调处理
        window.onMapCallback = function () {
          resolve(TMap);
        };
  
        // 插入script脚本
        let scriptNode = document.createElement("script");
        scriptNode.setAttribute("type", "text/javascript");
        scriptNode.setAttribute("src", TMap_URL);
        document.body.appendChild(scriptNode);
      });
    }
  }  