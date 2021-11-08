"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });

const { Parula } = require("./parula")
const { Network } = require("./types")


// dont override global variable
if (typeof window !== 'undefined' && typeof window.Parula === 'undefined') {
    window.Parula = Parula;
    window.Network = Network;
}

// exports.Parula = Parula;
module.exports = { Parula, Network }