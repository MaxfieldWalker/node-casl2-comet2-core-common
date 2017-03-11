"use strict";

export enum ArgumentType {
    none = 0,
    other = 1,
    adr_r2 = 10,
    r = 11,
    adr_adr = 12,

    r1_r2 = 20,
    r1_adr_r2 = 21,
    // r1_r2 + r1_adr_r2
    r1_r2_OR_r1_adr_r2 = 41,
}

export enum InstructionType {
    Assembler,
    Machine,
    Macro
}

export interface InstructionInfo {
    instructionName: string;
    argumentType: ArgumentType;
    code: number;
    type: InstructionType;
}

function createInstructionInfo(inst: string, type: ArgumentType, code: number) {
    return { instructionName: inst, argumentType: type, code: code };
}

export const instructionsInfo: Array<InstructionInfo> = [
    // アセンブラ命令
    { instructionName: "START", argumentType: ArgumentType.other, code: -1, type: InstructionType.Assembler },
    { instructionName: "END", argumentType: ArgumentType.none, code: -1, type: InstructionType.Assembler },
    { instructionName: "DS", argumentType: ArgumentType.other, code: -1, type: InstructionType.Assembler },
    { instructionName: "DC", argumentType: ArgumentType.other, code: -1, type: InstructionType.Assembler },

    // 機械語命令
    { instructionName: "NOP", argumentType: ArgumentType.none, code: 0x00, type: InstructionType.Machine },
    { instructionName: "LD", argumentType: ArgumentType.r1_adr_r2, code: 0x10, type: InstructionType.Machine },
    { instructionName: "LD", argumentType: ArgumentType.r1_r2, code: 0x14, type: InstructionType.Machine },
    { instructionName: "ST", argumentType: ArgumentType.r1_adr_r2, code: 0x11, type: InstructionType.Machine },
    { instructionName: "LAD", argumentType: ArgumentType.r1_adr_r2, code: 0x12, type: InstructionType.Machine },
    { instructionName: "ADDA", argumentType: ArgumentType.r1_adr_r2, code: 0x20, type: InstructionType.Machine },
    { instructionName: "ADDA", argumentType: ArgumentType.r1_r2, code: 0x24, type: InstructionType.Machine },
    { instructionName: "ADDL", argumentType: ArgumentType.r1_adr_r2, code: 0x22, type: InstructionType.Machine },
    { instructionName: "ADDL", argumentType: ArgumentType.r1_r2, code: 0x26, type: InstructionType.Machine },
    { instructionName: "SUBA", argumentType: ArgumentType.r1_adr_r2, code: 0x21, type: InstructionType.Machine },
    { instructionName: "SUBA", argumentType: ArgumentType.r1_r2, code: 0x25, type: InstructionType.Machine },
    { instructionName: "SUBL", argumentType: ArgumentType.r1_adr_r2, code: 0x23, type: InstructionType.Machine },
    { instructionName: "SUBL", argumentType: ArgumentType.r1_r2, code: 0x27, type: InstructionType.Machine },
    { instructionName: "AND", argumentType: ArgumentType.r1_adr_r2, code: 0x30, type: InstructionType.Machine },
    { instructionName: "AND", argumentType: ArgumentType.r1_r2, code: 0x34, type: InstructionType.Machine },
    { instructionName: "OR", argumentType: ArgumentType.r1_adr_r2, code: 0x31, type: InstructionType.Machine },
    { instructionName: "OR", argumentType: ArgumentType.r1_r2, code: 0x35, type: InstructionType.Machine },
    { instructionName: "XOR", argumentType: ArgumentType.r1_adr_r2, code: 0x32, type: InstructionType.Machine },
    { instructionName: "XOR", argumentType: ArgumentType.r1_r2, code: 0x36, type: InstructionType.Machine },
    { instructionName: "CPA", argumentType: ArgumentType.r1_adr_r2, code: 0x40, type: InstructionType.Machine },
    { instructionName: "CPA", argumentType: ArgumentType.r1_r2, code: 0x44, type: InstructionType.Machine },
    { instructionName: "CPL", argumentType: ArgumentType.r1_adr_r2, code: 0x41, type: InstructionType.Machine },
    { instructionName: "CPL", argumentType: ArgumentType.r1_r2, code: 0x45, type: InstructionType.Machine },
    { instructionName: "SRA", argumentType: ArgumentType.r1_adr_r2, code: 0x51, type: InstructionType.Machine },
    { instructionName: "SLA", argumentType: ArgumentType.r1_adr_r2, code: 0x50, type: InstructionType.Machine },
    { instructionName: "SLL", argumentType: ArgumentType.r1_adr_r2, code: 0x52, type: InstructionType.Machine },
    { instructionName: "SRL", argumentType: ArgumentType.r1_adr_r2, code: 0x53, type: InstructionType.Machine },
    { instructionName: "JMI", argumentType: ArgumentType.adr_r2, code: 0x61, type: InstructionType.Machine },
    { instructionName: "JNZ", argumentType: ArgumentType.adr_r2, code: 0x62, type: InstructionType.Machine },
    { instructionName: "JZE", argumentType: ArgumentType.adr_r2, code: 0x63, type: InstructionType.Machine },
    { instructionName: "JUMP", argumentType: ArgumentType.adr_r2, code: 0x64, type: InstructionType.Machine },
    { instructionName: "JPL", argumentType: ArgumentType.adr_r2, code: 0x65, type: InstructionType.Machine },
    { instructionName: "JOV", argumentType: ArgumentType.adr_r2, code: 0x66, type: InstructionType.Machine },
    { instructionName: "PUSH", argumentType: ArgumentType.adr_r2, code: 0x70, type: InstructionType.Machine },
    { instructionName: "POP", argumentType: ArgumentType.r, code: 0x71, type: InstructionType.Machine },
    { instructionName: "CALL", argumentType: ArgumentType.adr_r2, code: 0x80, type: InstructionType.Machine },
    { instructionName: "RET", argumentType: ArgumentType.none, code: 0x81, type: InstructionType.Machine },
    { instructionName: "SVC", argumentType: ArgumentType.adr_r2, code: 0xF0, type: InstructionType.Machine },

    // マクロ命令
    { instructionName: "IN", argumentType: ArgumentType.adr_adr, code: 0x90, type: InstructionType.Macro },
    { instructionName: "OUT", argumentType: ArgumentType.adr_adr, code: 0x91, type: InstructionType.Assembler },
    { instructionName: "RPUSH", argumentType: ArgumentType.none, code: 0xA0, type: InstructionType.Assembler },
    { instructionName: "RPOP", argumentType: ArgumentType.none, code: 0xA1, type: InstructionType.Assembler },
];
