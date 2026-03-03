import re
import os
import glob

fixes = {
    # 記事ごとの修正マッピング
    "intp-stress-from-unreasonable-boss": {
        "headings": {
            "なぜ「納得できない」ことがこれほど苦痛なのか": "納得できない苦痛",
            "発想と多様性のNeを潰される苦痛": "Neを潰される苦痛",
            "感情論の海をサバイブする護身術": "感情論サバイバル術",
            "「感情」を1つの「変数」として扱う": "感情を変数で扱う",
            "「自分の脳内」という最強の逃げ場": "脳内という逃げ場"
        },
        "desc_append": " INTPのTi（内向思考）のメカニズムと、相手の感情を「一つの変数」として客観的に処理するロジカルな防衛術を解説。感情論の海で溺れないための戦略です。"
    },
    "isfp-loss-of-passion-at-work": {
        "headings": {
            "なぜ「やりがい」が分からないのか": "やりがい喪失の理由",
            "「私らしさ」の全否定（Fi）": "私らしさの否定(Fi)",
            "「今、ここ」の幸福の欠如（Se）": "今ここでの幸福(Se)",
            "「やりがい迷子」から抜け出す生存戦略": "やりがい迷子の脱出",
            "「自由」と「人間関係」を最優先にする": "自由と関係を最優先",
            "「仕事＝人生のすべて」という呪縛を解く": "仕事＝人生を解く"
        },
        "desc_append": " 自らの感性を殺される無機質な環境への違和感（Fi）や今この瞬間の充実（Se）の欠落を分析し、手触りのある仕事を見つけるための生存戦略を解説します。"
    },
    "human-strengths-in-ai-era-by-type": {
        "headings": {
            "現場の「違鮮感」を嗅ぎ取る力": "違和感を嗅ぎ取る力",
            "現場の「違和感」を嗅ぎ取る力": "違和感を嗅ぎ取る力",
            "手触りのある実行力（身体性）": "実行力という身体性",
            "焦る前に、自分の戦い方を知る": "自分の戦い方を知る"
        },
        "desc_append": " 思考だけでは生き残れないAI時代。直感（N）や感覚（S）といった人間の根本的な知覚プロセスを基盤に、自分だけの価値と戦い方を見つけるためのガイドです。"
    },
    "entp-boredom-in-relationships": {
        "headings": {
            "なぜ手に入れた途端に飽きるのか": "途端に飽きる理由",
            "「まだ見ぬ可能性」への渇望（Ne）": "まだ見ぬ可能性(Ne)",
            "感情より「知的スパーリング」を求める（Ti）": "知的刺激を求める(Ti)", # 13
            "退屈の海で溺れないための生存戦略": "退屈で溺れない戦略",
            "「予測不能な相手」を意図的に選ぶ": "予測不能な相手を選ぶ",
            "「安定」を恋愛以外に外部化する": "安定は外部化する"
        },
        "desc_append": " 外向直感（Ne）が求める「まだ見ぬ可能性」と、内向思考（Ti）が求める知的スパーリングの欠如という観点から、長続きする関係性の作り方を解説します。"
    },
    "infp-new-assignment-anxiety": {
        "headings": {},
        "desc_append": " 内向感情（Fi）が強烈に反発する組織の論理と、どう折り合いをつけていくのか。逃げるべき環境と残るべき環境の見極め方、そして自分を守る方法を解説します。"
    },
    "intj-desire-for-independence": {
        "headings": {
            "なぜ組織がそこまで苦痛なのか": "組織が苦痛な理由",
            "極限の「論理と効率」の追求（Te）": "論理と効率の追求(Te)",
            "究極の「独立志向」とビジョン（Ni）": "独立志向とビジョン",
            "INTJの「独り立ち」キャリア戦略": "独り立ちキャリア戦略",
            "「独立」を前提に会社を使い倒す": "会社を使い倒す戦略",
            "「裁量100%」の職種・環境へ逃げる": "裁量100%の環境へ",
            "サイドプロジェクト（副業）の完全自動化": "副業の完全自動化"
        },
        "desc_append": " 外向思考（Te）と内向直感（Ni）の観点から、無能な組織システムの欠陥を分析。感情論を排除し、会社を使い倒しながら最速で独立を果たすためのロードマップ。"
    },
    "intronverts-need-for-alone-time": {
        "headings": {
            "なぜ「誰かといる」だけで疲弊するのか": "誰かといるだけで疲弊",
            "「思考の最適化」に莫大なリソースを食う（Ti・Te）": "思考の最適化(Ti/Te)",
            "「内なる世界」への退避（Ni・Ne）": "内なる世界への退避",
            "「一人の時間」を侵害させない防衛戦略": "時間を守る防衛戦略",
            "「一人時間」を最強の「先約」としてブロックする": "一人時間を先約にする",
            "「つながりっぱなし」の通信ケーブルを引き抜く": "通信ケーブルを抜く",
            "理解されないことを「受け入れる」": "未理解を受け入れる"
        },
        "desc_append": " 複雑な情報処理（Ti/Te）と内的探求（Ni/Ne）のために必須となる「充電」のメカニズムを解説。人間関係のノイズを遮断し、自分を守り抜く防衛戦略です。"
    },
    "estj-loneliness-of-competence": {
        "headings": {
            "あなたが「冷酷な独裁者」に見える理由": "冷酷に見える理由",
            "「絶対的な正しさ」への執着（Te）": "正しさへの執着(Te)",
            "「ルールと前例」の過信（Si）": "前例への過信(Si)",
            "「正論の罠」から抜け出すための処方箋": "正論の罠の処方箋",
            "感情を「重要な変数」として組み込む": "感情を変数に組み込む",
            "「正論以外」の余白を許容する": "正論以外の余白"
        },
        "desc_append": " 外向思考（Te）による圧倒的な実行力と、内向感覚（Si）の規律が引き起こす「ロジハラ」のメカニズム。他者の感情という変数を組み込む引き算のマネジメント。"
    },
    "infj-empathy-fatigue-protection": {
        "headings": {
            "なぜ「他人の感情」に殺されそうになるのか": "感情に殺される理由",
            "「感情のスポンジ」としてのFe": "感情のスポンジ(Fe)",
            "「最悪のシミュレーション」を回し続けるNi": "悲劇の予測(Ni)",
            "「誰の課題か？」を呪文のように唱える": "課題分離の呪文",
            "トイレという名の「強制シャットダウン・ルーム」": "強制シャットダウン"
        },
        "desc_append": " 外向感情（Fe）が他人の感情をスポンジのように吸収し、内向直感（Ni）が悲劇を予測する構造。優しすぎる魂を守るための、透明で強固な「境界線」の引き方。"
    },
    "isfj-burnout-after-holidays": {
        "headings": {
            "過剰適応の限界（Fe/Si）": "過剰適応の限界"
        },
        "desc_append": " 外向感情（Fe）と内向感覚（Si）が引き起こす「断れない」連鎖と、連休明けに一気に訪れる虚無感。自己犠牲のパターンから抜け出し、本来の自分を取り戻す方法。"
    }
}

files = glob.glob("content/articles/*.mdx")

for filepath in files:
    basename = os.path.basename(filepath).replace('.mdx', '')
    if basename in fixes:
        fix_data = fixes[basename]
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # 1. headings
        for old_h, new_h in fix_data["headings"].items():
            content = content.replace(f"## {old_h}", f"## {new_h}")
            content = content.replace(f"### {old_h}", f"### {new_h}")
            
        # 2. desc append
        def append_desc(match):
            original_desc = match.group(1)
            # 既に追記済みでなければ追記
            if fix_data["desc_append"].strip() not in original_desc:
                new_desc = original_desc + fix_data["desc_append"]
                return f"description: '{new_desc}'"
            return match.group(0)
            
        content = re.sub(r"description:\s*'(.*?)'", append_desc, content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
print("Fixes applied.")
