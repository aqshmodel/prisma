'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface PdfExportButtonProps {
  targetId: string;
  filename: string;
}

export function PdfExportButton({ targetId, filename }: PdfExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    const element = document.getElementById(targetId);
    if (!element) {
      alert('書き出し対象が見つかりません');
      return;
    }

    try {
      setIsExporting(true);

      // ファイル名をtitleに一時設定（ブラウザの「PDFに保存」時のデフォルトファイル名になる）
      const originalTitle = document.title;
      document.title = filename;

      // 印刷対象以外を非表示にするためのクラスを付与
      document.body.classList.add('pdf-print-mode');
      element.classList.add('pdf-print-target');

      // ブラウザのネイティブ印刷ダイアログを起動
      window.print();

      // クリーンアップ
      document.body.classList.remove('pdf-print-mode');
      element.classList.remove('pdf-print-target');
      document.title = originalTitle;
    } catch (error) {
      console.error('PDF Export Error:', error);
      alert('PDFの生成中にエラーが発生しました。');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-70 shadow-sm"
    >
      {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      {isExporting ? '準備中...' : 'レポートをPDF保存'}
    </button>
  );
}
