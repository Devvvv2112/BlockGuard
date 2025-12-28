# BlockGuard

Smart contract security checks for Solidity developers.

BlockGuard helps you catch common smart contract vulnerabilities early by running static analysis and explaining issues in clear, human language.

This is not a replacement for professional audits.  
It’s the first line of defense before deployment.
---
## What it does
- Analyze Solidity (`.sol`) contracts
- Detect common issues:
  - Reentrancy
  - Access control flaws
  - Unsafe external calls
  - Dead code
  - Basic gas inefficiencies
- Show:
  - Severity level
  - Affected line numbers
  - Plain-English explanations
- Maintain scan history
---
## Why it exists
Most smart contract exploits come from basic mistakes.  
BlockGuard makes those mistakes visible **before** contracts go live.
---
## Tech stack
- Nextjs
- TypeScript
- Node.js
- Docker
- Slither
- PostgreSQL
---
## Run locally
```bash
git clone https://github.com/Devvvv2112/BlockGuard.git
cd BlockGuard
docker-compose up --build

Open: http://localhost:3000
Recommended Solidity version: ^0.8.x

Disclaimer

Always get a professional audit before deploying contracts with real value.

License

MIT

Then commit it:

```bash
git add README.md
git commit -m "docs: polish README"
git push
