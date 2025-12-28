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
## Key Engineering Challenges

### 1. Slither Compatibility Issues
Slither static analysis often failed when Solidity versions didn’t match what it expected. Contracts with broad pragma ranges would frequently fail without clear error messages, making automated analysis unreliable.

**What we learned:** Solidity tooling is fragile. Integrations must validate compiler versions up front, otherwise silent failures happen.

### 2. Pipeline Fragility
The analysis flow (upload → compile → analyze → store) was too tightly coupled. If any step failed, the whole pipeline collapsed.

**What we learned:** Build pipelines that can fail gracefully and report useful feedback back to the user.

### 3. Docker Restart Problems
After making changes, restarting the backend often broke things due to stale containers and conflicting ports.

**What we learned:** Container lifecycle needs explicit cleanup logic. Docker compose alone isn’t enough for stable restarts during active development.

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
