const CryptoJS = require ('crypto-js')

export function encrypt(param){
    return CryptoJS.AES.encrypt(param, process.env.VUE_APP_SECRET_KEY, {
        mode: CryptoJS.mode.ECB,
      }).toString();
}

export function decrypt (param){
    return CryptoJS.AES.decrypt(param, process.env.VUE_APP_SECRET_KEY, {
        mode: CryptoJS.mode.ECB,
      }).toString(CryptoJS.enc.Utf8);
}

export function encryptObject(param){
    const jsonString = JSON.stringify(param);
    return CryptoJS.AES.encrypt(jsonString, process.env.VUE_APP_SECRET_KEY).toString();
}

export function decryptObject(param){
    const decryptedBytes = CryptoJS.AES.decrypt(param, process.env.VUE_APP_SECRET_KEY);
    const decryptedJsonString = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedJsonString);
}