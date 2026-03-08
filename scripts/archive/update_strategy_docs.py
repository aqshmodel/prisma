import re

# 1. 記事テーマサマリ.md の更新
with open("documents/プロジェクト戦略/記事テーマサマリ.md", "r", encoding="utf-8") as f:
    text = f.read()

text = re.sub(r'✅ 執筆済み（全59記事）', '✅ 執筆済み（全69記事）', text)

# テーブルへの追加
table_row_old = r'\| micro-saving-fatigue-by-personality-type \| micro-saving-fatigue-by-personality-type \| ポイ活疲れ×性格タイプ \|.*?\n'
new_rows = """| micro-saving-fatigue-by-personality-type | micro-saving-fatigue-by-personality-type | ポイ活疲れ×性格タイプ |
| infp-new-assignment-anxiety | infp-new-assignment-anxiety | INFp×配属ガチャ |
| isfj-burnout-after-holidays | isfj-burnout-after-holidays | ISFj×5月病 |
| human-strengths-in-ai-era-by-type | human-strengths-in-ai-era-by-type | AI時代の強み×性格タイプ |
| intj-desire-for-independence | intj-desire-for-independence | INTj×独立志向 |
| intp-stress-from-unreasonable-boss | intp-stress-from-unreasonable-boss | INTp×理不尽な上司 |
| estj-loneliness-of-competence | estj-loneliness-of-competence | ESTj×優秀ゆえの孤独 |
| entp-boredom-in-relationships | entp-boredom-in-relationships | ENTp×恋愛蛙化現象 |
| isfp-loss-of-passion-at-work | isfp-loss-of-passion-at-work | ISFp×やりがい迷子 |
| infj-empathy-fatigue-protection | infj-empathy-fatigue-protection | INFj×共感疲労 |
| intronverts-need-for-alone-time | intronverts-need-for-alone-time | 内向型×一人の時間 |
"""
text = re.sub(table_row_old, new_rows, text)

# 記事詳細の追加
article_old = r'(## 59\..*?重要性を説く。)'
new_articles = r"""\1

## 60. INFp × 配属ガチャ（時事・ロングテール特化）
**タイトル：配属ガチャで絶望したINFPへ──「この会社、絶対ムリ」から抜け出す生存戦略**
* **ファイル名:** `infp-new-assignment-anxiety.mdx`
* **テーマ概要:** 新社会人の配属直後の不安に寄り添い、INFPの理想と現実のギャップ（Fi-Ne）を分析。今すぐ辞めるべきかどうかの見極め方と、心をすり減らさずに適応するステップを解説。

## 61. ISFj × 5月病・バーンアウト（時事・ロングテール特化）
**タイトル：連休明け、なぜか涙が出るISFJへ──「いい人」をやめて5月病から抜け出す処方箋**
* **ファイル名:** `isfj-burnout-after-holidays.mdx`
* **テーマ概要:** 5月の連休明けに一気に訪れる虚無感とバーンアウト。ISFJの過剰適応（Fe-Si）による「断れない連鎖」を紐解き、自己犠牲から抜け出して本来の自分を取り戻す方法を提案。

## 62. 全タイプ × AI時代の強み（トレンド・ロングテール特化）
**タイトル：仕事を奪われる不安──AI時代にこそ光る「性格タイプ別」の強み**
* **ファイル名:** `human-strengths-in-ai-era-by-type.mdx`
* **テーマ概要:** AI台頭による漠然としたキャリア不安に対し、各性格タイプの認知プロセスの違いから、AIには代替できない人間独自の強み（直感、共感、手触り感のある実行力など）の見つけ方を解説。

## 63. INTj × 独立志向（ロングテール特化）
**タイトル：組織の論理に殺される前に──INTJが最速で「独り立ち」するためのキャリア戦略**
* **ファイル名:** `intj-desire-for-independence.mdx`
* **テーマ概要:** 組織の非効率や忖度に苦しむINTJに向け、Te-Niの特性を活かした独立キャリアのロードマップを提示。会社を使い倒しながら戦略的にフリーランスや起業を目指すアプローチ。

## 64. INTp × 理不尽な上司（ロングテール特化）
**タイトル：感情論でキレる上司が理解不能──INTPが職場で正気を保つための防衛術**
* **ファイル名:** `intp-stress-from-unreasonable-boss.mdx`
* **テーマ概要:** 論理破綻した指示や感情的な上司に辟易するINTPへ。相手の感情を「1つの変数」としてシステマティックに処理するTi的な防衛術と、エネルギーを温存する働き方を解説。

## 65. ESTj × 優秀ゆえの孤独（ロングテール特化）
**タイトル：なぜ自分ばかりが尻拭いを？──「仕事ができるESTJ」が抱える孤独と処方箋**
* **ファイル名:** `estj-loneliness-of-competence.mdx`
* **テーマ概要:** 責任感が強く成果を出すESTJが陥りがちな「部下がついてこない」「冷酷に見られる」孤独感。Te-Siの暴走を抑え、他者の感情を組み込む引き算のマネジメントを提案。

## 66. ENTp × 恋愛で飽きやすい・蛙化現象（ロングテール特化）
**タイトル：「好き」があっという間に醒める──ENTPの恋愛が長続きしない本当の理由**
* **ファイル名:** `entp-boredom-in-relationships.mdx`
* **テーマ概要:** 手に入れた瞬間に退屈してしまうENTPの蛙化現象を分析。Neの「まだ見ぬ可能性」への渇望とTiの「知的スパーリング」の欲求から、本当に必要としているパートナー像や関係性を解説。

## 67. ISFp × やりがい迷子（ロングテール特化）
**タイトル：「やりがい」って何ですか？──ISFPが転職を繰り返す本当の理由**
* **ファイル名:** `isfp-loss-of-passion-at-work.mdx`
* **テーマ概要:** 「この仕事、なんか違う」と違和感を抱えやすいISFPへ。Fiの個人的価値観とSeの手触り感の欠如がもたらす「やりがい迷子」の構造を解明し、等身大の働き方を見つける生存戦略。

## 68. INFj × 共感疲労（ロングテール特化）
**タイトル：他人の感情に殺されそうになるINFJへ──「優しすぎる魂」を守る境界線の引き方**
* **ファイル名:** `infj-empathy-fatigue-protection.mdx`
* **テーマ概要:** 職場で他者の負の感情をスポンジのように吸い取ってしまうINFJ（共感疲労）に向け、Fe-Niの暴走を食い止める「課題の分離」と、物理的・心理的な境界線の引き方を解説。

## 69. 内向型(INTx等) × 一人の時間が必要（ロングテール特化）
**タイトル：誰かといるだけで削られる──「一人の時間」がないと生きていけない内向型の生存戦略**
* **ファイル名:** `intronverts-need-for-alone-time.mdx`
* **テーマ概要:** 人間関係のノイズに疲弊し、強力な「充電時間（ソロ活）」を必要とする内向型へ。罪悪感を持たずに物理的に時間を確保し、つながりっぱなしの現代社会から自分を守る方法。"""

text = re.sub(article_old, new_articles, text, flags=re.DOTALL)

# クラスターの追加
text = text.replace("#57 診断機迷子**, **#58 ソロ活※** |", "#57 診断機迷子**, **#58 ソロ活※**, **#66 ENTP蛙化現象**, **#68 INFJ共感疲労**, **#69 内向型一人の時間** |")
text = text.replace("#54 ストレスチェック死角**, **#55 タイパ疲れ※**, **#59 ポイ活疲れ** |", "#54 ストレスチェック死角**, **#55 タイパ疲れ※**, **#59 ポイ活疲れ**, **#61 ISFJ5月病** |")
text = text.replace("#55 タイパ疲れ※**, **#56 ゆるブラック企業**, **#58 ソロ活※** |", "#55 タイパ疲れ※**, **#56 ゆるブラック企業**, **#58 ソロ活※**, **#60 INFP配属ガチャ**, **#62 AI時代強み**, **#63 INTJ独立志向**, **#64 INTP理不尽上司**, **#65 ESTJ優秀孤独**, **#67 ISFPやりがい迷子** |")

with open("documents/プロジェクト戦略/記事テーマサマリ.md", "w", encoding="utf-8") as f:
    f.write(text)


# 2. ロングテールキーワード.md の更新
with open("documents/プロジェクト戦略/ロングテールキーワード.md", "r", encoding="utf-8") as f:
    text2 = f.read()

text2 = re.sub(r'(`INTp 上司 理不尽 ストレス`)', r'\1 ✅ 執筆済み（#64 intp-stress-from-unreasonable-boss）', text2)
text2 = re.sub(r'(`ISFp 仕事 やりがい ない 原因`)', r'\1 ✅ 執筆済み（#67 isfp-loss-of-passion-at-work）', text2)
text2 = re.sub(r'(`INTj 独り立ち したい 転職`)', r'\1 ✅ 執筆済み（#63 intj-desire-for-independence）', text2)
text2 = re.sub(r'(`ENTp 恋愛 飽きやすい 対処法`)', r'\1 ✅ 執筆済み（#66 entp-boredom-in-relationships）', text2)
text2 = re.sub(r'(`INFj 共感疲労 対処法`)', r'\1 ✅ 執筆済み（#68 infj-empathy-fatigue-protection）', text2)
text2 = re.sub(r'(`INTp 一人の時間 必要 ストレス`)', r'\1 ✅ 執筆済み（#69 intronverts-need-for-alone-time）', text2)

text2 = text2.replace("| キャリア・仕事 | 20 | 8 | 12 |", "| キャリア・仕事 | 20 | 11 | 9 |")
text2 = text2.replace("| 恋愛・パートナーシップ | 13 | 4 | 9 |", "| 恋愛・パートナーシップ | 13 | 5 | 8 |")
text2 = text2.replace("| 人間関係・メンタルヘルス | 12 | 4 | 8 |", "| 人間関係・メンタルヘルス | 12 | 6 | 6 |")
text2 = text2.replace("| **合計** | **61** | **20** | **41** |", "| **合計** | **61** | **26** | **35** |")

with open("documents/プロジェクト戦略/ロングテールキーワード.md", "w", encoding="utf-8") as f:
    f.write(text2)

print("Updates applied via regex.")
