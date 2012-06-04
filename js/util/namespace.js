/**
 * 名前空間を作成する
 * ドットシンタックスで指定。存在しなければ作成し、あれば現状のものを優先する
 * @parameter ns_string like RAKUGAKI.unit.template ...
 * @author okazaki
 */
var RAKUGAKI = RAKUGAKI || {};
RAKUGAKI.namespace = function (ns_string) {
    var parts   = ns_string.split('.'),
        parent  = RAKUGAKI,
        i, m    = parts.length;

    if (parts[0] === "RAKUGAKI") {
        parts = parts.slice(1);
    }

    for (i = 0; i < m; i += 1) {
        //名前空間が存在しなければ作成する
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    //最下の名前空間の参照を返す
    return parent;
};

RAKUGAKI.namespace('scene.main');
RAKUGAKI.namespace('util');

