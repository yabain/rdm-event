export const monthStringList = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre"
]

export const weekStringList = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
]
export class UtilTime
{
    static getFormatDayAndMonth(date:Date): string {
     return `${date.getDate()<10?"0"+date.getDate():date.getDate()} ${monthStringList[date.getMonth()]}`
    }
    static getMonthStringByNumber(num):string
    {
        return monthStringList[num]
    }
    static getDateFromString(dateString,timeString=null):Date
    {
        let d = new Date()
        d.setFullYear(parseInt(dateString.split("/")[2]))
        d.setMonth(parseInt(dateString.split("/")[1])-1)
        d.setDate(parseInt(dateString.split("/")[0]))

        if(timeString)
        {
            d.setHours(parseInt(timeString.split(":")[0]))
            d.setMinutes(parseInt(timeString.split(":")[1]))
        }
        return d;
    }
    static getMonthNumberFromDate(d:Date):String
    {
        return `${(d.getMonth()+1)<10?"0"+(d.getMonth()+1):(d.getMonth()+1)}`
    }
    static getDateNumberFromDate(d:Date):String
    {
        return `${(d.getDate())<10?"0"+(d.getDate()):(d.getDate())}`
    }
    static getTimeFromDate(d:Date):String
    {
        return `${d.getHours()<10?"0"+d.getHours():d.getHours()}H:${d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes()}`
    }

    static getStringIntervalDateFromString(startDate,startTime,endDate,endTime)
    {
        let d=UtilTime.getDateFromString(startDate,startTime);
        

        let d2 = UtilTime.getDateFromString(endDate)
       

        let sd= UtilTime.getFormatDayAndMonth(d)
        let stringTitle= sd.split(" ")[0];
        if(d.getMonth()!=d2.getMonth())
        {
          stringTitle=`${sd} - ${UtilTime.getFormatDayAndMonth(d2)}`;
        }
        else if(d.getDate()!=d2.getDate())
        {
          let sd2=UtilTime.getFormatDayAndMonth(d2)
          stringTitle+=` - ${sd2.split(" ")[0]} ${sd2.split(" ")[1]}`
        }
        else {
          stringTitle=sd;
        }
        return stringTitle
    }
}