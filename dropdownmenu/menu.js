	var x=0;
	var i=0;
	
	$(function () {

    $('#myfirst').on('click', function(event) {
    		x++;
		event.preventDefault();
		$(this).closest('.navbar-minimal').toggleClass('open');
		if(i%2!=0){
			$('#mysecond').closest('.navbar-minimal').toggleClass('open');
			i++;
		}
	});
});

	$(function () {

    $('#mysecond').on('click', function(event) {
    		i++;
		event.preventDefault();
		$(this).closest('.navbar-minimal').toggleClass('open');
		if(x%2!=0){
			$('#myfirst').closest('.navbar-minimal').toggleClass('open');
			x++;
		}
	});
});