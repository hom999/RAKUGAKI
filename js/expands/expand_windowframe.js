

$(function(){
	
	$.fn.ExpandWindowFrame = function(options){
		var triger = this;
		$(triger).click(function(){
			var width = options['width'];
			var height = options['height'];
			var href = $(this).attr('href');
			
			setContent(width,height,href);
			return false;
		});
	}
	
	function setContent(w,h,l){
		var elm			= $('<div class="expand">');
		var elm2		= $('<div class="expandInner">');
		var closebtn	= $('<p class="btExpandClose">');
		var frame		= $('<iframe>');
		frame.attr('width', w);
		frame.attr('height', h);
		frame.attr('frameBorder', 0);
		frame.attr('src', l);
		
		$('body').append(elm);
		
		$(elm).css({
			'position'	: 'absolute',
			'top'		: '0',
			'left'		: '0',
			'display'	: 'none',
			'width'		: '100%',
			'height'	: $('body').height(),
			'background': 'rgba(255,255,255,0.6)',
			'filter'	: 'progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#99ffffff,EndColorStr=#99ffffff)',
			'z-index'	: '99',
			'zoom'		: '1'
		}).fadeIn(200);
		
		$(elm).append(elm2);
		var elm2Top = $(window).scrollTop();
		if($(window).height() > h){
			elm2Top = elm2Top + $(window).height() / 2;
		}
		else{
			elm2Top =  elm2Top + h/2 + 20 + 'px';
		}
		$(elm2).css({
			'position'	 : 'absolute',
			'top'		 : elm2Top,
			'left'		 : '50%',
			'width'		 : w,
			'height'	 : h,
			'margin-top' : '-' + h/2 + 'px',
			'margin-left': '-' + w/2 + 'px',
			'z-index'	 : '99'
		});

		$(elm2).append(frame);
		$(elm2).append(closebtn);
		$(closebtn).click(Expandclose);
	}
	
	Expandclose = function() {
		$('.expand').fadeOut(200);
	}

});