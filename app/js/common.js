$(function() {

	changeImageSrc();

	function changeImageSrc() {
		$(".product__gallery img").each( function() {
			let imgSrc = $(this).attr('src');
			$(this).closest('a').attr("href", imgSrc);
		});
	};

  // Mask for phone
  $("#phone, #phone_2").mask("+380(99) 999-9999");

	$('.button--buy, .button--white').addClass('popup');
	$('.button--buy, .button--white').attr('href', '#form');
  $('.popup').magnificPopup();

    //Galerry
	$(".gallery--init").each(function() {
		$(this).magnificPopup({
			delegate: 'a',
			mainClass: 'mfp-zoom-in',
			type: 'image',
			tLoading: '',
			gallery:{
				enabled: true,
			},
			removalDelay: 300,
			callbacks: {
				beforeChange: function() {
					this.items[0].src = this.items[0].src + '?=' + Math.random();
				},
				open: function() {
					$.magnificPopup.instance.next = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
					}
					$.magnificPopup.instance.prev = function() {
						var self = this;
						self.wrap.removeClass('mfp-image-loaded');
						setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
					}
				},
				imageLoadComplete: function() {
					var self = this;
					setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
				}
			}
		});
	});


	$(".base-form").submit(function() {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "/mail.php",
			data: th.serialize()
		}).done(function() {
			$.magnificPopup.close();
			//$('.send-mesages').magnificPopup();
			$(".send-message").css('display', 'block');
			setTimeout(function() {
				$(".send-message").css('display', 'none');
				th.trigger("reset");
			}, 3000);
			// setTimeout(function() {
			// 	var url = "http://euro-sto.com.ua/thank.html";
			// 	$(location).attr('href',url);
			// }, 3000);
			// setTimeout(function() {
			// 	var urlHome = "http://euro-sto.com.ua/";
			// 	$(location).attr('href',urlHome);
			// }, 8000);
		});
		return false;
	});


});