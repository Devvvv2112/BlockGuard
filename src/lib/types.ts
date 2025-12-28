export type Severity = "Critical" | "High" | "Medium" | "Low" | "Info";

export interface Vulnerability {
  id: string;
  title: string;
  severity: Severity;
  description: string;
  lineNumber: number;
  contractName: string;
  sourceCode: string; // The full source code of the contract where the vulnerability is
  rawReport: string; // The raw output from the analysis tool for this specific vulnerability
}

export interface ScanResult {
  id: string;
  contractName: string;
  scanDate: string;
  solidityVersion: string;
  riskScore: number;
  vulnerabilities: Vulnerability[];
  sourceCode: string; // The full source code of the scanned contract
}
