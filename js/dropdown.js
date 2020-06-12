export function DropDown(toggle_button){
    this.toggle_button = toggle_button || '.dropdown__toggle';

    this.init();
}

DropDown.prototype = (function(){

	// Close all dropdowns
	function closeAll(){
		document.querySelectorAll('.dropdown__toggle').forEach( (item) => {
			item.parentNode.classList.remove('open');
		});
	}

	// click handler
	function clickHandler(event) {
			
		const DROPDOWN_TOGGLE = event.target;
		const IS_DROPDOWN_TOGGLE = DROPDOWN_TOGGLE.classList.contains('dropdown__toggle');
		const MENU = DROPDOWN_TOGGLE.parentNode.querySelector('.dropdown__menu');

		if ( !IS_DROPDOWN_TOGGLE ){

			  closeAll();

	  	} else {
			event.preventDefault();

	  		if(DROPDOWN_TOGGLE.parentNode.classList.contains('open')){
				closeAll();	
	  		} else {
				closeAll();
	  			DROPDOWN_TOGGLE.parentNode.classList.add('open');	
	  		}
			
			MENU.setAttribute('style', '');
			
			let menuPos = MENU.getBoundingClientRect(); 
			if(menuPos.left < 0){
				MENU.style.left = 'calc(50% + ' + Math.abs(Math.floor(menuPos.left) - 5) + 'px)';
			}

			let ww = window.innerWidth || html.clientWidth;

			if(menuPos.right > ww){
				MENU.style.left = 'calc(50% - ' + Math.abs(Math.floor(menuPos.right - ww + 5)) + 'px)';
			}


		}

	}

	function init(){
		// Bind Events
		document.addEventListener('click', clickHandler);	
	}
	
	return {
		init: init
	}

})();


