/* @nodeploy */
/**
 * Created by JetBrains PhpStorm.
 * User: okazaki
 * Date: 12/02/21
 * Time: 22:17
 * To change this template use File | Settings | File Templates.
 */
(function(h, g){

    h.HalexOverlay  = {

        createOverlay: function (bounds,imgPath,  map){

            var halexOl = {
                map: map,
                overlay: new google.maps.GroundOverlay(imgPath, bounds),
                setUp: function(){
                    var self = this;
                    self.overlay.setOpacity(0);
                    self.overlay.setMap(map);
                    var count = 0;
                    var interval = setInterval(function (){
                        count += 0.2;
                        self.overlay.setOpacity(count);
                        if(count > 0.6) {
                            clearInterval(interval);
                        }
                    }, 100);
                },
                clearMap: function(){
                    var self = this;
                    self.overlay.setMap(null);

                    /*
                    var count = 1;
                    var interval = setInterval(function (){
                        count -= 0.2;
                        self.overlay.setOpacity(count);
                        if(count < 0) {
                            clearInterval(interval);
                            self.overlay.setMap(null);
                        }
                    }, 100);
                    */
                }
            };
            return halexOl;
        }

    };

})(halex, google);


