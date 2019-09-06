
class Payment {

    static getPaymentDriver(driver) {
         return require('./drivers/'+driver+'.js')
    }

    static cardTokenize(card, driver) {
        return Payment.getPaymentDriver(driver).cardTokenize(card)
    }
}
