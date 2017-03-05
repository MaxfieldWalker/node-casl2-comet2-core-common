"use strict";

/**
 * 一文字を文字コードに変換します
 */
export function convertToCharCode(ch: string): number {
    if (ch.length != 1) throw new Error();

    const code = map.get(ch);
    if (code == undefined) throw new Error();
    return code;
}

export function convertToCharCodes(s: string): Array<number> {
    const r = [];
    for (const c of s) {
        r.push(convertToCharCode(c));
    }

    return r;
}

/**
 * JIS X 0201でサポートされる文字列かどうかを返します
 */
export function isStrInRange(str: string): boolean {
    for (let i = 0; i < str.length; i++) {
        const ch = str.charAt(i);
        const code = map.get(ch);
        if (code == undefined) return false;
    }

    return true;
}

/**
 * 文字コードから文字に変換します
 * @param charCode 文字コード
 */
export function convertToChar(charCode: number): string {
    return valueToKey(map, charCode);
}

/**
 * 文字コード列から文字列に変換します
 * @param charCodes 文字コードの配列
 */
export function convertToString(charCodes: Array<number>): string {
    return charCodes.map(charCode => convertToChar(charCode)).join("");
}

function valueToKey<TK, TV>(map: Map<TK, TV>, value: TV) {
    for (const item of map) {
        const [k, v] = item;
        if (value === v) return k;
    }

    throw new Error(`No item has value '${value}'`);
}

const map = new Map<string, number>([
    [" ", 0x20], // 空白
    ["!", 0x21], ["\"", 0x22], ["#", 0x23], ["$", 0x24], ["%", 0x25], ["&", 0x26], ["'", 0x27], ["(", 0x28], [")", 0x29], ["*", 0x2A], ["+", 0x2B], [",", 0x2C], ["-", 0x2D], [".", 0x2E], ["/", 0x2F],
    ["0", 0x30], ["1", 0x31], ["2", 0x32], ["3", 0x33], ["4", 0x34], ["5", 0x35], ["6", 0x36], ["7", 0x37], ["8", 0x38], ["9", 0x39],
    [":", 0x3A], [";", 0x3B], ["<", 0x3C], ["=", 0x3D], [">", 0x3E], ["?", 0x3F], ["@", 0x40],

    ["A", 0x41], ["B", 0x42], ["C", 0x43], ["D", 0x44], ["E", 0x45], ["F", 0x46], ["G", 0x47], ["H", 0x48], ["I", 0x49], ["J", 0x4A], ["K", 0x4B], ["L", 0x4C], ["M", 0x4D],
    ["N", 0x4E], ["O", 0x4F], ["P", 0x50], ["Q", 0x51], ["R", 0x52], ["S", 0x53], ["T", 0x54], ["U", 0x55], ["V", 0x56], ["W", 0x57], ["X", 0x58], ["Y", 0x59], ["Z", 0x5A],
    ["[", 0x5B], ["\\", 0x5C], ["]", 0x5D], ["^", 0x5E], ["_", 0x5F], ["`", 0x60],

    ["a", 0x61], ["b", 0x62], ["c", 0x63], ["d", 0x64], ["e", 0x65], ["f", 0x66], ["g", 0x67], ["h", 0x68], ["i", 0x69], ["j", 0x6A], ["k", 0x6B], ["l", 0x6C], ["m", 0x6D],
    ["n", 0x6E], ["o", 0x6F], ["p", 0x70], ["q", 0x71], ["r", 0x72], ["s", 0x73], ["t", 0x74], ["u", 0x75], ["v", 0x76], ["w", 0x77], ["x", 0x78], ["y", 0x79], ["z", 0x7A],
    ["{", 0x7B], ["|", 0x7C], ["}", 0x7D], ["‾", 0x7E],

    ["。", 0xA1], ["「", 0xA2], ["」", 0xA3], ["、", 0xA4], ["・", 0xA5],

    ["ヲ", 0xA6], ["ァ", 0xA7], ["ィ", 0xA8], ["ゥ", 0xA9], ["ェ", 0xAA], ["ォ", 0xAB], ["ャ", 0xAC], ["ュ", 0xAD], ["ョ", 0xAE], ["ッ", 0xAF], ["ー", 0xB0],
    ["ア", 0xB1], ["イ", 0xB2], ["ウ", 0xB3], ["エ", 0xB4], ["オ", 0xB5], ["カ", 0xB6], ["キ", 0xB7], ["ク", 0xB8], ["ケ", 0xB9], ["コ", 0xBA],
    ["サ", 0xBB], ["シ", 0xBC], ["ス", 0xBD], ["セ", 0xBE], ["ソ", 0xBF], ["タ", 0xC0], ["チ", 0xC1], ["ツ", 0xC2], ["テ", 0xC3], ["ト", 0xC4],
    ["ナ", 0xC5], ["ニ", 0xC6], ["ヌ", 0xC7], ["ネ", 0xC8], ["ノ", 0xC9], ["ハ", 0xCA], ["ヒ", 0xCB], ["フ", 0xCC], ["ヘ", 0xCD], ["ホ", 0xCE],
    ["マ", 0xCF], ["ミ", 0xD0], ["ム", 0xD1], ["メ", 0xD2], ["モ", 0xD3], ["ヤ", 0xD4], ["ユ", 0xD5], ["ヨ", 0xD6],
    ["ラ", 0xD7], ["リ", 0xD8], ["ル", 0xD9], ["レ", 0xDA], ["ロ", 0xDB], ["ワ", 0xDC], ["ン", 0xDD], ["゛", 0xDE], ["゜", 0xDF],

    ["ｦ", 0xA6], ["ｧ", 0xA7], ["ｨ", 0xA8], ["ｩ", 0xA9], ["ｪ", 0xAA], ["ｫ", 0xAB], ["ｬ", 0xAC], ["ｭ", 0xAD], ["ｮ", 0xAE], ["ｯ", 0xAF],
    ["ｱ", 0xB1], ["ｲ", 0xB2], ["ｳ", 0xB3], ["ｴ", 0xB4], ["ｫ", 0xB5], ["ｶ", 0xB6], ["ｷ", 0xB7], ["ｸ", 0xB8], ["ｹ", 0xB9], ["ｺ", 0xBA],
    ["ｻ", 0xBB], ["ｼ", 0xBC], ["ｽ", 0xBD], ["ｾ", 0xBE], ["ｿ", 0xBF], ["ﾀ", 0xC0], ["ﾁ", 0xC1], ["ﾂ", 0xC2], ["ﾃ", 0xC3], ["ﾄ", 0xC4],
    ["ﾅ", 0xC5], ["ﾆ", 0xC6], ["ﾇ", 0xC7], ["ﾈ", 0xC8], ["ﾉ", 0xC9], ["ﾊ", 0xCA], ["ﾋ", 0xCB], ["ﾌ", 0xCC], ["ﾍ", 0xCD], ["ﾎ", 0xCE],
    ["ﾏ", 0xCF], ["ﾐ", 0xD0], ["ﾑ", 0xD1], ["ﾒ", 0xD2], ["ﾓ", 0xD3], ["ﾔ", 0xD4], ["ﾕ", 0xD5], ["ﾖ", 0xD6],
    ["ﾗ", 0xD7], ["ﾘ", 0xD8], ["ﾙ", 0xD9], ["ﾚ", 0xDA], ["ﾛ", 0xDB], ["ﾜ", 0xDC], ["ﾝ", 0xDD]
]);
