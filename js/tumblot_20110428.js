(function ()
{
	var i,j,m,n;
	var tumb_api_obj;
	
	///----------------------------------------------------------------------------/// postsCHtmls
	var postsCHtmls = {
		
		"photo" : function ( post, i ){
			var rebloger = ( rebloger ) ? post[i]["reblogged_from_avatar_url_96"] : './img/photo.png';
			var html = '<div class="post_photo" id="post_' + i + '">';
						html += "<img width='150' height='150' src='" + post[i]["photo-url-400"] +  "'/>";
						html += "<img width='10' height='10' src='" + rebloger + "'/>";
						html += '</div>';
			return html;	
		},
		
		
		"quote" : function ( post, i ) {
			var rebloger = ( rebloger ) ? post[i]["reblogged_from_avatar_url_96"] : './img/qoute.png';
			var html = '<div class="post_quote" id="post_' + i + '">';
						html += ( "<p><h1>" + textsUtils.get100Str( post[i]["quote-text"] ) + "</h1></p>" );
						html += "<img width='10' height='10' src='" + rebloger + "'/>";
						html += '</div>';
			return html;
		}
	}
	
	///----------------------------------------------------------------------------/// postsUserActions
	var postsUserActions = {
		
		"killEvent" : function ( ev ) {
			ev.preventDefault();
			ev.stopPropagation();
		},
		"photoClick" : function ( ev, posts ) {
			var index = Number( $(ev.target).attr( "id" ).split("_")[1] );
			window.open( posts[ index ][ "reblogged-root-url" ] );
			
			postsUserActions.killEvent( ev );
		},
		"photoOver" : function ( ev, post ) {
		},
		"quoteClick" : function ( ev, posts ) {
			var index = Number( $(ev.target).attr( "id" ).split("_")[1] );
			window.open( posts[ index ][ "reblogged-root-url" ] );
			
			postsUserActions.killEvent( ev );
		},
		"quoteOver" : function ( ev, post ) {
		}
	}
	
	
	///----------------------------------------------------------------------------/// textsUtils
	var textsUtils = {
		
		"get100Str" : function ( str ) {
			return str.substr( j, 100 ) + ".......and";
		}
	}
	
	///----------------------------------------------------------------------------/// apiUtils
	var apiUtils = {
		
		"getTumbAPIObj" : function ( defaultObj ) {
			var obj = {};
			obj.email		= ( defaultObj.email ) ? defaultObj.email :"okachang@sonicmoov.com";
			obj.password	= ( defaultObj.password ) ? defaultObj.password :"";
			obj.callback	= ( defaultObj.callback ) ? defaultObj.callback :"window.APICallback";
			obj.start		= ( defaultObj.start ) ? defaultObj.start :0;
			obj.num			= ( defaultObj.num ) ? defaultObj.num :50;
			obj.filter		= ( defaultObj.filter ) ? defaultObj.filter :"";//text(plain text onkly) none(author entered only) 
			obj.likes		= ( defaultObj.likes ) ? defaultObj.likes :0;
			obj.type		= ( defaultObj.type ) ? defaultObj.type :"";
			return obj;
		}
	}
	
	
	
	window.APICallback = function ( data )
	{
		var i,m,j,n;
		var posts = data[ "posts" ];
		
		for( i=0,m=posts.length; i<m; i++ )
		{
			switch( posts[i]["type"] )
			{
				case 'photo' :
					$('#posts').append( postsCHtmls.photo( posts, i ) );
					$( '#post_' + i ).bind( "click", function ( ev ){
						postsUserActions.photoClick( ev, posts );
					});
					break;
				case "quote" :
					$('#posts').append( postsCHtmls.quote( posts, i ) );
					$( '#post_' + i ).bind( "click", function ( ev ){
						postsUserActions.quoteClick( ev, posts );
					});
					break;
			}
		}
		
	}
	
	
	
	$(function()
	{
		//なんちゃってオーバーライド
		var EEE = {
			baseEventHandler : function () {
				console.log( "baseEventHandler" );
			},
			clickFunc : function () {
				console.log( "clickFunc" );
				this.baseEventHandler();
			}
		};
		
		
		//オブジェクトのクローンを作成
		function object ( s ) {
			function f () {};
			f.prototype = s;
			return new f();
		}
		
		
		var kani = [ 1,2,3,4,5 ];
		var k = object ( kani );
		k.custumFunc = function(){ console.log( this.length ) };
		k.custumFunc();
		
		//あれprototypeがundefined
		var Koi = function(){};
		var kkkkk = new Koi();
		console.log( kkkkk.prototype );
		console.log( kkkkk.__proto__ );
		
		
		//var arr = [ 1,1,1,1,1,1,1,1,1,1 ];
		//varr.custumFunc();
		
		
		
		
		
		/**
		 * extend function
		 * @param {Object} s superclass
		 * @param {Function} c constructor
		 */
		function extend(s, c)
		{
			function f(){};
			f.prototype = s.prototype;
			c.prototype = new f();
			c.prototype.__super__ = s.prototype;    // __super__のところを superclass とかにしてもOK!!
		         c.prototype.__super__.constructor = s;  // 上に同じく。但し、 super は予約語。
			c.prototype.constructor = c;
			return c;
		};

		/*使用例
		Human = extend(Animal, function()
		{
		    // Human コンストラクタ
		    // this.__super__.constructor(); ← でAnimalコンストラクタ呼出せる。
		});

		Human.prototype.walk = function()
		{
		   this.__super__.walk();
		   alert('teku, teku');
		}

		new Human().walk(); // alert('noshi, noshi')  alert('teku, teku');
		*/
				
		
		
		
		
		
		/**
		 * @param {String} s スーパクラス名(同一名前空間にある必要ある。)
		 * @param {Function} c コンストラクター function Hoge() みたいに名前つける。
		 * @param {Object} o メソッドとかプロパティ
		 */
		function define(s, c, o)
		{
		    var i, p, n = c.toString().match(/^function ([^(]+)\(/)[1];
		    p = c.prototype = new this[s];
		    for(i in o){ p[i] = o[i]; };
		    this[n] = c;
		}
		
		
		/*使用例
		namespace = {};
		namespace.define = define;
		namespace.Animal = function(){};
		namespace.Animal.prototype = { prop1: 'Animal' };
		
		namespace.define
		(
		    'Animal',
		    function Human()
		    {
		        // 何かする。
		    },
		    {
		       prop2 : 'Human'
		    }
		);

		alert(new namespace.Human().prop1); // Animal
		*/
		
		
		
		
		
		
		
		
		
		
		
		///------------------------------------------------------------------------/// DOM LAYOUT
		
		$( "body" ).append( "<ul id='posts'></ul>" );
		
		
		///------------------------------------------------------------------------/// AJAX
		
		var kani = String( location.href ).split( "?" )[1];
		if( kani ) var pass = kani.split( "=" )[ 1 ];
		
		util.crossDomainGet
		(
			"http://www.tumblr.com/api/dashboard/json",
			apiUtils.getTumbAPIObj({ "start":0, "num":50, "password":pass })
		);
		
	});
}());
