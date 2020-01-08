import Vue from 'vue'
Vue.directive('onleyNumber', {
    inserted: function (el) {
      el.addEventListener("keypress",function(e){
        //  e = e || window.event;
        
        let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
        let re = /\d/;
       if(!re.test(String.fromCharCode(charcode))){
            if(e.preventDefault){
                e.preventDefault();
            }else{
                e.returnValue = false;
            }  
       }
        // if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
        //     if(e.preventDefault){
        //         e.preventDefault();
        //     }else{
        //         e.returnValue = false;
        //     }                            
        // }
      });
    }
  });
