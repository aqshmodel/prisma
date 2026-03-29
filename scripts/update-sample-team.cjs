const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const keyPath = path.resolve(__dirname, '../google-key/prisma-8e66a-firebase-adminsdk.json');
let cert;
try {
  cert = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
} catch (e) {
  console.error('Could not load key file:', e.message);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(cert)
});

const db = admin.firestore();
const token = 'demo-test-token-12345';

async function main() {
  const snapshot = await db.collection('team_analysis_orders')
    .where('resultToken', '==', token)
    .limit(1)
    .get();

  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    const data = doc.data();
    if (data.leadInfo) {
      data.leadInfo.companyName = '【サンプル】株式会社Aqsh'; // もともと株式会社デモ（ダミーデータ）
      await doc.ref.update({ leadInfo: data.leadInfo });
      console.log(`Updated leadInfo.companyName successfully: ${data.leadInfo.companyName}`);
    } else {
      console.log('leadInfo not found in document.');
    }
  } else {
    console.log('Document not found by resultToken.');
  }
}

main().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
