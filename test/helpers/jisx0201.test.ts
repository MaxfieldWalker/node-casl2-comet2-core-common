"use strict";

import * as assert from "assert";
import { convertToCharCode, convertToCharCodes, isStrInRange, convertToString } from "../../src/helpers/jisx0201";

suite("JIS X 0201 test", () => {
    test("convert test", () => {
        assert.equal(convertToCharCode("A"), 0x41);
    });

    test("convert to char codes test", () => {
        assert.deepEqual(convertToCharCodes("ABCDE"), [0x41, 0x42, 0x43, 0x44, 0x45]);
    });

    test("isStrInRange test", () => {
        assert(isStrInRange("ABCDE"));
        assert(!isStrInRange("あいうえお"));
    });

    suite("convert to string from char code", () => {
        test("in range", () => {
            const s = [0x41, 0x42, 0x43, 0x44, 0x45];
            const r = convertToString(s);
            assert.equal(r, "ABCDE");
        });
        test("out of range", () => {
            const s = [0x410, 0x420, 0x430, 0x440, 0x450];
            try {
                const r = convertToString(s);
            } catch (error) {
                return;
            }

            throw new Error();
        });
    });
});
