define(function(){
    function Add(opts){
        this.opts=opts;
        this.init()                                                                                                                                                                                                                                                                                                                                                                                                                   
    }
    
    Add.prototype.init=function(){
        this.addpic()
    }
    Add.prototype.addpic=function(){
        defaults={
            
        };
        addbtn=document.getElementById("addbtn");
        addbtn.onchange=function(){
           
        } 
    }

    var init=function(opts){
        return new Add(opts)
    }
    
    return {
        init:init
    }
   
})