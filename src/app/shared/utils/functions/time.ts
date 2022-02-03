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
}