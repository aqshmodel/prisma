const text = `
既存の枠組みや前例に縛られることなく、物事の新しい側面を次々と発見する**アイデアの起爆剤**です。
11: 単なる思いつきではなく、「もしこの前提を変えたらどうなるか？」という**仮説検証的な思考**を常に巡らせており、停滞したプロジェクトに突破口を開く力を持ちます。
`;

// Current regex in FormattedText.tsx
const parts = text.split(/(\*\*.*?\*\*)/g);

console.log('Original Text:', text);
console.log('Parts:', parts);

parts.forEach((part, index) => {
  if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
    console.log(`Match ${index}:`, part.slice(2, -2));
  } else {
    console.log(`NoMatch ${index}:`, part);
  }
});
