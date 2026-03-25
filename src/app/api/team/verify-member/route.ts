import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';

/**
 * チームトークンの検証API
 * 
 * 課金済みのチームオーダーに含まれるメンバーかどうかを検証する。
 * 成功時: 200 { valid: true }
 * 失敗時: 403 { valid: false }
 */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const os = searchParams.get('os');
    const engine = searchParams.get('engine');

    if (!token || !os || !engine) {
        return NextResponse.json({ valid: false, error: 'Missing parameters' }, { status: 400 });
    }

    try {
        // Firestoreでトークンに一致するpaid状態のオーダーを検索
        const snapshot = await dbAdmin
            .collection('team_orders')
            .where('resultToken', '==', token)
            .where('status', '==', 'paid')
            .limit(1)
            .get();

        if (snapshot.empty) {
            return NextResponse.json({ valid: false, error: 'Invalid or unpaid token' }, { status: 403 });
        }

        const orderData = snapshot.docs[0].data();
        const members = orderData.members || [];

        // エニアグラムのTプレフィックスを除去して比較
        const engineNumber = engine.replace(/^T/, '');

        // メンバーリスト内に該当するtypeCode + enneagramの組み合わせが存在するか確認
        const memberExists = members.some((m: { typeCode: string; enneagram?: string }) => 
            m.typeCode === os && String(m.enneagram) === engineNumber
        );

        if (!memberExists) {
            return NextResponse.json({ valid: false, error: 'Member not found in team' }, { status: 403 });
        }

        return NextResponse.json({ valid: true });
    } catch (error) {
        console.error('Team verify-member error:', error);
        return NextResponse.json({ valid: false, error: 'Internal error' }, { status: 500 });
    }
}
