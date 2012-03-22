/**
 * User: okazaki
 * Date: 12/03/22
 * Time: 17:16
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
        //プロパティが存在しなければ作成する
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};