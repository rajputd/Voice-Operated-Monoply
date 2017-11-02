var Interface = (function() {


	function pressButton(button_id) {
		document.getElementById(button_id).click();
	}

	return {
		pressButton : pressButton
	};
})();
