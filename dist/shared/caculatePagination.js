"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = void 0;
const calculatePagination = (page, limit) => {
    const skip = (page - 1) * limit;
    return skip;
};
exports.calculatePagination = calculatePagination;
