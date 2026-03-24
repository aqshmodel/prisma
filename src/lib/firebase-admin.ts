import * as admin from 'firebase-admin';

import path from 'path';
import fs from 'fs';

// .env.localのGA4用キーに依存せず、prisma-8e66aの明示的なAdmin用鍵を取得
let cert;
try {
  const keyPath = path.resolve(process.cwd(), 'google-key/prisma-8e66a-firebase-adminsdk.json');
  if (fs.existsSync(keyPath)) {
    cert = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
  }
} catch (e) {
  console.error('Failed to load prisma-8e66a-firebase-adminsdk.json:', e);
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: cert ? admin.credential.cert(cert) : admin.credential.applicationDefault(),
    });
    console.log(cert 
      ? 'Firebase Admin initialized successfully with dedicated prisma-8e66a Service Account' 
      : 'Firebase Admin initialized with Application Default Credentials (fallback)');
  } catch (error) {
    console.error('Firebase Admin initialization error', error);
  }
}

export const dbAdmin = admin.firestore();
