(function () {
    var xhr = {

        creatXhr: function () {
            return new XMLHttpRequest();
        },

        creatIexhr: function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        },

        createErrorXHR: function () {
            alert("浏览器找不到")
        },

        creatXHR: function () {
            if (window.XMLHttpRequest) {
                this.creatXHR = this.creatXhr();
            } else {
                this.creatXHR = this.creatIexhr()
            }

            try {
   
                xhr = this.creatXhr();
            } catch (e) {
        
                this.creatXhr = this.createErrorXHR;
        
                xhr = this.creatXHr;
            }

            return xhr;
        },
        ajax: function (options) {
            var defaults = {
                type: "get",
                async: true,
                dataType: "json",
            };

      
            var opts = Object.assign({}, defaults, options)

            var xhr = this.creatXHR(),
                method = (opts.type || "GET").toUpperCase(),
    
                ispost = method == "POST"
      
            data = this.param(opts.data);
            
            url = this.buildUrlparam(opts.url, data, ispost)

            xhr.open(method, opts.url, typeof(opts.async) == "undefined" ? true : opts.async);

            if (ispost) {
                xhr.setRequestHeader("content-type", "application/www-form-urlencode")
            }

            var statusChange=this.statusChange;
            xhr.onreadystatechange=function(){
                statusChange(xhr,opts,opts.success,typeof(opts.error)==undefined?false:opts.error)
            }
            xhr.send(ispost?data:null);
        },
       
        param: function (data) {
            if (!data) {
                return null;
            }
            if(typeof(data)!=="object"){
                return data;
            }
         
            var paramArray = [];
            for (var key in data) {
                paramArray.push(key + "=" + data[key])
            }
         
            return paramArray.join("&")
        },
 
        buildUrlparam: function (url, data, ispost) {
   
            if(data && !ispost){
                if(url.indexOf("?")<0){
                    url+="?"+data;
                }else{
                    url+="&"+data;
                }
            }
            return url;
        },
        statusChange:function(xhr,opts,success,error){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    var resultData=null;
                    if(opts.dataType=="json"){
                        resultData=eval("("+xhr.responseText+")")
                    }else if(opts.dataType=="xml"){
                        resultData=xhr.responseXML
                    }else{
                        resultData=xhr.responseText
                    }
                    success(resultData)
                }else{
                    if(error){
                        errpr.call(xhr,statusText,status)
                    }
                }
            }else{
                if(error){
                    errpr.call(xhr,statusText,status)
                }
            }
        }
    }
    window.ajax = function(opts){
        xhr.ajax.call(xhr,opts)
    }
})()