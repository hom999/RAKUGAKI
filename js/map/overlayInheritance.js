/**
 * Created by JetBrains PhpStorm.
 * User: okazaki
 * Date: 12/02/21
 * Time: 22:17
 * To change this template use File | Settings | File Templates.
 */
(function(h, g){

    /**
     * ハレックス用オーバーレイクラス
     * @param {Image} image
     * @param {google.maps.LatLngBounds} bounds
     */
    var HalexOverlay = function (bounds, image, map, precipitation) {
        this.bounds_ = bounds;
        this.image_ = image;
        this.map_ = map;
        this.div_ = null;
        this.pre_ = precipitation;
    };

    HalexOverlay.prototype = new g.maps.OverlayView();

    HalexOverlay.prototype.setUp = function () {
        this.setMap(this.map_);
    };
    HalexOverlay.prototype.clearMap = function(){
        this.setMap(null);
    };


    HalexOverlay.prototype.onAdd = function () {

        var div = document.createElement('DIV');
        div.style.border = "none";
        div.style.borderWidth = "0px";
        div.style.position = "absolute";
        div.style.opacity = 0;

        var img = this.image_;
        img.style.width = "100%";
        img.style.height = "100%";
        div.appendChild(img);

        this.div_ = div;
        var panes = this.getPanes();
        panes.overlayImage.appendChild(this.div_);

    };

    HalexOverlay.prototype.draw = function () {

        var overlayProjection = this.getProjection();
        //var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
        //var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

        var sw = overlayProjection.fromLatLngToDivPixel( new g.maps.LatLng(this.pre_['south'], this.pre_['west']));
        var ne = overlayProjection.fromLatLngToDivPixel( new g.maps.LatLng(this.pre_['north'], this.pre_['east']));

        console.log(this.bounds_);
        console.log(sw);
        console.log(ne);

        var div = this.div_;
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = (ne.x - sw.x) + 'px';
        div.style.height = (sw.y - ne.y) + 'px';

        $(div).animate({
            'opacity': '0.7'
        }, 1000);

    };

    /**
     * numが0より少ない場合は切り捨て
     * numが0以上の場合切り上げ
     * @param num
     * @return {*}
     */
    HalexOverlay.prototype.coordinate = function (num) {
        var number = num;

        /*
        if (num < 0) {
            number = Math.floor(num);
        } else {
            number = Math.ceil(num);
        }
        */

        return number;
    };

    HalexOverlay.prototype.onRemove = function () {

        $(this.div_).animate({
            'opacity': '0',
            complete: function(){
                this.div_.parentNode.removeChild(this.div_);
                this.div_ = null;
            }
        }, 1000);



    };

   h.HalexOverlay = HalexOverlay;
})(halex, google);


