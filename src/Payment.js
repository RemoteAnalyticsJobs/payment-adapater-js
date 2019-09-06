
class Payment {

    static getPaymentDriver(driver) {
         return require('./drivers/'+driver+'.js')
    }

    static cardTokenize(card, driver) {
        let driver = Payment.getPaymentDriver(driver);
        return driver.cardTokenize(card)
    }
}
