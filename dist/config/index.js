"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = (variable) => {
    const configValue = process.env[variable];
    if (typeof configValue !== 'string') {
        throw new Error(`Missing environment variable: ${variable}`);
    }
    return configValue;
};
//# sourceMappingURL=index.js.map