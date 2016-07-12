var $ = jQuery.noConflict();
$(function(){

$(document).ready(function(){
	$("a.scroll").on("click", function(e){
		e.preventDefault();
		href = $(this).attr("href");
		if($(href).length != 0) {
			$("body,html").stop().animate({ scrollTop: $(href).offset().top - 10}, 1000);
		}
	});
	//Функция подсчета высоты палок
	function palki_size() {
		rost = parseInt($("#slider .ui-slider-handle span").html());
		size = Math.round(rost * 0.68);
		$(".recommended-size span").html(size);
		$(".recommended-size span").append(" см");
	}
	//ползунок
	$("#slider").slider({
		value:175,
		min: 140,
		max: 210,
		step: 1,
		animate: "fast",
		create: function(event, ui) {
			$("#slider .ui-slider-handle").append("<span>")
			val = $("#slider").slider("value");
			$("#slider .ui-slider-handle span").html(val);
			$("#slider .ui-slider-handle span").append(" см");
			palki_size();
		},
		slide: function(event, ui) {
			$("#slider .ui-slider-handle span").html(ui.value);
			$("#slider .ui-slider-handle span").append(" см");
			palki_size();
		}
	});
	$(".begunok-area .plus").on("click", function(){
		value = parseInt($("#slider .ui-slider-handle span").html());
		if (value < 210 && value >= 140) {
			value++;
			$("#slider").slider("value", value);
			$("#slider .ui-slider-handle span").html(value);
			$("#slider .ui-slider-handle span").append(" см");
		}
		palki_size();
	});
	$(".begunok-area .minus").on("click", function(){
		value = parseInt($("#slider .ui-slider-handle span").html());
		if (value > 140 && value <= 210) {
			value--;
			$("#slider").slider("value", value);
			$("#slider .ui-slider-handle span").html(value);
			$("#slider .ui-slider-handle span").append(" см");
		}
		palki_size();
	});
	
	//3 отзыва на главной
	in_action = false;
	comments_val = $(".otziv").length;
	if(comments_val <= 3) {
		$(".otziv-prev, .otziv-next").hide();
	}
	$(".otziv-next").on("click", function(){
		if (!$(this).hasClass("inactive")) {
			current_position = parseInt($(".otzivi-inner").css("top"));
			move_height = 200 - current_position;
			if(!in_action) {
				in_action = true;
				$(".otzivi-inner").animate({
					"top" : -move_height
				}, 400, function(){
					in_action = false;
					check_controls();
				});
			}
		}
	});
	$(".otziv-prev").on("click", function(){
		if (!$(this).hasClass("inactive")) {
			current_position = parseInt($(".otzivi-inner").css("top"));
			move_height = 200 + current_position;
			if(!in_action) {
				in_action = true;
				$(".otzivi-inner").animate({
					"top" : move_height
				}, 400, function(){
					in_action = false;
					check_controls();
				});
			}
		}
	});
	function check_controls() {
		position = parseInt($(".otzivi-inner").css("top"));
		inner_height = $(".otzivi-inner").height();
		wrapper_height = $(".otzivi-wrapper").height();
		if(position >= 0) {
			$(".otziv-prev").addClass("inactive");
			$(".otziv-next").removeClass("inactive");
		} else if (position < 0 && position > wrapper_height - inner_height) {
			$(".otziv-prev").removeClass("inactive");
			$(".otziv-next").removeClass("inactive");
		} else if (position <= wrapper_height - inner_height) {
			$(".otziv-prev").removeClass("inactive");
			$(".otziv-next").addClass("inactive");
		}
	}
	check_controls();
	$(".fancybox").fancybox({
		padding: 0,
		margin: 0
	});
	//выбор доп.товара
	function discount_calculate() {
		function show_discount(e) {
			$('.tovar .price span span').show();
			$('.tovar .new-price').show();
			$('.tovar .new-price span').html(e).append(" руб.");
		}
		price = parseInt($(".tovar .price span").text());
		len = $(".accessories > .row:nth-child(2) > div.active").length;
		if (len <=0 || len > 3) {
			$('.tovar .price span span').hide();
			$('.tovar .new-price').hide();
		}
		if (len == 1) {
			new_price = Math.round((price - (price * 0.01)) / 10) * 10; 
			show_discount(new_price);
		}
		if (len == 2) {
			new_price = Math.round((price - (price * 0.02)) / 10) * 10; 
			show_discount(new_price);
		}
		if (len == 3) {
			new_price = Math.round((price - (price * 0.03)) / 10) * 10; 
			show_discount(new_price);
		}
	}
	$(".add a").on("click", function(){
		if (!$(this).hasClass("active")) {
			$(this).addClass("active").text("Отменить");
			$(this).parent().parent("div").addClass("active");
			discount_calculate();
		} else {
			$(this).removeClass("active").text("Добавить");
			$(this).parent().parent("div").removeClass("active");
			discount_calculate();
		}
	});
	//выбор товара при переходе
	id = window.location.hash;
	id = parseInt(id.substr(1));
	if (id == 35) {
		$(".line:eq(1) :checkbox").prop("checked", true);
		$(".line:eq(1) > div:nth-child(2) input").val(1);
		$(".line .color .blue").addClass("active");
	}
	if (id == 13) {
		$(".line:eq(1) :checkbox").prop("checked", true);
		$(".line:eq(1) > div:nth-child(2) input").val(1);
		$(".line .color .black").addClass("active");
	}
	if (id == 15) {
		$(".line:eq(2) :checkbox").prop("checked", true);
		$(".line:eq(2) > div:nth-child(2) input").val(1);
	}
	if (id == 17) {
		$(".line:eq(3) :checkbox").prop("checked", true);
		$(".line:eq(3) > div:nth-child(2) input").val(1);
	}
	if (id == 19) {
		$(".line:eq(4) :checkbox").prop("checked", true);
		$(".line:eq(4) > div:nth-child(2) input").val(1);
	}
	//cookies
	/*$.cookie('tovar1', 0, {expires: 7});
	$.cookie('tovar2', 0, {expires: 7});
	$.cookie('tovar3', 0, {expires: 7});
	$.cookie('tovar4', 0, {expires: 7});
	$.cookie('tovar5', 0, {expires: 7});
	$.cookie('tovar6', 0, {expires: 7});
	$.cookie('tovar7', 0, {expires: 7});*/
	function check_cookies() {
		if ($.cookie('tovar1') > 0) {
			$(".line:eq(1) :checkbox").prop("checked", true);
			$(".line:eq(1) > div:nth-child(2) input").val($.cookie('tovar1'));
		}
	}
	//alert($.cookie('tovar1'));
	//калькулятор на странице заказа
	function calc() {
		summa = 0;
		summa2 = 0;
		price1 = parseInt($(".line:eq(1) > div:nth-child(3) span").text());
		price2 = parseInt($(".line:eq(2) > div:nth-child(3) span").text());
		price3 = parseInt($(".line:eq(3) > div:nth-child(3) span").text());
		price4 = parseInt($(".line:eq(4) > div:nth-child(3) span").text());
		price5 = parseInt($(".line:eq(6) > div:nth-child(3) span").text());
		price6 = parseInt($(".line:eq(7) > div:nth-child(3) span").text());
		price7 = parseInt($(".line:eq(8) > div:nth-child(3) span").text());
		val1 = $(".line:eq(1) > div:nth-child(2) input").val();
		val2 = $(".line:eq(2) > div:nth-child(2) input").val();
		val3 = $(".line:eq(3) > div:nth-child(2) input").val();
		val4 = $(".line:eq(4) > div:nth-child(2) input").val();
		val5 = $(".line:eq(6) > div:nth-child(2) input").val();
			if (val5 > 0) {
				$(".line:eq(6)").addClass("active");
			} else {
				$(".line:eq(6)").removeClass("active");
			}
		val6 = $(".line:eq(7) > div:nth-child(2) input").val();
			if (val6 > 0) {
				$(".line:eq(7)").addClass("active");
			} else {
				$(".line:eq(7)").removeClass("active");
			}
		val7 = $(".line:eq(8) > div:nth-child(2) input").val();
			if (val7 > 0) {
				$(".line:eq(8)").addClass("active");
			} else {
				$(".line:eq(8)").removeClass("active");
			}
		summa = price1*val1 + price2*val2 + price3*val3 + price4*val4;
		summa2 = price5*val5 + price6*val6 + price7*val7;
		dop = $(".line.accessories-line.active").length;
		if (dop == 1) {
			summa = Math.round((summa - (summa * 0.01)) / 10) * 10; 
		}
		if (dop == 2) {
			summa = Math.round((summa - (summa * 0.02)) / 10) * 10; 
		}
		if (dop == 3) {
			summa = Math.round((summa - (summa * 0.03)) / 10) * 10; 
		}
		$(".itogo .text span").text(summa+summa2);
	}
	$(".line .color > span").on("click", function(){
		if(!$(this).hasClass("active")) {
			$(".line .color > span").removeClass("active");
			$(this).addClass("active");
		}
	});
	$(".line :checkbox").change(function(){
		if($(this).is(":checked")) {
			$(this).parent().parent(".line").children().children(":text").val(1);
			calc();
		} else {
			$(this).parent().parent(".line").children().children(":text").val("");
			calc();
		}
	});
	calc();
	$(".increment").on("click", function(){
		$(this).parent().parent(".line").children().children(":checkbox").prop("checked", true);
		current_value = $(this).siblings("input").val();
		if (current_value == "") {
			value = 1;
			$(this).siblings("input").val(value);
		} else {
			current_value = parseFloat(current_value);
			value = current_value + 1;
			$(this).siblings("input").val(value);
		}
		calc();
	});
	$(".decrement").on("click", function(){
		current_value = $(this).siblings("input").val();
		if (current_value == "" || current_value <= 0) {
			value = "";
			$(this).siblings("input").val(value);
			$(this).parent().parent(".line").children().children(":checkbox").prop("checked", false);
		} else if (current_value == "1"){
			value = "";
			$(this).siblings("input").val(value);
			$(this).parent().parent(".line").children().children(":checkbox").prop("checked", false);
		} else {
			current_value = parseFloat(current_value);
			value = current_value - 1;
			$(this).siblings("input").val(value);
		}
		calc();
		
	});
	$(".table-row input").on("keyup", function(){
		calc();
	});
	calc();
	
	//формы
	//callback
	$("#callback form :submit").removeAttr("disabled");
	$("#callback form").submit(function(e){
		e.preventDefault();
		var cb_name = $("#cb-name").val();
		var cb_phone = $("#cb-phone").val();
		var data =  'cb-name='+cb_name+
					'&cb-phone='+cb_phone;
		if ($("#cb-phone").val() == '') {
			$("#cb-phone").focus().css('border-color', 'red');
		} else {
			$("#callback form :submit").prop("disabled", true).css("cursor", "wait");
			$.ajax({
				type: 'POST',
				url: '../php/zvonok.php',
				data: data,
				success: function(data) {
					$("#callback form :submit").removeAttr("disabled").removeAttr("style");
				}
			});
		}
	});
});

});