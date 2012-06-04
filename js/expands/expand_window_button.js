document.writeln(
  '<style type="text/css">'
+ '.expand{display:none;}'
+ '</style>'
);

//init
$(function(){
	Tipness.ExpandWindow.init();
});

Tipness.ExpandWindow = {
	triger		: 'btExpand',
	closeTriger : 'btExpandClose',
	obj1		: 'expand',
	obj2		: 'expandInner',
	
	init : function(){
		var that = Tipness.ExpandWindow;
		$('.' + that.triger).click(that.contentSet);
		$('.' + that.closeTriger).click(that.contentClose);
		$(window).keydown(function(e){
			if(e.keyCode === 27){
				that.contentClose();
			}
		});
	},
	contentSet : function(){
        var that = Tipness.ExpandWindow;
		var target = $(this).attr('name');
        that.open(target);

		return false;
	},

    open : function(expandElementSelector){
        var that = Tipness.ExpandWindow;
        var target = expandElementSelector;
        $(target).css({
            'position'	: 'absolute',
            'top'		: '0',
            'left'		: '0',
            'width'		: '100%',
            'height'	: $('body').height(),
            'background': 'rgba(255,255,255,0.6)',
            'filter'	: 'progid:DXImageTransform.Microsoft.Gradient(GradientType=0,StartColorStr=#99ffffff,EndColorStr=#99ffffff)',
            'z-index'	: '99',
            'zoom'		: '1'
        });
        $(target).fadeIn(200);

        var conTop = $(window).scrollTop();
        conTop = conTop + ($(window).height() / 2);
        conTop = conTop - ($('.'+that.obj2,target).height() / 2);

        //widthを指定可に
        var w = that.init.wWidth;
        if($(target).prop("width")){
            w = $(target).prop("width");
        }
        $('.'+that.obj2,target).css({
            'position'		: 'absolute',
            'top'			: conTop + 'px',
            'left'			: '50%',
            'width'			: w,
            'margin-left'	: '-' + (w / 2) + 'px',
            'padding'		: '2px'
        });

    },

	contentClose : function(){
		var that = Tipness.ExpandWindow;
        that.close('.' + that.obj1);
	},

    close : function(expandElementSelector){
		$( expandElementSelector).fadeOut(200);
    }
}