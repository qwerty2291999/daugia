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
}
module.exports = Timer;