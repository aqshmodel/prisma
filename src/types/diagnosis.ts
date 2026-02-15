export type AnswerValue = 'A' | 'B';

export type Answers = Record<number, AnswerValue>;

export type OSTypeCode =
    | 'ENTp' | 'ISFp' | 'ESFj' | 'INTj'
    | 'ENFj' | 'ISTj' | 'ESTp' | 'INFp'
    | 'ESFp' | 'INTp' | 'ENTj' | 'ISFj'
    | 'ESTj' | 'INFj' | 'ENFp' | 'ISTp';

export type Subtype = 'Contact' | 'Inert';

export type EngineType = 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8' | 'T9';

export type BiasType = 'Confirmation' | 'SunkCost' | 'StatusQuo' | 'Authority' | 'Availability';

export interface DiagnosisResult {
    os: {
        code: OSTypeCode;
        // name removed to avoid duplication with OS_CONTENT
        subtype: Subtype;
    };
    engine: {
        primary: EngineType;
        secondary: EngineType;
    };
    bias: {
        scores: Record<BiasType, number>; // 0-2
        alerts: BiasType[];
        totalScore: number;
    };
    matrix: {
        x: number; // 0.0 - 10.0
        y: number; // 0.0 - 10.0
    };
    validity: 'A' | 'B' | 'C';
    timestamp: string;
}

export interface Question {
    id: number;
    text: string; // Not strictly needed for logic, but good for UI
    choiceA: string;
    choiceB: string;
    category: 'OS' | 'Subtype' | 'Engine' | 'Bias';
}
