import React from 'react';

/**
 * XRPL Standards Compliance Badge Component
 * Displays compliance with XRPL standards (XLS-33, XLS-40, XLS-80)
 */
const XRPLStandardsBadge: React.FC = () => {
  const standards = [
    { name: 'XLS-33', description: 'Multi-Purpose Tokens (MPT)', status: 'Compliant' },
    { name: 'XLS-40', description: 'Decentralized Identifiers (DID)', status: 'Compliant' },
    { name: 'XLS-80', description: 'Permissioned Domains', status: 'Compliant' }
  ];

  return (
    <div className="xrpl-standards-badge">
      <h3>XRPL Standards Compliance</h3>
      <div className="standards-grid">
        {standards.map((standard) => (
          <div key={standard.name} className="standard-item">
            <div className="standard-name">{standard.name}</div>
            <div className="standard-description">{standard.description}</div>
            <div className={`standard-status ${standard.status.toLowerCase()}`}>
              {standard.status}
            </div>
          </div>
        ))}
      </div>
      <div className="institutional-grade-indicator">
        <span className="indicator-icon">🏛️</span>
        <span>Institutional Grade Implementation</span>
      </div>
    </div>
  );
};

export default XRPLStandardsBadge;
