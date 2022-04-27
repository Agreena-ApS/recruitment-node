import Dinero from "dinero.js"
import getSymbolFromCurrency from "currency-symbol-map"
export = {
  /**
   * @author Sina Sadigh 2021-10-17
   * @description method for converting price object to standard format which is needed in project. response example:{amount:"30.00",currency:"GBP",currencySymbol:"£"}
   * @param {Object} price - object of price that include amount and currency and precision. EX: {amount:3000, currency:"GBP", precision: 2}
   */
  ConvertToStandardFormat(price: any) {
    return {
      amount: Dinero(price).toFormat("0,0.00"),
      currencyCode: price.currency,
      currencySymbol: getSymbolFromCurrency(price.currency),
    };
  },
  ConvertToDineroFormat(price: any) {
    return {
      amount: price.amount,
      currency: price.currency,
      precision: 2,
    };
  },
};
