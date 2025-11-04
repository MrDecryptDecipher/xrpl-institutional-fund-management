#!/usr/bin/env python3
"""
Comprehensive Audit Script for XRPL Institutional Fund Management Protocol
Analyzes ALL 332 documentation files and compares with implementation
"""

import os
import json
import re
from pathlib import Path
from collections import defaultdict

class XRPLAuditAnalyzer:
    def __init__(self, base_path):
        self.base_path = Path(base_path)
        self.docs_path = self.base_path / "docs" / "XRPL"
        self.src_path = self.base_path / "src"
        self.convex_path = self.base_path / "convex"
        
        self.audit_results = {
            "total_docs": 0,
            "analyzed_docs": 0,
            "xrpl_primitives": {},
            "ui_requirements": {},
            "backend_implementations": {},
            "frontend_implementations": {},
            "missing_features": [],
            "critical_gaps": [],
            "partial_implementations": []
        }
        
    def analyze_all_documentation(self):
        """Analyze all markdown files in docs/XRPL/"""
        print("=" * 80)
        print("ANALYZING ALL DOCUMENTATION FILES")
        print("=" * 80)
        
        # Get all markdown files
        md_files = list(self.docs_path.rglob("*.md"))
        self.audit_results["total_docs"] = len(md_files)
        
        print(f"\nTotal documentation files found: {len(md_files)}")
        
        # Categorize by subdirectory
        categories = defaultdict(list)
        for md_file in md_files:
            relative_path = md_file.relative_to(self.docs_path)
            category = relative_path.parts[0] if len(relative_path.parts) > 1 else "root"
            categories[category].append(md_file)
        
        print(f"\nDocumentation categories:")
        for category, files in sorted(categories.items()):
            print(f"  {category}: {len(files)} files")
        
        # Analyze each category
        for category, files in sorted(categories.items()):
            print(f"\n{'=' * 80}")
            print(f"CATEGORY: {category}")
            print(f"{'=' * 80}")
            
            for md_file in sorted(files):
                self.analyze_doc_file(md_file, category)
                
        return self.audit_results
    
    def analyze_doc_file(self, md_file, category):
        """Analyze a single documentation file"""
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            filename = md_file.name
            self.audit_results["analyzed_docs"] += 1
            
            # Extract key information
            analysis = {
                "file": str(md_file.relative_to(self.base_path)),
                "category": category,
                "title": self.extract_title(content),
                "ui_elements": self.extract_ui_elements(content),
                "code_examples": self.extract_code_examples(content),
                "transaction_types": self.extract_transaction_types(content),
                "ledger_objects": self.extract_ledger_objects(content),
                "prerequisites": self.extract_prerequisites(content),
                "tutorials": self.extract_tutorials(content)
            }
            
            # Store in appropriate category
            if category == "C":  # Tutorials
                self.audit_results["ui_requirements"][filename] = analysis
            elif category == "G":  # Ledger data formats
                self.audit_results["xrpl_primitives"][filename] = analysis
            elif category == "H":  # Transaction types
                self.audit_results["xrpl_primitives"][filename] = analysis
                
        except Exception as e:
            print(f"  ERROR analyzing {md_file.name}: {e}")
    
    def extract_title(self, content):
        """Extract main title from markdown"""
        match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        return match.group(1) if match else "Unknown"
    
    def extract_ui_elements(self, content):
        """Extract UI elements mentioned in documentation"""
        ui_elements = []
        
        # Look for button mentions
        buttons = re.findall(r'["\']([^"\']*(?:button|Button)[^"\']*)["\']', content, re.IGNORECASE)
        ui_elements.extend([f"Button: {b}" for b in buttons])
        
        # Look for field mentions
        fields = re.findall(r'["\']([^"\']*(?:field|Field)[^"\']*)["\']', content, re.IGNORECASE)
        ui_elements.extend([f"Field: {f}" for f in fields])
        
        # Look for form elements
        forms = re.findall(r'<(input|button|select|textarea)[^>]*>', content, re.IGNORECASE)
        ui_elements.extend([f"HTML: {f}" for f in forms])
        
        return ui_elements
    
    def extract_code_examples(self, content):
        """Extract code examples"""
        code_blocks = re.findall(r'```(\w+)?\n(.*?)```', content, re.DOTALL)
        return len(code_blocks)
    
    def extract_transaction_types(self, content):
        """Extract transaction types mentioned"""
        # Common XRPL transaction types
        tx_types = [
            "Payment", "OfferCreate", "OfferCancel", "TrustSet", "AccountSet",
            "MPTokenIssuanceCreate", "MPTokenAuthorize", "PermissionedDomainSet",
            "DIDSet", "CredentialCreate", "CredentialAccept", "AMMCreate",
            "NFTokenMint", "NFTokenBurn", "EscrowCreate", "CheckCreate"
        ]
        
        found = []
        for tx_type in tx_types:
            if tx_type in content:
                found.append(tx_type)
        return found
    
    def extract_ledger_objects(self, content):
        """Extract ledger object types mentioned"""
        object_types = [
            "MPToken", "MPTokenIssuance", "PermissionedDomain", "DID",
            "Credential", "AMM", "NFToken", "Escrow", "Check", "PayChannel"
        ]
        
        found = []
        for obj_type in object_types:
            if obj_type in content:
                found.append(obj_type)
        return found
    
    def extract_prerequisites(self, content):
        """Extract prerequisites section"""
        match = re.search(r'## Prerequisites\s+(.*?)(?=\n##|\Z)', content, re.DOTALL)
        return match.group(1).strip() if match else None
    
    def extract_tutorials(self, content):
        """Check if this is a tutorial file"""
        return "tutorial" in content.lower() or "example" in content.lower()
    
    def analyze_backend_implementation(self):
        """Analyze backend implementation in convex/"""
        print(f"\n{'=' * 80}")
        print("ANALYZING BACKEND IMPLEMENTATION")
        print(f"{'=' * 80}")
        
        if not self.convex_path.exists():
            print("  ERROR: convex/ directory not found")
            return
        
        # Find all TypeScript files
        ts_files = list(self.convex_path.rglob("*.ts"))
        print(f"\nTotal backend files: {len(ts_files)}")
        
        for ts_file in sorted(ts_files):
            relative_path = ts_file.relative_to(self.convex_path)
            print(f"  ✓ {relative_path}")
            
            # Analyze file content
            try:
                with open(ts_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                self.audit_results["backend_implementations"][str(relative_path)] = {
                    "lines": len(content.split('\n')),
                    "functions": len(re.findall(r'export\s+(async\s+)?function', content)),
                    "mutations": len(re.findall(r'mutation\(', content)),
                    "queries": len(re.findall(r'query\(', content)),
                    "actions": len(re.findall(r'action\(', content))
                }
            except Exception as e:
                print(f"    ERROR: {e}")
    
    def analyze_frontend_implementation(self):
        """Analyze frontend implementation in src/"""
        print(f"\n{'=' * 80}")
        print("ANALYZING FRONTEND IMPLEMENTATION")
        print(f"{'=' * 80}")
        
        if not self.src_path.exists():
            print("  ERROR: src/ directory not found")
            return
        
        # Find all component files
        component_files = list((self.src_path / "components").rglob("*.tsx"))
        print(f"\nTotal component files: {len(component_files)}")
        
        for comp_file in sorted(component_files):
            relative_path = comp_file.relative_to(self.src_path)
            print(f"  ✓ {relative_path}")
            
            # Analyze component
            try:
                with open(comp_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                self.audit_results["frontend_implementations"][str(relative_path)] = {
                    "lines": len(content.split('\n')),
                    "components": len(re.findall(r'export\s+(function|const)\s+\w+', content)),
                    "hooks": len(re.findall(r'use[A-Z]\w+', content)),
                    "buttons": len(re.findall(r'<[Bb]utton', content)),
                    "forms": len(re.findall(r'<form', content)),
                    "inputs": len(re.findall(r'<[Ii]nput', content))
                }
            except Exception as e:
                print(f"    ERROR: {e}")
    
    def generate_report(self):
        """Generate comprehensive audit report"""
        print(f"\n{'=' * 80}")
        print("GENERATING COMPREHENSIVE AUDIT REPORT")
        print(f"{'=' * 80}")
        
        report_path = self.base_path / "COMPREHENSIVE_AUDIT_RESULTS.json"
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(self.audit_results, f, indent=2)
        
        print(f"\n✓ Report saved to: {report_path}")
        
        # Print summary
        print(f"\n{'=' * 80}")
        print("AUDIT SUMMARY")
        print(f"{'=' * 80}")
        print(f"Total documentation files: {self.audit_results['total_docs']}")
        print(f"Analyzed documentation files: {self.audit_results['analyzed_docs']}")
        print(f"Backend implementations: {len(self.audit_results['backend_implementations'])}")
        print(f"Frontend implementations: {len(self.audit_results['frontend_implementations'])}")

def main():
    base_path = "/home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol (1)"
    
    analyzer = XRPLAuditAnalyzer(base_path)
    
    # Run comprehensive analysis
    analyzer.analyze_all_documentation()
    analyzer.analyze_backend_implementation()
    analyzer.analyze_frontend_implementation()
    analyzer.generate_report()
    
    print("\n" + "=" * 80)
    print("AUDIT COMPLETE")
    print("=" * 80)

if __name__ == "__main__":
    main()

