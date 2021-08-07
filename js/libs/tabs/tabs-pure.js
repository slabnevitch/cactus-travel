var tabsHandler = function(tabsContaner){
  var tabs = Array.prototype.slice.call(tabsContaner.querySelectorAll('.tab')),
      tabsItems = Array.prototype.slice.call(tabsContaner.querySelectorAll('.tab-content'));
  
  bindEvents = function(){
    tabs.forEach(function(el){
      el.addEventListener('click', clickHandler);
    });
  }
  clickHandler = function(e){
    console.log('click!')
    console.log(e.target)

    e.preventDefault();
    var target = e.target.closest('.tab');
    for(var i=0; i<tabs.length; i++){
      //console.log(tabs[i]);
      if(tabs[i] == target){
        //alert(i);
        tabs[i].classList.add('active')
        tabsItems[i].classList.remove('hidden');

      }else{
        tabs[i].classList.remove('active')
        tabsItems[i].classList.add('hidden');
      }

    }
  }
  return{
    init: function(){
      bindEvents();
    }
  }
  
}
