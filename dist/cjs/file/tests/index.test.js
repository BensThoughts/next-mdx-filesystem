"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const __1 = require("..");
const config_1 = require("../../config");
describe('formatDate', () => {
    test('returns the correct file modified date format', () => {
        const date = new Date(2021, 10, 22);
        expect((0, __1.formatDate)(date))
            .toStrictEqual('2021-11-22');
    });
});
describe('isPathDir', () => {
    test('should be true when path is dir', () => {
        expect((0, __1.isPathDir)(config_1.POSTS_DIR)).toBe(true);
    });
    test('should be false when path is a file', () => {
        expect((0, __1.isPathDir)(path_1.default.join(config_1.POSTS_DIR, 'root-article.mdx'))).toBe(false);
    });
});
describe('isPathFile', () => {
    test('should be true when path is file', () => {
        expect((0, __1.isPathFile)(path_1.default.join(config_1.POSTS_DIR, 'root-article.mdx'))).toBe(true);
    });
    test('should be false when path is a dir', () => {
        expect((0, __1.isPathFile)(config_1.POSTS_DIR)).toBe(false);
    });
});
