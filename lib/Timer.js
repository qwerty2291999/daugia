class Timer {
    nextDay(day){
        const plusDay = 1000*60*60*24*day 
        const next = Date.now() + plusDay;
        return new Date(next)
    }
    now(){
        const now = new Date(Date.now())
        return now;
    }
    countDown(dayend){
        const sec = 1000
        const minute = sec * 60
        const hour = minute * 60
        const day = hour * 24
        const dayEnd = dayend
        let dayEndtoMili = new Date(dayEnd).getTime();
        let now = Date.now();
        let timeLeft = dayEndtoMili - now;
        let timerCountDown = `${Math.floor(timeLeft/day)}d ${Math.floor((timeLeft%day)/hour)}h:${Math.floor((timeLeft%hour)/minute)}m:${Math.floor((timeLeft%minute)/sec)}s.`
        return timerCountDown
    }
    timeLeft(){
        let a = this.countDown();
        let day = a.slice(0,a.indexOf("d"))
        let hours = a.slice(a.indexOf("d")+2,a.indexOf("h"))
        let minute = a.slice(a.indexOf("h")+2,a.indexOf("m"))
        let second = a.slice(a.indexOf("m")+2,a.indexOf("s"))
        if(day==0&&hours==12&&minute==0&&second==0){
            this.sentAPI()
        }
    }
    sentAPI(){
        console.log("send api")
    }
}
module.exports = Timer;