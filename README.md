# BlockGuard

Smart contract security checks for Solidity developers.

BlockGuard helps you catch common smart contract vulnerabilities early by running static analysis and explaining issues in clear, human language.

This is not a replacement for professional audits.  
It’s the first line of defense before deployment.

BlockGuard was not built smoothly.

While building this project, I ran into repeated failures across the static analysis pipeline, Solidity compiler compatibility, and Dockerized backend setup. Instead of hiding these issues, this repository documents them to reflect the realities of building production-grade blockchain security tooling.

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
  ### 1. Slither & Solidity Version Mismatch
Slither depends on specific Solidity compiler versions, while uploaded contracts often used different pragma ranges. This caused analysis failures that were not immediately obvious.

**Learning:** Static analysis tooling is extremely version-sensitive and must validate compiler compatibility before execution.


### 2. Fragile Analysis Pipeline
The upload → compile → analyze → store pipeline was tightly coupled. A failure at any stage would break the entire flow.

**Learning:** Real-world tooling requires fault tolerance and clear error propagation, not just happy-path execution.

---

### 3. Docker Restart & Environment Issues
Restarting the backend often caused multiple services to fail due to stale containers and port conflicts.

**Learning:** Dockerized systems need explicit teardown and restart strategies; they are not self-healing by default.

## Tech stack
- Nextjs
- TypeScript
- Node.js
- Docker
- Slither
- PostgreSQL

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

BlockGuard is intentionally imperfect — it represents real attempts, real failures, and real learning while building blockchain security tooling.
