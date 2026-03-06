/**
 * ソシオニクスOSコード → MBTI/16Personalities表記の変換マップ
 * ソシオニクスとMBTIでは J/P の意味が反転するため、単純な大文字変換ではない。
 */
export const OS_TO_MBTI: Record<string, string> = {
    'INTp': 'INTJ', 'ENTp': 'ENTP', 'INFp': 'INFJ', 'ENFp': 'ENFP',
    'ISTj': 'ISTJ', 'ESTj': 'ESTJ', 'ISFj': 'ISFJ', 'ESFj': 'ESFJ',
    'INTj': 'INTP', 'ENTj': 'ENTJ', 'INFj': 'INFP', 'ENFj': 'ENFJ',
    'ISTp': 'ISTP', 'ESTp': 'ESTP', 'ISFp': 'ISFP', 'ESFp': 'ESFP',
};

/**
 * OSコードからMBTI表記を取得する。不明な場合はコードをそのまま返す。
 */
export const toMbti = (osCode: string): string => OS_TO_MBTI[osCode] || osCode;
