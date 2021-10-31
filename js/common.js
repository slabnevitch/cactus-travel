(function() {
	  /*--------------------------
      INIT WIDTH SCROLL
  --------------------------*/
  var scrollWidth = {
    init: function () {
      var div = document.createElement('div');

      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';

      document.body.append(div);

      var scrollWidth = div.offsetWidth - div.clientWidth;

      div.remove();

     	var root = document.documentElement;
      root.style.setProperty('--scroll-width', scrollWidth + 'px');
    }
  };

  scrollWidth.init();
	// if(screen.width < 1199){
		var accordionLists = document.querySelectorAll('.accordion');
		[].forEach.call(accordionLists , function(item){
		  var accordion = new Accordion(item, 500, 1199);
		  accordion.init();
		});
	// }
	// ibg class
		if('objectFit' in document.documentElement.style === false){
		  Array.prototype.forEach.call(document.querySelectorAll('._fit'), function(el){

		    var image = el.querySelector('._fit-img');
		    el.style.backgroundImage = 'url("'+image.src+'")';
		    el.classList.add('ibg');
		    el.classList.remove('_fit');
 		 });
		}
	// End ibg class

	// main menu hover
		if(document.querySelector('.main-menu') !== null){

			var mainMenu = document.querySelector('.main-menu');
			var mainMenuItems = document.querySelectorAll('.main-menu__item');
			var lineLeft = document.querySelector('.header__line.left');
			var lineRight = document.querySelector('.header__line.right');
		
			// if(screen.width > 1199){
				[].forEach.call(mainMenuItems, function(link) {
					link.addEventListener('mouseenter', linksHover);
					link.addEventListener('mouseleave', linksOut);
				});			
			// }

			function linksHover(e) {
				if(e.target.classList.contains('with-sub') && screen.width >= 1199){
					var currSub = e.target.querySelector('.main-submenu'),
						menuBottomWrapperWidth = document.querySelector('.header__bottom .wrapper').offsetWidth
						submenuWidth = currSub.offsetWidth,
						submenuOffsetLeft = currSub.getBoundingClientRect().left,
						menuOffsetLeft = mainMenu.getBoundingClientRect().left,
						leftLuft = submenuOffsetLeft - menuOffsetLeft,
						rightLuft = menuBottomWrapperWidth - ((submenuOffsetLeft - menuOffsetLeft) + submenuWidth + 29),
						leftStyle = 'width:'+leftLuft +'px;';
						rightStyle = 'width: '+rightLuft +'px;';
					
					lineLeft.setAttribute('style', leftStyle);
					lineRight.setAttribute('style', rightStyle);
					mainMenu.closest('.header__bottom').classList.add('no-border');
				}
			}
			function linksOut(e) {
				if(screen.width >= 1199){
					lineLeft.removeAttribute('style');
					lineRight.removeAttribute('style');
					mainMenu.closest('.header__bottom').classList.remove('no-border');

				}
			}
		}
	// END main menu hover

	// slideout
		var slideout = new Slideout({
		    'panel': document.getElementById('panel'),
		    'menu': document.getElementById('menu'),
		    'padding': 256,
		    'tolerance': 70
	    });

	    function close(eve) {
		  eve.preventDefault();
		  slideout.close();
		  document.querySelector('.toggle-mnu').classList.remove('on');
		}

		slideout
		  .on('beforeopen', function() {
		    this.panel.classList.add('panel-open');
		  })
		  .on('open', function() {
		    this.panel.addEventListener('click', close);
		  })
		  .on('beforeclose', function() {
		    this.panel.classList.remove('panel-open');
		    this.panel.removeEventListener('click', close);
		  });

  // Toggle button
	  document.querySelector('.toggle-mnu').addEventListener('click', function() {
	  	this.classList.toggle('on');
	    slideout.toggle();
	  });
	// END slideout



	// modal
		MicroModal.init({
		  openTrigger: 'data-custom-open', 
		  closeTrigger: 'data-custom-close',
		  openClass: 'is-open', 
		  disableScroll: true, 
		  disableFocus: true, 
		  awaitOpenAnimation: true,
		  // awaitCloseAnimation: true,
		  onShow: function() {
		  	document.querySelector('#wrapper-for-scroll-fix').classList.add('modal-open');
		  },
		  onClose: function() {
		  	document.querySelector('#wrapper-for-scroll-fix').classList.remove('modal-open');
		  }
		});

	// END modal

	// siema dslider
		if(document.querySelector('.tours-types-block__slider') !== null){

			new SiemaWithPagination({
				selector: '.tours-types-block__slider',
				duration: 200,
				easing: 'ease-out',
				perPage: {
					480: 2,
					576: 1,
			    800: 2,
			    1199: 3
			  },
			  draggable: true,
				multipleDrag: false,
				threshold: 20,
				loop: true,
				onChange: function(){
					siemaDots(this);
				},
				onInit: function(){
					this.addPagination();
					siemaDots(this);
				}
			});
		}
		
		if(document.querySelector('.cards-slider') !== null){
			new SiemaWithPagination({
				selector: '.cards-slider',
				duration: 200,
				// easing: 'ease-out',
				perPage: {
			    768: 2,
			    1200: 3,
			    1370: 4
			  },
				// startIndex: 0,
				draggable: true,
				multipleDrag: false,
				threshold: 50,
				loop: true,
				onChange: function(){
					siemaDots(this);
				},
				onInit: function(){
					this.addPagination();
					siemaDots(this);
				}
			});

		}
		function siemaDots(slider) {
			var calcSlide = 0;

				if(slider.currentSlide === -1){
					calcSlide = slider.innerElements.length - 1;
				}
				else if (slider.currentSlide < 0){
					calcSlide = Math.abs(slider.currentSlide) * 2;
				}else{
					calcSlide = slider.currentSlide;
				}

				var _self = slider;
				var bullets = slider.selector.nextElementSibling.querySelectorAll('.siema-nav-button');
				[].forEach.call(bullets, function(el, ind) {
					if(ind === calcSlide){

						el.classList.add('active');
					}else{
						el.classList.remove('active');

					}
				});
		}

	// END siema dslider


	// password show
		if(document.querySelector('.eye-ico') !== null){
			[].forEach.call(document.querySelectorAll('.eye-ico'), function(el) {
				el.onclick = function(e) {
					var passInput = this.nextElementSibling;
					this.classList.toggle('unblind');
					passInput.getAttribute('type') === 'password' ?
						passInput.setAttribute('type','text') :
						passInput.setAttribute('type','password');
				}
			});
		}
	// END password show

	// forget password toggle in sign-in
		if(document.getElementById('forget-pass-enter') !== null && document.getElementById('forget-pass-back') !== null){
			var modalContent = document.querySelectorAll('.cactus-form__content');
			for(var i=0; i < modalContent.length; i++){
				modalContent[i].onclick = function(e) {
					var target = e.target;
					if(target.classList.contains('forget-password-handling')){
						e.preventDefault();
						var linkTarget = target.getAttribute('id');
						
						[].forEach.call(modalContent, function(el) {
							if(el.dataset.target === linkTarget){
								el.classList.remove('hidden');
							}else{
								el.classList.add('hidden');

							}
						});
					}
				}
			}
			
	

		}
	// END forget password toggle in sign-in

	// lc-sekect
		if(document.querySelector('.filter-select') !== null){
			new lc_select('.filter-select', {
				 wrap_width: '100%', 
				 pre_placeh_opt: true,
				 enable_search : false,
				 on_change: function(new_value, target_field) {

				 },
				 on_init: function(currentSelect) {

				 },
				 on_ddAppended: function(selectItem) {
				 	var dropdown = document.getElementById('lc-select-dd');

				 	if(selectItem.getAttribute('name') === 'simple'){
						dropdown
				 			.querySelector('.lcslt-group-name')
				 			.remove();
				 	}
				 	if(selectItem.getAttribute('name') === 'hotels'){
					 		var options = document.querySelectorAll('.lcslt-dd-opt'),
				 			selectedIndex = Array.prototype.indexOf.call(options, dropdown.querySelector('.lcslt-selected'));
						
						[].forEach.call(options, function(el, ind) {
				 			if(ind <= selectedIndex){
				 				el.querySelector('.lcslt-img').style.backgroundImage = 'url(img/icons-svg/star.svg)';
				 			}
						});
				 	}
				 	if(screen.width < 768 && selectItem.closest('.hot-tours-filter__select') !== null){

					 	var container = document.querySelector('.hot-tours-filter__container');

					 	setTimeout(function() {
					 		var width = container.clientWidth,
			 				left = container.getBoundingClientRect().left,
				 			y_pos = parseInt(container.getBoundingClientRect().top) + container.clientHeight + parseInt(window.pageYOffset, 10);

				 			dropdown.setAttribute('style', 'width:'+ width +'px; top:'+ y_pos +'px; left: '+ left +'px;');
					 	}, 20)
				 	}
				 }
			});
		}
	// END lc-sekect

	// tabs
	if(document.querySelector('._tabs') !== null){
		tabsHandler(document.querySelector('._tabs')).init();
	}
	// END tabs

	// flatpickr
		if(document.querySelector('.date-input') !== null){
			var localeRU = {
			    firstDayOfWeek: 1,
			    weekdays: {
			      shorthand: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			      longhand: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],         
			    }, 
			    months: {
			      shorthand: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
			      longhand: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			    },
			  };
			
			flatpickr(".date-start", {
			  // "inline": true,
			  "monthSelectorType": "static",
			  "locale": localeRU,
			  "disableMobile": true,
			  "dateFormat": "y-m-d",
			  "minDate": new Date(),
			  "defaultDate": new Date()
			});
			flatpickr(".date-end", {
			  // "inline": true,
			  "monthSelectorType": "static",
			  "locale": localeRU,
			  "disableMobile": true,
			  "dateFormat": "y-m-d",
			  "minDate": new Date(),
			  "defaultDate": new Date().setDate(new Date().getDate() + 7)
			});
			
			var charterCalendar = flatpickr("#date-charter", {
			  "monthSelectorType": "static",
			  "locale": localeRU,
			  "minDate": new Date(),
			  "mode": "range",
			  "defaultDate": ["2021-08-10", "2021-08-20"]
			});
		}
	// END flatpickr

})();
