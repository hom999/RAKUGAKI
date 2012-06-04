(function ()
{
	$(function()
	{
		util.crossDomainGet
		(
			"http://www.tumblr.com/api/dashboard/json",
			{
				"email":"okachang@sonicmoov.com",
				"password":"okazakisumopon",
				"callback":"window.cb",
				"num":"50"
			}
		);
	});
	
	window.cb = function(data)
	{
		var posts = data[ "posts" ];
		
		for( var i=0,m=posts.length; i<m; i++ )
		{
			switch( posts[i]["type"] )
			{
				case 'photo' :
					
					var rebloger = posts[i]["reblogged_from_avatar_url_96"]
					if( !rebloger ) rebloger = './img/photo.png';
					
					$('body')
						.append(
							$( '<div>' )
							.attr('id', 'container' + i )
							.css( 'float','left' )
							.append(
								$( "<img width='10' height='10' src='" + rebloger + "'/>")
								.css('position', 'relative')
								.css('left', '10px')
								.css('margin-left', '-10px')
							)
							.append( "<img width='40' height='40' src='" + "./img/photo.png" + "'/>" )//posts[i]["photo-url-400"] +  "'/>" )
							.click( function(){
								window.open( posts[i][ "url" ] );
							} )
						);
					break;
				case "quote" :
					
					var rebloger = posts[i]["reblogged_from_avatar_url_96"]
					if( !reblogMan ) rebloger = './img/qoute.png';
					
					$('body')
						.append(
							$( '<div>' )
							.attr('id', 'container' + i )
							.css( 'float','left' )
							.append(
								$( "<img width='10' height='10' src='" + rebloger + "'/>")
								.css('position', 'relative')
								.css('left', '10px')
								.css('margin-left', '-10px')
							)
							.append( "<img width='40' height='40' src='./img/qoute.png'/>" )
							.click( function(){
								$( this ).find( "img" ).animate( {width: "100px", height:"100px"} )
							} )
						);
					break;
			}
		}
		
		//歳代までスクロールすると次を読み込む
		//
		//alert( document.documentElement.scrollHeight );
		
		/*
		$(window).click(function (event)
		{
			console.log(  "---------------------" );
			console.log(  $(this).scrollTop() );
			console.log(  document.documentElement.scrollHeight );
			
			//alert( $(this).scrollTop() );
			//歳代までスクロールすると次を読み込む
			if( $(this).scrollTop() > document.documentElement.scrollHeight-1000 )
			{
				util.crossDomainGet
				(
					"http://www.tumblr.com/api/dashboard/json",
					{
						"email":"okachang@sonicmoov.com",
						"password":"okazakisumopon",
						"callback":"window.cb",
						"start":50,
						"num":"50",
						"search":"faslkdhfakjsdhfajsdhf"
					}
				);
			}
			
		});	*/
	}
}());
