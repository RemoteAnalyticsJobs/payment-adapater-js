class AuthorizeNet {

    static prepareCardData(card) {
        let data = {
            cardData: {},
            authData: {}
        };
        data.cardData.cardNumber = card.number;
        data.cardData.month = card.expMonth;
        data.cardData.year = card.expYear;
        data.cardData.cardCode = card.cvv;
        data.authData.clientKey = window.raj.clientKey;
        data.authData.apiLoginID = window.raj.LoginId;
        return data;
    }

    static processTokenization(card) {

        AuthorizeNet.attachAcceptJS();
        this.transactionErrors = []
        let data = AuthorizeNet.prepareCardData(card)
        console.log('making transaction');
        Accept.dispatchData(data, data => {
            if( data.messages.resultCode === 'Ok' ) {
                console.log(data);
                let cardData = {
                    card_last_4 : this.getCardLast4(card.number),
                    card_brand: this.getCardBrand(card.number),
                    dataValue : data.opaqueData.dataValue,
                    dataDescriptor: data.opaqueData.dataDescriptor
                }

                return cardData;

            } else {
                data.messages.message.forEach(message => {
                    this.transactionErrors.push(message.text)
                })
            }
        })
    }

    static attachAcceptJS() {
        let script = process.env.NODE_ENV === 'production'
            ? 'https://js.authorize.net/v1/Accept.js'
            : 'https://jstest.authorize.net/v1/Accept.js'
        let acceptJsScript = document.createElement('script')
        acceptJsScript.setAttribute('src', script)
        document.head.appendChild(acceptJsScript)
    }

}
