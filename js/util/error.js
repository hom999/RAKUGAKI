/* @nodeploy */
/********************************************************
 * error
 * @author  okazaki
 ********************************************************/


hom999.error = {

    ERROR_300 : '読み込みに失敗しました',
    ERROR_400 : '読み込みに失敗しました',
    ERROR_500 : '読み込みに失敗しました',

    /**
     *
     * @param status
     * @param msg
     * @author okazaki
     */
    netWorkAlert : function(status, msg){
        var self = this;

        switch(status){
            case 300:
                alert(self.ERROR_300);
                break;
            case 400:
                alert(self.ERROR_400);
                break;
            case 500:
                alert(self.ERROR_500);
                break;
            default :
                alert(msg);
                break;
        }
    }
};