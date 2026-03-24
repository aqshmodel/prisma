import { NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { GoogleGenAI } from '@google/genai';
import type { TeamMember } from '@/features/team/utils/pairs';

// @google/genai は環境変数 GEMINI_API_KEY を自動参照します
const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { token, forceRegen } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // Firestoreから該当のオーダーを取得
    const snapshot = await dbAdmin.collection('team_analysis_orders')
      .where('resultToken', '==', token)
      .where('status', '==', 'paid')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ error: 'Order not found or not paid' }, { status: 404 });
    }

    const orderDoc = snapshot.docs[0];
    const orderData = orderDoc.data();

    // 既に生成済みの場合はキャッシュを返す（forceRegenでない限り）
    if (orderData.aiAnalysisResult && !forceRegen) {
      return NextResponse.json({ result: orderData.aiAnalysisResult });
    }

    const members: TeamMember[] = orderData.members || [];
    const leadInfo = orderData.leadInfo || {};

    if (members.length === 0) {
      return NextResponse.json({ error: 'No members found' }, { status: 400 });
    }

    // メンバーリストの文字列化
    const memberListStr = members.map((m, i) => 
      `${i + 1}. ${m.name} — 16タイプ: ${m.typeCode}${m.enneagram ? ` / エニアグラム: タイプ${m.enneagram}` : ''}`
    ).join('\n');

    // ===== human-like-writing スキル準拠のプロンプト =====
    const systemPrompt = `
あなたは組織開発の経験が24年ある日本人コンサルタントで、今まさにクライアント企業の経営チームの布陣を見て、率直な所見を書いているところです。
レポートではなく、経営者に宛てた「手紙」のような文体で書いてください。

【絶対に守ること — "AI臭さ"の排除】
- 「**太字**」は使わない。強調は文脈と言葉選びで行う。
- 箇条書き（- や 1. 2. 3.）は最小限。使うとしてもデータ列挙の箇所だけ。
- 「～という点が挙げられます」「～が重要です」「～と言えるでしょう」のような教科書的な語尾は厳禁。
- 「最適化」「最大化」「本質」「シナジー」「コンパス」「ブループリント」「諸刃の剣」「DNA」のようなAI常套句は一切使うな。
- 「まず」「次に」「最後に」「以上のように」のような構造を説明するメタ言語は削除。いきなり本題に入れ。
- 「一般的に言えば」「一概には言えませんが」のような安全クッションも不要。自分の見解として断言しろ。
- 結論で全体をまとめ直すな。言いたいことを書き切ったら、そこで止めろ。
- オーケストラ、コンパス、羅針盤、設計図などの比喩は禁止。もし比喩を使うなら、日常の具体的な場面から取れ。

【文体のルール】
- 短い文と長い文を意図的にミックスする。一文が同じ長さにならないように。
- 「です・ます」だけでなく、「だ」「である」「だろう」も混ぜて、リズムに緩急をつける。
- 具体的なエピソードや「こういう場面で、こうなるだろう」という予測シーンを挟む。
- 専門用語（双対関係、衝突関係など）は出してよいが、括弧内に噛み砕いた説明を添える。
- 人間の書き手が持つ「個人的な確信」の温度感を出す。「私の経験では」「正直なところ」などの一人称表現を自然に入れる。
- 読んだ経営者が「この人、うちのチームを本当に見てくれたな」と思える質感を目指す。

【構成の自由度】
- 見出しは ### で2〜4個程度。見出しの文言もテンプレ的でなく、そのチーム固有の特徴を反映させた言葉にする。
- 全体で1500〜2500文字。
`;

    const prompt = `
以下のチーム構成を見て、率直な所見を書いてください。

企業名: ${leadInfo.companyName || '（未記入）'}
人数: ${members.length}名

${memberListStr}

このメンバー構成を見たとき、最初に何が目に留まりますか？ どんな化学反応が起きそうですか？ 経営者に対して、何を最も伝えたいですか？
`;

    // Gemini API コール
    const modelName = process.env.GEMINI_MODEL || 'gemini-3.1-pro-preview';
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.85,
      }
    });

    const analysisText = response.text;

    if (!analysisText) {
      throw new Error('Failed to generate content from Gemini API');
    }

    // Firestoreに保存（再生成時は上書き）
    await orderDoc.ref.update({
      aiAnalysisResult: analysisText,
      aiAnalysisGeneratedAt: new Date().toISOString()
    });

    return NextResponse.json({ result: analysisText });

  } catch (error) {
    console.error('AI Analysis API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
