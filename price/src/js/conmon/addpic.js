define(function(){
    function Add(opts){
        this.opts=opts;
        this.init()                                                                                                                                                                                                                                                                                                                                                                                                                   
    }
    
    Add.prototype.init=function(){
        this.addpic()
    }
    Add.prototype.addpic=function(){
        addbtn=document.getElementById("addbtn");
        var that=this;
        addbtn.onchange=function(){
           //console.log(this.files)
           
           for(var i=0;i<this.files.length;i++){
               //console.log(this.files)
               //console.log(this.files[i].name)
               var osrc=this.files[i].name;
               var picstr=/\.\w+$/.exec(osrc)[0]
               //console.log(picarr)   获取到选中图片的路径
               var picreg=new RegExp(that.opts.type.join("|"),"i")
               console.log(picreg)
               console.log(picstr)
               if(!picreg.test(picstr)){
                   alert("请上传jpg,jpeg,gif,png,bmp,svg格式的图片")   
                   continue 
                }
               if(this.files.size>that.opts.size*1024*1024){
                   alert("请弹出"+that.opts.size+"MB大小的图片")
                   continue
               }

               var fileobj=new FileReader();
               fileobj.readAsDataURL(this.files[i])
               fileobj.onload=function(){
                   var div=document.createElement("div")
                   div.innerHTML=` <div class="imgs"><img src="${this.result}" alt=""><span>&times;</span></div>`
                   var cont=document.getElementById("counts");
                   console.log(cont.children[0])
                   cont.insertBefore(div,cont.children[0])
               }

           }
        } 
    }

    var init=function(opt){
        var defaults={
            parent:"",
            type:["jpg","jpeg","gif","png","bmp","svg"],
            size:2
        };
        var opts=Object.assign({},defaults,opt)
        return new Add(opts)
    }
    
    return {
        init:init
    }
   
})