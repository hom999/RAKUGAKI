/**
 * User: hom
 * Date: 12/03/20
 * Time: 14:16
 */

(function(){

    var util = RAKUGAKI.namespace('RAKUGAKI.util');

    //オブジェクトのクローンを作成
    Object.create = function(s) {
        function f () {};
        f.prototype = s;
        return new f();
    }

})();



