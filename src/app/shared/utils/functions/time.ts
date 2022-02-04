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
export class UtilTime
{
    static getFormatDayAndMonth(date:Date): string {
     return `${date.getDate()<10?"0"+date.getDate():date.getDate()} ${monthStringList[date.getMonth()]}`
    }
    static getMonthStringByNumber(num):string
    {
        return monthStringList[num]
    }
    static getDateFromString(dateString):Date
    {
        let d = new Date()
        d.setFullYear(parseInt(dateString.split("/")[2]))
        d.setMonth(parseInt(dateString.split("/")[1])-1)
        d.setDate(parseInt(dateString.split("/")[0]))
        return d;
    }
    static getMonthNumberFromDate(d:Date):String
    {
        return `${(d.getMonth()+1)<10?"0"+(d.getMonth()+1):(d.getMonth()+1)}`
    }
    static getDateNumberFromDate(d:Date):String
    {
        return `${(d.getDate()+1)<10?"0"+(d.getDate()+1):(d.getDate()+1)}`
    }
}