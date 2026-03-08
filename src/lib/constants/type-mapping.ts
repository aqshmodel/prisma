/**
 * ソシオニクスOSコード → 末尾小文字表記の変換マップ
 * 16タイプの表記をソシオニクス式（末尾小文字）で統一するためのマッピング。
 */
export const OS_TO_TYPE: Record<string, string> = {
    'INTp': 'INTj', 'ENTp': 'ENTp', 'INFp': 'INFj', 'ENFp': 'ENFp',
    'ISTj': 'ISTj', 'ESTj': 'ESTj', 'ISFj': 'ISFj', 'ESFj': 'ESFj',
    'INTj': 'INTp', 'ENTj': 'ENTj', 'INFj': 'INFp', 'ENFj': 'ENFj',
    'ISTp': 'ISTp', 'ESTp': 'ESTp', 'ISFp': 'ISFp', 'ESFp': 'ESFp',
};

/**
 * OSコードからソシオニクス式表記を取得する。不明な場合はコードをそのまま返す。
 */
export const toTypeLabel = (osCode: string): string => OS_TO_TYPE[osCode] || osCode;

