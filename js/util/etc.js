/**
 * User: hom
 * Date: 12/03/20
 * Time: 14:16
 */

(function(){

    var etc = RAKUGAKI.namespace('etc');


    /**
     * ３桁きざみでカンマを追加
     * 100000000 → 100,000,000;
     * @param value
     * @author iura
     */
    etc.addComma = function(value){
        var strValue = value.toString();
        strValue = strValue.replace(/(\d)(?=(\d\d\d)+$)/g,'$1,');
        return strValue;
    };

    etc.parseQuerySTring = function(){
        var qs = location.search.split('?')[1];
        if(qs && qs !== ''){
            var pairs = qs.split('&');
            var obj = {};
            var n, v, i, m = pairs.length;
            for(i=0;i<m;i++){
                n    = pairs[i].split('=')[0];
                v    = pairs[i].split('=')[1];
                obj[n] = v;
            }
            return obj;
        }
    };


    var inheritance = RAKUGAKI.namespace('inheritance');

    //オブジェクトのクローンを作成
    Object.create = function(s) {
        function f () {};
        f.prototype = s;
        return new f();
    };

    /**
     *
     * @return {Object}
     * @author okazaki
     */
    inheritance.mix = function(){
        var arg, child = {};
        for(arg = 0; arg < arguments.length; arg += 1){
            inheritance.deep(arguments[arg], child);
        }
        return child;
    };

    /**
     * オブジェクトのdeepコピー
     * 関数のコピーの際は、childのスコープを束縛
     * 常にchildのスコープ上で呼ばれる。
     * 他のオブジェクトへ関数渡されたときにthisがぶれるの防ぐ
     *
     * バグっている！5/2
     *
     * @param parent
     * @param child
     * @return {*}
     * @author okazaki
     */
    inheritance.deep = function (parent, child){
        var i,
            toStr = Object.prototype.toString,
            astr  = '[object Array]';

        child = child || {};

        for(i in parent){
            if(parent.hasOwnProperty(i)){
                if(typeof parent[i] === 'function'){
                    child[i] = function(){
                      return parent[i].apply(child, [].slice.call(arguments));
                    };
                }else if(typeof parent[i] === 'object'){
                    child[i] = (toStr.call(parent[i]) === astr) ? [] : {} ;
                    inheritance.deep(parent[i], child[i]);
                }else{
                    child[i] = parent[i];
                }
            }
        }
        return child;
    };

})();
