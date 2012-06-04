/* @nodeploy */
/********************************************************
 * error
 * @author  okazaki
 ********************************************************/

var hom999 = !hom999 || {};
hom999.form = {

    /**
     * name付きform要素の、クエリ取得
     * @param elements(form)
     */
    buildFormQueryString : function(elements){
        var i,
            qs  = '',
            m   = elements.length;

        for(i=0; i<m; i++){
            var element = elements[i];
            if(element.name){

                if(element.type === 'checkbox'){
                    if(element.checked){
                        //チェック済み
                        qs += this.addQueryString(element.name,element.value);
                    }
                }else
                {
                    qs += this.addQueryString(element.name,element.value);
                }
            }
        }
        return qs.substr(1, qs.length-1);
    },
    getFormParameters : function(elements){
        var i,
            params = {},
            m   = elements.length;

        for(i=0; i<m; i++){
            var element = elements[i];
            if(element.name){

                if(element.type === 'checkbox'){
                    if(element.checked){
                        params[element.name] = element.value;
                    }
                }else{
                    params[element.name] = element.value;
                }
            }
        }
        return params;
    },

    /**
     * @param name
     * @param value
     */
    addQueryString : function(name,value){
        var string = '&' + name  + "=" +  value;
        return string;
    }
}
