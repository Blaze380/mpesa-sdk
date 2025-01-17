"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var index_exports = {};
__export(index_exports, {
  MpesaClient: () => MpesaClient
});
module.exports = __toCommonJS(index_exports);

// src/mpesa-client.ts
var import_crypto = __toESM(require("crypto"));
var import_cross_fetch = __toESM(require("cross-fetch"));
var import_constants = __toESM(require("constants"));
var MpesaClient = class _MpesaClient {
  constructor(config) {
    this.apiConfig = config;
    this.baseUrl = "https://api.sandbox.vm.co.mz";
    this.origin = "https://developer.mpesa.vm.co.mz";
    this.headers = new import_cross_fetch.Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiConfig.bearerToken}`,
      Origin: this.origin
    });
    if (!this.apiConfig.apiKey || !this.apiConfig.publicKey)
      throw new Error("You Have to provide your Api key and your public key.");
    if (!this.apiConfig.bearerToken)
      this.apiConfig.bearerToken = _MpesaClient.generateBearerToken(this.apiConfig.apiKey, this.apiConfig.publicKey);
  }
  static generateBearerToken(apiKey, publicKey) {
    publicKey = `-----BEGIN PUBLIC KEY-----
 ${publicKey} 
-----END PUBLIC KEY-----`;
    const buffer = Buffer.from(apiKey);
    const encrypted = import_crypto.default.publicEncrypt(
      {
        "key": publicKey,
        "padding": import_constants.default.RSA_PKCS1_PADDING
      },
      buffer
    );
    return encrypted.toString("base64");
  }
  getUrl(path, port) {
    port = port ? ":" + port : "";
    return this.baseUrl + port + path;
  }
  post(url, body) {
    return __async(this, null, function* () {
      return yield (0, import_cross_fetch.default)(url, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(body)
      });
    });
  }
  put(url, body) {
    return __async(this, null, function* () {
      return yield (0, import_cross_fetch.default)(url, {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify(body)
      });
    });
  }
  get(url) {
    return __async(this, null, function* () {
      return yield (0, import_cross_fetch.default)(url, {
        method: "GET",
        headers: this.headers
      });
    });
  }
  getStringParams(params) {
    return Object.entries(params).filter(([key, value]) => key in params && value !== void 0).map(([key, value]) => `${key}=${value}`).join("&").replace(/^/, "?");
  }
  queryTransactionStatus(params) {
    return __async(this, null, function* () {
      params = this.addServiceCodeIntoBody(params);
      const url = this.getUrl("/ipg/v1x/queryTransactionStatus" + this.getStringParams(params), "18353");
      const res = yield this.get(url);
      return yield res.json();
    });
  }
  c2b(params) {
    return __async(this, null, function* () {
      const url = this.getUrl("/ipg/v1x/c2bPayment/singleStage/", "18352");
      params = this.addServiceCodeIntoBody(params);
      const res = yield this.post(url, params);
      return yield res.json();
    });
  }
  b2c(params) {
    return __async(this, null, function* () {
      const url = this.getUrl("/ipg/v1x/b2cPayment/", "18345");
      params = this.addServiceCodeIntoBody(params);
      const res = yield this.post(url, params);
      return yield res.json();
    });
  }
  b2b(params) {
    return __async(this, null, function* () {
      const url = this.getUrl("/ipg/v1x/b2bPayment/", "18349");
      params = this.addServiceCodeIntoBody(params, "partycode");
      const res = yield this.post(url, params);
      return yield res.json();
    });
  }
  reversalTransaction(params) {
    return __async(this, null, function* () {
      const url = this.getUrl("/ipg/v1x/reversal/", "18354");
      params = this.addServiceCodeIntoBody(params);
      const res = yield this.put(url, params);
      return yield res.json();
    });
  }
  /**
   * @alpha Is bugy
   * @param params
   * @returns
   */
  queryCustomerName(params) {
    return __async(this, null, function* () {
      params = this.addServiceCodeIntoBody(params);
      const url = this.getUrl("/ipg/v1x/queryCustomerName" + this.getStringParams(params), "19323");
      const res = yield this.get(url);
      return yield res.json();
    });
  }
  /**
   * Inserts service short code into the body object
   * @param params
   * @returns
   */
  addServiceCodeIntoBody(params, type = "service") {
    if (type === "service")
      params.input_ServiceProviderCode = this.apiConfig.serviceProviderCode;
    else if (type === "partycode")
      params.input_PrimaryPartyCode = this.apiConfig.serviceProviderCode;
    return params;
  }
  /**
   * @deprecated
   * @param url
   * @returns
   */
  getReplyMpesa(url) {
    return (params) => __async(this, null, function* () {
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MpesaClient
});
