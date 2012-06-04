/* @nodeploy */
/********************************************************
 * date
 * @author  okazaki
 ********************************************************/

var hom999 = !hom999 || {};
hom999.date = {

    MILLI_SECONDS_PER_MINUTE : 1000 * 60,
    MILLI_SECONDS_PER__HOUR : 1000 * 60 * 60,
    MILLI_SECONDS_PER_DAY : 1000 * 60 * 60 * 24,

    /**
     * todayを含む週を取得する
     * return [date object, ...... ]
     * @param today
     * @author okazaki
     */
    getThisWeek : function(today){
        var self        = compi.date,
            date        = today,
            dateDay     = today.getDay(),
            dates,
            startData,
            endData;

        if ( dateDay == 0 ){//sunday
            startData = new Date( date.getTime() - (6 * self.MILLI_SECONDS_PER_DAY) );
            endData = date;
        }else
        if ( dateDay == 1 ){
            startData = date;
            endData = new Date( date.getTime() + (6 * self.MILLI_SECONDS_PER_DAY) );
        }else
        if ( dateDay == 2 ){
            startData = new Date( date.getTime() - (1 * self.MILLI_SECONDS_PER_DAY) );
            endData = new Date( date.getTime() + (5 * self.MILLI_SECONDS_PER_DAY) );
        }else
        if ( dateDay == 3 ){
            startData = new Date( date.getTime() - (2 * self.MILLI_SECONDS_PER_DAY) );
            endData = new Date( date.getTime() + (4 * self.MILLI_SECONDS_PER_DAY) );
        }else
        if ( dateDay == 4 ){
            startData = new Date( date.getTime() - (3 * self.MILLI_SECONDS_PER_DAY) );
            endData = new Date( date.getTime() + (3 * self.MILLI_SECONDS_PER_DAY) );
        }else
        if ( dateDay == 5 ){
            startData = new Date( date.getTime() - (4 * self.MILLI_SECONDS_PER_DAY) );
            endData = new Date( date.getTime() + (2 * self.MILLI_SECONDS_PER_DAY) );
        }else
        if ( dateDay == 6 ){
            startData = new Date( date.getTime() - (5 * self.MILLI_SECONDS_PER_DAY) );
            endData = new Date( date.getTime() + (1 * self.MILLI_SECONDS_PER_DAY) );
        }

        dates = [ startData,
            new Date( startData.getTime() + ( self.MILLI_SECONDS_PER_DAY * 1 )),
            new Date( startData.getTime() + ( self.MILLI_SECONDS_PER_DAY * 2 )),
            new Date( startData.getTime() + ( self.MILLI_SECONDS_PER_DAY * 3 )),
            new Date( startData.getTime() + ( self.MILLI_SECONDS_PER_DAY * 4 )),
            new Date( startData.getTime() + ( self.MILLI_SECONDS_PER_DAY * 5 )),
        endData ];

        return dates;
    },



    /**
     * 日付文字列をseparatorで区切って返す
     * 例) yyyymmdd → yyyy年mm月dd日
     * 例) yyyymmdd → yyyy/mm/dd
     *
     * @param date
     * @param separator
     * @author iura
     */
    dateFormat : function(date,separator){

        var spt1,spt2,spt3,
            year,month,day;

        if(separator){
           spt1 = spt2 = separator; spt3 = '';
        }else{
           spt1 = "年";  spt2 = "月"; spt3 = "日";
        }

        year = date.substring(0, 4);
        month = date.substring(4,6);
        day  = date.substring(6,8);

        if(separator === '.'){
            year = date.substring(2, 4);
        }

        return year + spt1 + month + spt2 + day + spt3;
    },

    /**
     * 年と月を指定する→　その月の日付リストを返す
     * @param year
     * @param month
     */
    getValidDates : function(year, month){

        var dates = [],
            d = new Date(year + '/' + (month) + '/1'),
            i,
            m = 31;

        for(i=1; i<=m; i++){
            d.setDate(i);

            if(month === d.getMonth()+1){
                dates.push(i);
            }
        }
        return dates;
    }
};

