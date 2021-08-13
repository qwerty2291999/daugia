class Random{
    SET = {
        number:"1234567890",
        symbol:"qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
        random:"qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM",
        uppercase:"QWERTYUIOPASDFGHJKLZXCVBNM"
    }
    randomString(length,type){
        let result = "";
        for(let i=0;i<length;i++){
            result += type.charAt(Math.floor(Math.random()*type.length))
        }
        return result;
    }
    num(length){
        return this.randomString(length,this.SET.number)
    }
    symbol(length){
        return this.randomString(length,this.SET.symbol)
    }
    random(length){
        return this.randomString(length,this.SET.random)
    }
    uppercase(length){
        return this.randomString(length,this.SET.uppercase)
    }
}
module.exports = Random;