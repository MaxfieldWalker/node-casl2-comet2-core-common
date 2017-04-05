"use strict";

export enum ArgumentType {
    none = 0,
    label_START = 1,
    decimal_DS = 2,
    constants_DC = 3,

    adr_r2 = 10,
    r = 11,
    adr_adr = 12,

    r1_r2 = 20,
    r1_adr_r2 = 21,
    // r1_r2 + r1_adr_r2
    r1_r2_OR_r1_adr_r2 = 41,

    Unknown = 100
}

export enum InstructionType {
    Assembler = 0,
    Machine = 1,
    Macro = 2,

    Unknown = 3
}

export interface InstructionInfo {
    readonly instructionName: string;
    readonly argumentType: ArgumentType;
    readonly code: number;
    readonly type: InstructionType;
    readonly documentation: string;
}

function createInstructionInfo(inst: string, type: ArgumentType, code: number) {
    return { instructionName: inst, argumentType: type, code: code };
}

export const instructionsInfo: Array<InstructionInfo> = [
    // アセンブラ命令
    { instructionName: "START", argumentType: ArgumentType.label_START, code: -1, type: InstructionType.Assembler, documentation: "プログラムの先頭を定義 プログラムの実行開始番地を定義 他のプログラムで参照する入口名を定義" },
    { instructionName: "END", argumentType: ArgumentType.none, code: -1, type: InstructionType.Assembler, documentation: "プログラムの終わりを明示" },
    { instructionName: "DS", argumentType: ArgumentType.decimal_DS, code: -1, type: InstructionType.Assembler, documentation: "領域を確保" },
    { instructionName: "DC", argumentType: ArgumentType.constants_DC, code: -1, type: InstructionType.Assembler, documentation: "定数を定義" },

    // 機械語命令
    { instructionName: "NOP", argumentType: ArgumentType.none, code: 0x00, type: InstructionType.Machine, documentation: "ノーオペレーション", },
    { instructionName: "LD", argumentType: ArgumentType.r1_adr_r2, code: 0x10, type: InstructionType.Machine, documentation: "ロード", },
    { instructionName: "LD", argumentType: ArgumentType.r1_r2, code: 0x14, type: InstructionType.Machine, documentation: "ロード", },
    { instructionName: "ST", argumentType: ArgumentType.r1_adr_r2, code: 0x11, type: InstructionType.Machine, documentation: "ストア", },
    { instructionName: "LAD", argumentType: ArgumentType.r1_adr_r2, code: 0x12, type: InstructionType.Machine, documentation: "ロードアドレス", },
    { instructionName: "ADDA", argumentType: ArgumentType.r1_adr_r2, code: 0x20, type: InstructionType.Machine, documentation: "算術加算", },
    { instructionName: "ADDA", argumentType: ArgumentType.r1_r2, code: 0x24, type: InstructionType.Machine, documentation: "算術加算", },
    { instructionName: "ADDL", argumentType: ArgumentType.r1_adr_r2, code: 0x22, type: InstructionType.Machine, documentation: "論理加算", },
    { instructionName: "ADDL", argumentType: ArgumentType.r1_r2, code: 0x26, type: InstructionType.Machine, documentation: "論理加算", },
    { instructionName: "SUBA", argumentType: ArgumentType.r1_adr_r2, code: 0x21, type: InstructionType.Machine, documentation: "算術減算", },
    { instructionName: "SUBA", argumentType: ArgumentType.r1_r2, code: 0x25, type: InstructionType.Machine, documentation: "算術減算" },
    { instructionName: "SUBL", argumentType: ArgumentType.r1_adr_r2, code: 0x23, type: InstructionType.Machine, documentation: "論理減算" },
    { instructionName: "SUBL", argumentType: ArgumentType.r1_r2, code: 0x27, type: InstructionType.Machine, documentation: "論理減算" },
    { instructionName: "AND", argumentType: ArgumentType.r1_adr_r2, code: 0x30, type: InstructionType.Machine, documentation: "論理積" },
    { instructionName: "AND", argumentType: ArgumentType.r1_r2, code: 0x34, type: InstructionType.Machine, documentation: "論理積" },
    { instructionName: "OR", argumentType: ArgumentType.r1_adr_r2, code: 0x31, type: InstructionType.Machine, documentation: "論理和" },
    { instructionName: "OR", argumentType: ArgumentType.r1_r2, code: 0x35, type: InstructionType.Machine, documentation: "論理和" },
    { instructionName: "XOR", argumentType: ArgumentType.r1_adr_r2, code: 0x32, type: InstructionType.Machine, documentation: "排他的論理和" },
    { instructionName: "XOR", argumentType: ArgumentType.r1_r2, code: 0x36, type: InstructionType.Machine, documentation: "排他的論理和" },
    { instructionName: "CPA", argumentType: ArgumentType.r1_adr_r2, code: 0x40, type: InstructionType.Machine, documentation: "算術比較" },
    { instructionName: "CPA", argumentType: ArgumentType.r1_r2, code: 0x44, type: InstructionType.Machine, documentation: "算術比較" },
    { instructionName: "CPL", argumentType: ArgumentType.r1_adr_r2, code: 0x41, type: InstructionType.Machine, documentation: "論理比較" },
    { instructionName: "CPL", argumentType: ArgumentType.r1_r2, code: 0x45, type: InstructionType.Machine, documentation: "論理比較" },
    { instructionName: "SRA", argumentType: ArgumentType.r1_adr_r2, code: 0x51, type: InstructionType.Machine, documentation: "算術右シフト" },
    { instructionName: "SLA", argumentType: ArgumentType.r1_adr_r2, code: 0x50, type: InstructionType.Machine, documentation: "算術左シフト" },
    { instructionName: "SLL", argumentType: ArgumentType.r1_adr_r2, code: 0x52, type: InstructionType.Machine, documentation: "論理左シフト" },
    { instructionName: "SRL", argumentType: ArgumentType.r1_adr_r2, code: 0x53, type: InstructionType.Machine, documentation: "論理右シフト" },
    { instructionName: "JMI", argumentType: ArgumentType.adr_r2, code: 0x61, type: InstructionType.Machine, documentation: "負分岐" },
    { instructionName: "JNZ", argumentType: ArgumentType.adr_r2, code: 0x62, type: InstructionType.Machine, documentation: "非零分岐" },
    { instructionName: "JZE", argumentType: ArgumentType.adr_r2, code: 0x63, type: InstructionType.Machine, documentation: "零分岐" },
    { instructionName: "JUMP", argumentType: ArgumentType.adr_r2, code: 0x64, type: InstructionType.Machine, documentation: "無条件分岐" },
    { instructionName: "JPL", argumentType: ArgumentType.adr_r2, code: 0x65, type: InstructionType.Machine, documentation: "正分岐" },
    { instructionName: "JOV", argumentType: ArgumentType.adr_r2, code: 0x66, type: InstructionType.Machine, documentation: "オーバーフロー分岐" },
    { instructionName: "PUSH", argumentType: ArgumentType.adr_r2, code: 0x70, type: InstructionType.Machine, documentation: "プッシュ" },
    { instructionName: "POP", argumentType: ArgumentType.r, code: 0x71, type: InstructionType.Machine, documentation: "ポップ" },
    { instructionName: "CALL", argumentType: ArgumentType.adr_r2, code: 0x80, type: InstructionType.Machine, documentation: "コール" },
    { instructionName: "RET", argumentType: ArgumentType.none, code: 0x81, type: InstructionType.Machine, documentation: "リターン" },
    { instructionName: "SVC", argumentType: ArgumentType.adr_r2, code: 0xF0, type: InstructionType.Machine, documentation: "スーパーバイザコール" },

    // マクロ命令
    { instructionName: "IN", argumentType: ArgumentType.adr_adr, code: 0x90, type: InstructionType.Macro, documentation: "入力装置から文字データを入力" },
    { instructionName: "OUT", argumentType: ArgumentType.adr_adr, code: 0x91, type: InstructionType.Macro, documentation: "出力装置へ文字データを出力" },
    { instructionName: "RPUSH", argumentType: ArgumentType.none, code: 0xA0, type: InstructionType.Macro, documentation: "GRの内容をスタックに格納" },
    { instructionName: "RPOP", argumentType: ArgumentType.none, code: 0xA1, type: InstructionType.Macro, documentation: "スタックの内容をGRに格納" },
];
