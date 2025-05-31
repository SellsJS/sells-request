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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  httpClient: () => httpClient
});
module.exports = __toCommonJS(index_exports);

// src/httpclient.ts
var import_axios = __toESM(require("axios"));
function handleAxiosError(error) {
  if (import_axios.default.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    return new Error(message);
  }
  return new Error("Unexpected Error: " + (error?.message || String(error)));
}
function getEnvVar(key) {
  return process.env[key];
}
function resolveBaseUrl(base) {
  if (base.startsWith("http")) return base + "/";
  const envKey = base.toUpperCase();
  const value = getEnvVar(envKey);
  if (!value) {
    throw new Error(`Base URL "${base}" not found in environment variables.`);
  }
  return value + "/";
}
var httpClient = {
  get: async (baseUrl, path = "", config = {}) => {
    try {
      return await import_axios.default.get(`${resolveBaseUrl(baseUrl)}${path}`, config);
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  post: (baseUrl, path = "", data, config = {}) => {
    try {
      return import_axios.default.post(`${resolveBaseUrl(baseUrl)}${path}`, data, config);
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  put: (baseUrl, path = "", data, config = {}) => {
    try {
      return import_axios.default.put(`${resolveBaseUrl(baseUrl)}${path}`, data, config);
    } catch (error) {
      throw handleAxiosError(error);
    }
  },
  delete: (baseUrl, path = "", config = {}) => {
    try {
      return import_axios.default.delete(`${resolveBaseUrl(baseUrl)}${path}`, config);
    } catch (error) {
      throw handleAxiosError(error);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  httpClient
});
//# sourceMappingURL=index.js.map