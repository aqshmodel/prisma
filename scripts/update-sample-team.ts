import { dbAdmin } from '../src/lib/firebase-admin';

async function updateSampleTeam() {
  try {
    const token = 'demo-test-token-12345';
    let documentId: string | null = null;
    let currentName = '';

    // 1. shareToken で検索
    const snapshot = await dbAdmin.collection('team_analysis_orders')
      .where('shareToken', '==', token)
      .get();

    if (!snapshot.empty) {
      documentId = snapshot.docs[0].id;
      currentName = snapshot.docs[0].data().organizationName;
    } else {
      // 2. shareToken が見つからない場合は、ドキュメントIDそのものがトークンかどうか探す
      const docRef = dbAdmin.collection('team_analysis_orders').doc(token);
      const docSnap = await docRef.get();
      if (docSnap.exists) {
        documentId = docSnap.id;
        currentName = docSnap.data()?.organizationName;
      }
    }

    if (!documentId) {
      console.log(`[Error] Document with token/ID "${token}" not found in team_analysis_orders.`);
      process.exit(1);
    }

    console.log(`Found document: ${documentId}`);
    console.log(`Current organizationName: ${currentName}`);

    // 名前の更新
    const ref = dbAdmin.collection('team_analysis_orders').doc(documentId);
    await ref.update({
      organizationName: '株式会社サンプル'
    });

    console.log(`[Success] Updated organizationName to "株式会社サンプル" for ${token}`);
    process.exit(0);

  } catch (error) {
    console.error('[Error] Failed to update sample team data:', error);
    process.exit(1);
  }
}

updateSampleTeam();
