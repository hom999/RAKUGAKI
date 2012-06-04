/**
 * @author oka
 */

//カプセル
(function(){


//-------------------------------------------------------------OkaUtils名前空間
var OkaUtils = function (){}
var MEMBERS = OkaUtils.prototype;

//Utilメンバ
MEMBERS.setName = function(name)
{
	this.name = name;
}
MEMBERS.getName = function()
{
	return this.name;
}

/**
 * postによるクロスドメイン通信
 * 完了がトリガできない？
 * データがiframe経由となる
 * 
 * formを介してsubmitしてるだけ
 * @param {Object} url
 * @param {Object} post
 */
MEMBERS.crossDomainPost = function(url,post)
{
	if(post!=null)
	{
		//データ格納用iframe
		var frame = document.createElement( "iframe" );
		frame.name="dm_frame";
		
		var form=document.createElement("form");
		form.method="post";
		form.action=url;
		form.target="dm_frame";
		for(var i in post)
		{
			var query=document.createElement("input");
			query.type="hidden";
			query.name=i;
			query.value=post[i];
			form.appendChild(query);
		}
		document.body.appendChild( frame );
		document.body.appendChild(form);
		form.onsubmit=function (){
			document.body.removeChild(this);
		};
		form.submit();
		return;
	}
}


/**
 * getによるクロスドメイン通信
 * 完了がトリガできない？
 * 
 * formを介してsubmitしてるだけ
 * @param {Object} url
 * @param {Object} post
 */
MEMBERS.crossDomainGet = function (url,data )
{
  var script=document.createElement("script");
  script.type="text/javascript";
  var _url = url;
  if( data != null )
  {
  	_url += "?";
 	 for(var prop in data) _url += prop + "=" + data[prop] + "&
";
  }
  script.src=_url;
  script.onload=function ()
  {
    document.body.removeChild(this);
  };
  document.body.appendChild(script);
}




window.util = new OkaUtils();//windowにutilプロパティ作成
	
}());


