import type { ScanResult, Vulnerability } from './types';

const sampleContractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UnsafeBank {
    mapping(address => uint) public balances;

    // Vulnerability: Reentrancy
    function withdraw() public {
        uint balance = balances[msg.sender];
        require(balance > 0, "Insufficient balance");

        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Failed to send Ether");

        balances[msg.sender] = 0;
    }

    // Vulnerability: Integer Overflow
    function deposit(uint256 amount) public payable {
        balances[msg.sender] += amount; // Can overflow
    }

    // Vulnerability: Access Control Issue
    function transferOwnership(address newOwner) public {
        // Missing ownership check, anyone can become the owner
        owner = newOwner;
    }
    
    address public owner;

    // Vulnerability: Dead Code
    function unusedFunction() public pure returns (uint) {
        uint a = 1;
        uint b = 2;
        // This function is never called
        return a + b;
    }

    // Vulnerability: Gas Inefficiency
    function getBalance() public view returns (uint) {
        // Public state variable `balances` already creates a getter
        return balances[msg.sender];
    }
}`;

const vulnerabilities: Vulnerability[] = [
  {
    id: 'vuln-1',
    title: 'Reentrancy',
    severity: 'Critical',
    description: 'The contract is vulnerable to a reentrancy attack in the `withdraw` function. An attacker could repeatedly call the withdraw function before the balance is set to zero, draining the contract of its funds. The state change `balances[msg.sender] = 0;` should occur before the external call.',
    lineNumber: 11,
    contractName: 'UnsafeBank.sol',
    sourceCode: sampleContractCode,
    rawReport: 'Slither report for UnsafeBank.sol:\n- Reentrancy in UnsafeBank.withdraw() (L11-14): External call to `msg.sender` inside a function that modifies state, without a Checks-Effects-Interactions pattern or reentrancy guard.'
  },
  {
    id: 'vuln-2',
    title: 'Integer Overflow',
    severity: 'High',
    description: 'The `deposit` function is vulnerable to an integer overflow. If a user deposits a very large amount, their balance could wrap around to zero. Use of SafeMath or a Solidity version >=0.8.0 (which has built-in checks) is recommended.',
    lineNumber: 18,
    contractName: 'UnsafeBank.sol',
    sourceCode: sampleContractCode,
    rawReport: 'Slither report for UnsafeBank.sol:\n- Integer Overflow in UnsafeBank.deposit() (L18): The expression `balances[msg.sender] += amount` can overflow. Use a safe math library.'
  },
  {
    id: 'vuln-3',
    title: 'Broken Access Control',
    severity: 'High',
    description: 'The `transferOwnership` function lacks an access control check (e.g., `require(msg.sender == owner)`). Any user can call this function and take ownership of the contract.',
    lineNumber: 23,
    contractName: 'UnsafeBank.sol',
    sourceCode: sampleContractCode,
    rawReport: 'Slither report for UnsafeBank.sol:\n- Unprotected `transferOwnership` function (L22-25): The function allows any caller to change the contract owner.'
  },
  {
    id: 'vuln-4',
    title: 'Gas Inefficiency',
    severity: 'Low',
    description: 'The public state variable `balances` automatically creates a getter function. The custom `getBalance` function is redundant and consumes unnecessary gas on deployment.',
    lineNumber: 35,
    contractName: 'UnsafeBank.sol',
    sourceCode: sampleContractCode,
    rawReport: 'Slither report for UnsafeBank.sol:\n- Redundant `getBalance` function (L34-37): The public mapping `balances` already provides a getter. This function is not needed.'
  },
  {
    id: 'vuln-5',
    title: 'Dead Code',
    severity: 'Info',
    description: 'The function `unusedFunction` is defined but never used within the contract. This can lead to confusion and increases deployment costs.',
    lineNumber: 29,
    contractName: 'UnsafeBank.sol',
    sourceCode: sampleContractCode,
    rawReport: 'Slither report for UnsafeBank.sol:\n- Unused function `unusedFunction` (L28-32): The function is never called inside the contract.'
  },
];

export const scanResults: ScanResult[] = [
    {
        id: 'scan-1',
        contractName: 'UnsafeBank.sol',
        scanDate: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        solidityVersion: '0.8.19',
        riskScore: 85,
        vulnerabilities: vulnerabilities,
        sourceCode: sampleContractCode,
    },
    {
        id: 'scan-2',
        contractName: 'OldToken.sol',
        scanDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        solidityVersion: '0.8.12',
        riskScore: 65,
        vulnerabilities: [vulnerabilities[1], vulnerabilities[3]],
        sourceCode: sampleContractCode,
    },
    {
        id: 'scan-3',
        contractName: 'LegacyContract.sol',
        scanDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        solidityVersion: '0.8.4',
        riskScore: 42,
        vulnerabilities: [vulnerabilities[3]],
        sourceCode: sampleContractCode,
    },
];

export function getScanById(id: string | null): ScanResult | undefined {
    if (id === 'latest') return scanResults[0];
    return scanResults.find(scan => scan.id === id);
}
