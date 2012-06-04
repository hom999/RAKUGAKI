
cf.canvas.Graphics = function(canvas){
	this.initialize.apply(this, arguments);
};

cf.canvas.Graphics.prototype = {
	/** @type Boolean */
	fill:false,
	/** @type Boolean */
	line:false,
	/** @type Number */
	fillAlpha:1,
	/** @type Number */
	lineAlpha:1,
    /**
     * 初期化
     */
	initialize: function(canvas) {
		this.canvas = canvas;
		try{
			this.drawer = canvas.getContext('2d');
		}catch(e){
			alert('browser not support');
		}
	},
	/**
	 * 塗の開始
	 */
	beginFill: function(color, alpha) {
		if(!color)return;
		this.drawer.fillStyle = this._getColor(color);
		this.fillAlpha = (alpha==undefined)? 1: alpha;
		this.fill = true;
	},
	_startFill: function() {
		this.drawer.globalAlpha = this.fillAlpha;
	},
	/**
	 * ストロークの設定
	 */
	lineStyle: function(thickness, color, alpha, caps, joints, miterLimit){
		this.lineAlpha          = (alpha==undefined)? 1: alpha;
		this.drawer.strokeStyle = this._getColor(color);
		this.drawer.lineWidth   = thickness;
		this.drawer.lineCap     = (caps==undefined)? 'butt': caps;
		this.drawer.miterLimit  = (miterLimit==undefined)? 3: miterLimit;
		if(joints!=undefined){
			this.drawer.lineJoin = joints;
		}
		this.line = true;
	},
	_lineStyle:function(){
		this.drawer.globalAlpha = this.lineAlpha;
	},
	/**
	 * 塗の終了
	 */
	endFill: function(){
		this.drawer.globalAlpha = this.fillAlpha;
		this.drawer.fill();
		this.drawer.globalAlpha = 1;
		this.fill = false;
		this.line = false;
	},
	/**
	 * 楕円の描画
	 */
	drawEllipse: function(x, y, w, h) {
		w = w/2, h = h/2;
		var C = 0.5522847498307933;
		var c_x = C * w,c_y = C * h;
		var drawer = this.drawer;
		drawer.beginPath();
		this._lineStyle();
		drawer.moveTo( x + w, y );
		drawer.bezierCurveTo( x+w  , y-c_y, x+c_x, y-h  , x  , y-h );
		drawer.bezierCurveTo( x-c_x, y-h  , x-w  , y-c_y, x-w, y   );
		drawer.bezierCurveTo( x-w  , y+c_y, x-c_x, y+h  ,x   , y+h );
		drawer.bezierCurveTo( x+c_x, y+h  , x+w  , y+c_y, x+w, y   );
		if(this.line)drawer.stroke();
		drawer.closePath();
		if(this.fill){
			this._startFill();
			drawer.fill();
		}
		drawer.beginPath();
	},
	/**
	 * 矩形の描画
	 */
	drawRect: function(x, y, w, h) {
		var drawer = this.drawer;
		drawer.beginPath();
		//Fill
		if(this.fill){
			this._startFill();
			drawer.fillRect(x, y, w, h);
		}
		//line
		this._lineStyle();
		if(this.line)drawer.strokeRect(x, y, w, h);
		drawer.closePath();
	},
	/**
	 * 円の描画
	 */
	drawCircle: function(x, y, r) {
		var drawer = this.drawer;
		drawer.beginPath();
		this._lineStyle();
		drawer.arc(x, y, r, 0, Math.PI*2, false);
		//line
		if(this.line)drawer.stroke();
		//Fill
		if(this.fill){
			this._startFill();
			drawer.fill();
		}
	},
	/**
	 * 楕円の描画
	 */
	drawRoundRect: function(x, y, w, h, ew, eh) {
		var drawer = this.drawer;
		var C = 0.5522847498307933;
		this.drawer.beginPath();
		eh = (eh == undefined)?ew:eh;
		drawer.beginPath();
		this._lineStyle();
		drawer.moveTo(x+ew,y);
		drawer.lineTo(x+w-ew,y);
		drawer.bezierCurveTo(x+w-ew*C, y, x+w, y+eh*C, x+w, y+eh);
		drawer.lineTo(x+w,y+h-eh);
		drawer.bezierCurveTo(x+w, y+h-eh*C, x+w-ew*C, y+h, x+w-ew, y+h);
		drawer.lineTo(x+ew,y+h);
		drawer.bezierCurveTo(x+ew*C, y+h, x, y+h-eh*C, x, y+h-eh);
		drawer.lineTo(x,y+eh);
		drawer.bezierCurveTo(x, y+eh*C, x+ew*C, y, x+ew, y);
		drawer.closePath();
		if(this.line)drawer.stroke();
		if(this.fill){
			this._startFill();
			drawer.fill();
		}
		drawer.beginPath();
	},
	/**
	 * ポインタの移動
	 */
	moveTo:function(x,y){
		this.drawer.beginPath();
		this.drawer.moveTo(x, y);
	},
	/**
	 * 線を引く
	 */
	lineTo:function(x,y){
		this._lineStyle();
		this.drawer.lineTo(x, y);
		if(this.line)this.drawer.stroke();
	},
	/**
	 * 曲線を引く
	 */
	curveTo: function(controlX, controlY, anchorX, anchorY){
		this._lineStyle();
		this.drawer.quadraticCurveTo(controlX, controlY, anchorX, anchorY);
		if(this.line)this.drawer.stroke();
	},
	/**
	 * 描画内容のクリア
	 */
	clear:function(){
		var h = this.canvas.offsetHeight | this.canvas.clientHeight;
		var w = this.canvas.offsetWidth | this.canvas.clientWidth;
		this.drawer.clearRect(0, 0, w, h);
	},
	/**
	 * 状態の保存
	 */
	save: function() {
		this.drawer.save();
	},
	/**
	 * 状態の復帰
	 */
	restore: function() {
		this.restore.save();
	},
	/**
	 * カラーコードの取得
	 * @param {uint} color
	 * @return {String}
	 */
	_getColor: function(color){
		var c = color.toString(16);
		while(c.length<6){
			c = '0' + c;
		}
		return '#' + c;
	},
	/**
	 * デバッグ用
	 */
	trace:function(){
		console.log(arguments);
	}
};
