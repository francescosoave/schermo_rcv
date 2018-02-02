$(document).ready(function() {
	$('#myLog').hide();
	setInterval(function(){setTimer(0);} , 1000);
});

function setTimer(){
	canvas = document.getElementById("myCanvas");
	log = document.getElementById("myLog");

	$.ajax ({
		url: "ajax.php",
		success: function( result ) {
			if(result && !isNaN(result)){ //new timer. updates old one
				if(result == 0){ //timer OFF
					countdown("OFF", 0);
				}else{ //timer good
					$('#myLog').hide();
					countdown(result, 0);
				}
			}else if(isNaN(result)){ //sql error
				canvas.style.color = "red";
				canvas.innerHTML = "ERR";
				$('#myLog').show();
				log.innerHTML = result;
			}
		}
	});
}

function countdown(minutes, seconds) {
	canvas.style.color = "black";
	canvas.innerHTML = "00:00";

	var id = window.setTimeout(null,0);
	while (id--)
		window.clearTimeout(id);

	if(minutes == "OFF"){
		canvas.style.color = "#383838";
		canvas.innerHTML = "OFF";
		return;
	}

	var endTime, hours, mins, msLeft, time;

	function twoDigits( n )
	{
		return (n <= 9 ? "0" + n : n);
	}

	function updateTimer()
	{
		canvas.style.color = "black";
			canvas.innerHTML = "00:00"; //clear canvas
			msLeft = endTime - (+new Date);
			if ( msLeft < 1000 )				
				flashyText();
			else {
				canvas.style.color = "white";
				time = new Date( msLeft );
				hours = time.getUTCHours();
				mins = time.getUTCMinutes();
				canvas.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds());
				setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
			}
		}

	endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
	updateTimer();
}

function flashyText() {
	var count = 1000000,
	timer = setInterval(function() {
		count--;
		if( count%2 == 1) {
			canvas.style.color = "red";
			canvas.innerHTML = "00:00"
		}
		else {
			canvas.style.color = "black";
			canvas.innerHTML = "00:00";
		}
		if( count == 0) clearInterval(timer);
	},1000);
}

