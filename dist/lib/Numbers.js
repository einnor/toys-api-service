"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Numbers {
    static convertToDecimal(value, precision = 2) {
        let floatValue;
        if (typeof value === 'string') {
            value = value.replace(/[^0-9\.]/g, '');
            floatValue = parseFloat(value);
        }
        else {
            floatValue = value;
        }
        const result = parseFloat(floatValue.toFixed(precision));
        return result;
    }
}
exports.Numbers = Numbers;
//# sourceMappingURL=Numbers.js.map