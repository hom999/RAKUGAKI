/* @nodeploy */
/********************************************************
 * validator
 * @author okazaki
 *********************************************************/

hom999.validator = {
    //validate後のクエリパラメータをobject形式で保持
    queryParsedObj : {},
    inValidateColl : [],
    alrtMsgs : [],
    debug : false,


    /**
     * 指定範囲内の正の整数チェック
     * @param val
     */
    isPlusIntFromTo :function(name, val, from, to){
        var self = compi.validator,
            flag = false;
        if(self.debug) self.TEST_isPlusIntFromTo(name, val, from, to);

        //ブランクは許可!!!
        if(self.isEmpty(val)) return true;

        if(
            !self.isNotNum(val) &&
                !self.isMinus(val) &&
                !self.isNotInt(val) &&
                from <= val &&
                to >= val
            ){
            flag = true;
        }

        //
        if(val === ' ' || val === '　'){
            flag = false;
        }

        return flag;
    },

    /**
     * テストコード
     * @param val
     */
    TEST_isPlusIntFromTo :function(name, val, from, to){
        var self = compi.validator,
            debugString = '';

        debugString += 'TEST ------ \nType: plus_int_from_to\n';

        if(self.isEmpty(val)){
            debugString += 'isEmpty: true --- \n ok';
            alert(debugString);
        }else{
            if(
                !self.isNotNum(val) &&
                    !self.isMinus(val) &&
                    !self.isNotInt(val) &&
                    from <= val &&
                    to >= val
                ){
                debugString +=
                    'VALID ' +
                    '\n name : ' + name +
                    '\n val : ' + val +
                    '\n from : ' + from +
                    '\n to :' + to;
            }else{
                debugString +=
                    'NOT VALID' +
                    '\n name : ' + name +
                    '\n val : ' + val +
                    '\n from : ' + from +
                    '\n to :' + to;
            }
            alert(debugString);
        }
    },

    /**
     * 配列内に等しいものがあるかチェック(文字列に限る)
     * @author okazaki
     */
    isEqualWithArray : function(name, val, ary){
        var self = compi.validator,
            i,
            m = ary.length;

        if(self.debug) self.TEST_isEqualWithArray(name, val, ary);

        for( i=0; i<m; i++ ){
            if(val === String(ary[i])){
                return true;
            }
        }
        return false;
    },

    /**
     * テストコード
     * @author okazaki
     */
    TEST_isEqualWithArray : function(name, val, ary){

        var i,
            m = ary.length,
            debugString = 'NOT VALID \n';

        for( i=0; i<m; i++ ){
            if(val === String(ary[i])){
                debugString = 'VALID \n';
            }
        }

        debugString += 'TEST ------ \nType: equal_with_array\n';
        debugString += '検索 name : ' + name + '\n';
        debugString += '検索 value : ' + val + '\n';
        debugString += '配列 : ' + ary + '\n';
        alert(debugString);
    },

    /**
     * from よりも to の方が後の時間が設定されているかのチェック
     * @param from
     * @param to
     */
    isValidTimeFromTo:function(from, to){
        var self = compi.validator;
        if(self.debug) self.TEST_isValidTimeFromTo(from, to);
        return from.getTime() <= to.getTime();
    },

    /**
     * テストコード
     * @param from
     * @param to
     */
    TEST_isValidTimeFromTo : function(from, to){
        var debugString = '';
        if(from.getTime() <= to.getTime()){
            debugString = 'VALID\n';
            debugString += 'TEST ------ \nType: time_from_to\n';
            debugString += '検索 from : ' + from + '\n';
            debugString += '検索 to : ' + to;
        }else{
            debugString = 'NOT VALID\n';
            debugString += 'TEST ------ \nType: time_from_to\n';
            debugString += '検索 from : ' + from + '\n';
            debugString += '検索 to : ' + to;
        }
        alert(debugString);
    },

    /**
     * パラメータを評価し、falsyな場合はreplacer
     * で差し替える
     * @param val
     * @param replacer
     */
    isValidData : function(val, replacer){

        if(
            typeof val === "undefined" ||
                val === null
            ){

            val = replacer;
        }

        return val;
    },

    /* ------------------------------------------------------------------------------------- ベース機能(テスト済み)*/

    /**
     * 空文字をエラー判別
     * @param {Object} val
     */
    isEmpty :function(val){
        var isEmpty = ( val === "" || val === null );
        return isEmpty;
    },

    /**
     * 整数check
     * @param {Object} val
     */
    isNotInt :function(val){
        var self = compi.validator;
        if(self.isNotNum(val)){
            return false;
        }
        var num = Number(val);
        var isNotInt = (String( num ) != String( parseInt(num) ));
        return isNotInt;
    },

    /**
     * 正の整数check
     * @param {Object} val
     */
    isMinus :function(val){
        var self = compi.validator;
        if(self.isNotNum(val)){
            return false;
        }
        var num = Number(val);
        var isNotMinus = parseInt(num) < 0;
        return isNotMinus;
    },

    /**
     * 整数の桁check
     * @param {Object} val
     * @param {Object} keta
     */
    isKetaOver :function(val, keta){
        var self = compi.validator;
        if(self.isNotNum(val)){
            return false;
        }
        var num = Number(val);
        var isKetaOver = ( String( num ).length > keta );
        return isKetaOver;
    },


    /**
     * 数値check
     * @param {Object} val
     */
    isNotNum :function(val){
        var num = Number(val);
        var isNotNum;
        if(num === 0){
            isNotNum = false;
        }else{
            isNotNum = !Boolean(num);//NaNの場合true
        }
        return isNotNum;
    },

    /**
     * 小数点以下の桁数check
     * @param {Object} val
     * @param {Object} length
     */
    isDecOver :function(val, length){
        var self = compi.validator;
        if(self.isNotNum(val)){
            return false;
        }
        var num = Number(val);
        var dec = String( num ).split( ".")[1];
        if(!dec) return false;

        var isDecOver = ( dec && dec.length > length );
        return isDecOver;
    },

    /**
     * 数値の最大値check
     * @param {Object} val
     * @param {Object} max
     */
    isMaxOver :function(val, max){
        var self = compi.validator;
        if(self.isNotNum(val)){
            return false;
        }
        var num = Number(val);
        var isMaxOver = ( num > max );
        return isMaxOver;
    },


    /**
     * 文字列。バイト数check
     * @param {Object} val
     * @param {Object} byteLength
     */
    isByteLenOver :function(val, byteLength){
        c = 0;
        for (i=0; i<val.length; i++) {
            n = escape(val.charAt(i));
            if (n.length < 4) c++;
            else c += 2;
        }
        var isByteLenOver = ( c  > byteLength );
        return isByteLenOver;

    },

    /**
     * 文字列半角計算で文字数を制限
     * @param {Object} val
     * @param {Object} length
     */
    isHalfByteOver :function(val, length){
        var lengthVal = 0;
        var hankakuLength = String( val ).replace( /[ -~｡-ﾟ]/g, "-" ).match(/-/g);
        var zenkakuLength = String( val ).replace( /[^ -~｡-ﾟ]/g, "あ" ).match(/あ/g);
        if(hankakuLength == null) hankakuLength = "";
        if(zenkakuLength == null) zenkakuLength = "";

        var totalTexts = hankakuLength.length + ( zenkakuLength.length * 2);
        var isHalfByteOver = ( totalTexts > length );
        return isHalfByteOver;
    },

    /**
     *
     * @param dateStr
     */
    isValidDate:function(dateStr){
        var isValidDate = dateStr.match(/[0-9]{4}\/[0-9]{2}\/[0-9]{2}/i);
        if(!isValidDate) isValidDate = false;
        if(dateStr.length > 10) isValidDate = false;
        return isValidDate;
    }

};

