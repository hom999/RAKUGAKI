/* @nodeploy */
/**
 * Created with JetBrains WebStorm.
 * User: okazaki
 * Date: 12/05/23
 * Time: 2:10
 * To change this template use File | Settings | File Templates.
 */
(function($, h, g){

    h.map ={
        map: '',
        conf_: '',
        mk: '',
        timer:"",
        draggingEnd:false,
        init: function (conf) {
            var self = this;
            self.conf_ = conf;

            var CENTER = new g.maps.LatLng(self.conf_.LAT, self.conf_.LNG);
            var myOptions = {
                zoom:10,
                maxZoom: 14,
                minZoom: 6,
                center:CENTER,
                mapTypeId:g.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                    style: g.maps.NavigationControlStyle.SMALL,
                    position:g.maps.ControlPosition.LEFT_BOTTOM
                },
                disableDoubleClickZoom: true,
                streetViewControl:false,
                mapTypeControl:false,
                disableDefaultUI:true,
                draggable:true,
                scaleControl: true
            };
            map = new g.maps.Map(document.querySelector(self.conf_.CANVAS_ID), myOptions);

            g.maps.event.addListener(map, 'bounds_changed', this.updateMapDatas);
            g.maps.event.addListener(map, 'dragstart', this.dragStart);
            g.maps.event.addListener(map, 'drag', this.dragging);
            g.maps.event.addListener(map, 'dragend', this.dragEnd);

            this.updateMarker();

            return map;
        },

        updateMarker: function () {
            var self = this;

            if(self.mk !== '') self.mk.setMap(null);

            var ll = new google.maps.LatLng(self.conf_.LAT, self.conf_.LNG);
            self.mk = new google.maps.Marker({
                  position: ll,
                  map: map
              });

        },

        dragStart: function (ev) {
            h.vm.setMapAnimeControl('loading');
        },
        dragging: function (ev) {
        },
        dragEnd: function (ev) {
        },
        updateMapDatas: function (){
            var latlng = map.getCenter();

            //拡大縮小をfilter
            if(latlng.lat() === h.conf.LAT && latlng.lng() === h.conf.LNG) return;
            h.conf.LAT = latlng.lat();
            h.conf.LNG = latlng.lng();

            clearTimeout(self.timer);
            self.timer = setTimeout(function(){
                h.map.updateMarker();

                var latIsValid = (h.conf.LAT >= 20 && h.conf.LAT <= 48);
                var lngIsValid = (h.conf.LNG >= 118 && h.conf.LNG <= 150);
                if(latIsValid && lngIsValid){
                    h.nowcast.outOfArea = false;
                    h.nowcast.preload();
                }else{
                    h.nowcast.outOfArea = true;
                    alert('情報取得可能範囲外です');
                }
            },500);
        }
    }

})($, halex, google);