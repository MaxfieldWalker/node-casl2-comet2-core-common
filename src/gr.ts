"use strict";

export enum GR {
    GR0,
    GR1,
    GR2,
    GR3,
    GR4,
    GR5,
    GR6,
    GR7,
    GR8_SP
}

export function stringToGR(s: string): GR {
    switch (s) {
        case "GR0": return GR.GR0;
        case "GR1": return GR.GR1;
        case "GR2": return GR.GR2;
        case "GR3": return GR.GR3;
        case "GR4": return GR.GR4;
        case "GR5": return GR.GR5;
        case "GR6": return GR.GR6;
        case "GR7": return GR.GR7;
        case "GR8": return GR.GR8_SP;
        default: throw new Error();
    }
}

export function grToString(gr: GR): string {
    switch (gr) {
        case GR.GR0: return "GR0";
        case GR.GR1: return "GR1";
        case GR.GR2: return "GR2";
        case GR.GR3: return "GR3";
        case GR.GR4: return "GR4";
        case GR.GR5: return "GR5";
        case GR.GR6: return "GR6";
        case GR.GR7: return "GR7";
        case GR.GR8_SP: return "GR8";
        default: throw new Error();
    }
}

export enum GRType {
    None = 0x00,
    UsedAsIndexRegister = 0x01,
    UsedAsSP = 0x02,
}

export interface GRInfo {
    code: GR;
    name: string;
    type: GRType;
    documentation: string;
}

function createDocumentation(type: GRType): string {
    let s = "汎用レジスタ。"
    if (type & GRType.UsedAsIndexRegister) {
        s += "指標レジスタとして使用できます。";
    } else {
        s += "指標レジスタとして使用できません。";
    }
    if (type & GRType.UsedAsSP) {
        s += "SPとして使用できます。";
    }

    return s;
}

function createGRInfo(gr: GR, type: GRType): GRInfo {
    return {
        code: gr,
        name: grToString(gr),
        type: type,
        documentation: createDocumentation(type)
    };
}

export const grsInfo: Array<GRInfo> = [
    createGRInfo(GR.GR0, GRType.None),
    createGRInfo(GR.GR1, GRType.UsedAsIndexRegister),
    createGRInfo(GR.GR2, GRType.UsedAsIndexRegister),
    createGRInfo(GR.GR3, GRType.UsedAsIndexRegister),
    createGRInfo(GR.GR4, GRType.UsedAsIndexRegister),
    createGRInfo(GR.GR5, GRType.UsedAsIndexRegister),
    createGRInfo(GR.GR6, GRType.UsedAsIndexRegister),
    createGRInfo(GR.GR7, GRType.UsedAsIndexRegister),
    createGRInfo(GR.GR8_SP, GRType.UsedAsIndexRegister | GRType.UsedAsSP)
];
