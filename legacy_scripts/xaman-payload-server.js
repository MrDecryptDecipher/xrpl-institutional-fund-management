import express from 'express';
import { Xumm } from 'xumm';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.VITE_XAMAN_PAYLOAD_PORT || process.env.VITE_PUBLIC_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Get API credentials from environment variables
const apiKey = process.env.VITE_XUMM_API_KEY;
const apiSecret = process.env.XUMM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error('Xaman API credentials not configured');
  process.exit(1);
}

// Initialize Xumm SDK with both credentials (only safe in backend)
const xumm = new Xumm(apiKey, apiSecret);

// Add error handling for the Xumm SDK
xumm.on('error', (error) => {
  console.error('Xumm SDK error:', error);
});

// Payload status endpoint
app.get('/api/payload-status/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;

    if (!uuid) {
      return res.status(400).json({ error: 'Payload UUID is required' });
    }

    // Get the payload status using the Xumm SDK
    console.log('Getting payload status for UUID:', uuid);
    const payload = await xumm.payload.get(uuid);
    
    console.log('Payload status retrieved successfully:', payload.uuid);
    console.log('Payload details:', payload);
    
    // Return the payload data to the frontend
    const response = {
      uuid: payload.uuid,
      meta: payload.meta,
      response: payload.response,
      custom_meta: payload.custom_meta
    };
    
    console.log('Sending response:', response);
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Payload status error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to get payload status' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// HTTP endpoint for creating Xaman payloads
app.post('/api/create-xaman-payload', async (req, res) => {
  try {
    const body = req.body;
    
    console.log('Creating Xaman payload with body:', body);
    
    // Create the payload based on the transaction type
    const payloadData = {
      TransactionType: body.transactionType || 'SignIn',
      // Add any additional transaction data from the body
      ...body.transactionData
    };
    
    // Create the payload using the Xumm SDK
    console.log('Creating payload with data:', payloadData);
    const payload = await xumm.payload.create(payloadData);
    
    console.log('Payload created successfully:', payload.uuid);
    console.log('Payload details:', payload);
    
    // Return the payload data to the frontend
    const response = {
      success: true,
      uuid: payload.uuid,
      refs: payload.refs,
      pushed: payload.pushed,
      next: payload.next
    };
    
    console.log('Sending response:', response);
    res.status(200).json(response);
    console.log('Response sent');
  } catch (error) {
    console.error('Error creating Xaman payload:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error creating Xaman payload" 
    });
  }
});

// Execute transaction endpoint
app.post('/api/execute-transaction', async (req, res) => {
  try {
    const { account, amount, recipient, transactionType, network } = req.body;

    if (!account) {
      return res.status(400).json({ error: 'Account is required' });
    }

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    // Create the appropriate XRPL transaction based on transaction type
    let transactionData;
    
    switch (transactionType) {
      case 'subscription':
        // For subscription, we'll create a Payment transaction to the fund pool
        transactionData = {
          TransactionType: 'Payment',
          Account: account,
          Destination: recipient || 'rP9gFJbJF8D8HcHFvHRD5GkViqLzXp2T4M', // Default fund pool address
          Amount: (parseFloat(amount) * 1000000).toString(), // Convert XRP to drops
          Memos: [
            {
              Memo: {
                MemoType: Buffer.from('TransactionType').toString('hex'),
                MemoData: Buffer.from('Subscription').toString('hex')
              }
            }
          ]
        };
        break;
        
      case 'redemption':
        // For redemption, we'll create a Payment transaction from the fund pool
        transactionData = {
          TransactionType: 'Payment',
          Account: 'rP9gFJbJF8D8HcHFvHRD5GkViqLzXp2T4M', // Fund pool address
          Destination: recipient || account,
          Amount: (parseFloat(amount) * 1000000).toString(), // Convert XRP to drops
          Memos: [
            {
              Memo: {
                MemoType: Buffer.from('TransactionType').toString('hex'),
                MemoData: Buffer.from('Redemption').toString('hex')
              }
            }
          ]
        };
        break;
        
      case 'transfer':
        // For transfer, we'll create a Payment transaction between accounts
        if (!recipient) {
          return res.status(400).json({ error: 'Recipient is required for transfer' });
        }
        transactionData = {
          TransactionType: 'Payment',
          Account: account,
          Destination: recipient,
          Amount: (parseFloat(amount) * 1000000).toString(), // Convert XRP to drops
          Memos: [
            {
              Memo: {
                MemoType: Buffer.from('TransactionType').toString('hex'),
                MemoData: Buffer.from('Transfer').toString('hex')
              }
            }
          ]
        };
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid transaction type' });
    }

    // Create the payload using the Xumm SDK
    console.log('Creating transaction payload with data:', transactionData);
    const payload = await xumm.payload.create(transactionData, true); // true = return to app after signing
    
    console.log('Transaction payload created successfully:', payload.uuid);
    console.log('Payload details:', payload);
    
    // Return the payload data to the frontend
    const response = {
      success: true,
      uuid: payload.uuid,
      txJson: transactionData,
      explorerUrl: payload.next.always, // URL to view the payload
      qrCodeUrl: payload.refs.qr_png // QR code for mobile signing
    };
    
    console.log('Sending response:', response);
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Transaction execution error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to execute transaction' 
    });
  }
});

// Create permissioned domain endpoint
app.post('/api/create-permissioned-domain', async (req, res) => {
  try {
    const { owner, domainName } = req.body;

    if (!owner) {
      return res.status(400).json({ error: 'Owner account is required' });
    }

    if (!domainName) {
      return res.status(400).json({ error: 'Domain name is required' });
    }

    // Create a PermissionedDomainSet transaction
    const transactionData = {
      TransactionType: 'Payment', // Using Payment as a placeholder - in a real implementation this would be PermissionedDomainSet
      Account: owner,
      Destination: 'rP9gFJbJF8D8HcHFvHRD5GkViqLzXp2T4M', // Placeholder destination
      Amount: '1000000', // 1 XRP in drops for domain creation fee
      Memos: [
        {
          Memo: {
            MemoType: Buffer.from('PermissionedDomain').toString('hex'),
            MemoData: Buffer.from(`CreateDomain:${domainName}`).toString('hex')
          }
        }
      ]
    };

    // Create the payload using the Xumm SDK
    console.log('Creating permissioned domain payload with data:', transactionData);
    const payload = await xumm.payload.create(transactionData, true); // true = return to app after signing
    
    console.log('Permissioned domain payload created successfully:', payload.uuid);
    console.log('Payload details:', payload);
    
    // Return the payload data to the frontend
    const response = {
      success: true,
      uuid: payload.uuid,
      txJson: transactionData,
      explorerUrl: payload.next.always, // URL to view the payload
      qrCodeUrl: payload.refs.qr_png // QR code for mobile signing
    };
    
    console.log('Sending response:', response);
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Permissioned domain creation error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to create permissioned domain' 
    });
  }
});

// Create governance proposal endpoint
app.post('/api/create-governance-proposal', async (req, res) => {
  try {
    const { creator, title, description, votingPeriod } = req.body;

    if (!creator) {
      return res.status(400).json({ error: 'Creator account is required' });
    }

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    // Create a governance proposal transaction (using Payment as placeholder)
    const transactionData = {
      TransactionType: 'Payment', // Using Payment as a placeholder - in a real implementation this would be a custom transaction
      Account: creator,
      Destination: 'rP9gFJbJF8D8HcHFvHRD5GkViqLzXp2T4M', // Placeholder destination
      Amount: '1000000', // 1 XRP in drops for proposal creation fee
      Memos: [
        {
          Memo: {
            MemoType: Buffer.from('GovernanceProposal').toString('hex'),
            MemoData: Buffer.from(`Title:${title}|Description:${description}|VotingPeriod:${votingPeriod || 7}`).toString('hex')
          }
        }
      ]
    };

    // Create the payload using the Xumm SDK
    console.log('Creating governance proposal payload with data:', transactionData);
    const payload = await xumm.payload.create(transactionData, true); // true = return to app after signing
    
    console.log('Governance proposal payload created successfully:', payload.uuid);
    console.log('Payload details:', payload);
    
    // Return the payload data to the frontend
    const response = {
      success: true,
      uuid: payload.uuid,
      txJson: transactionData,
      explorerUrl: payload.next.always, // URL to view the payload
      qrCodeUrl: payload.refs.qr_png // QR code for mobile signing
    };
    
    console.log('Sending response:', response);
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Governance proposal creation error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to create governance proposal' 
    });
  }
});

// Submit vote endpoint
app.post('/api/submit-vote', async (req, res) => {
  try {
    const { voter, proposalId, vote } = req.body;

    if (!voter) {
      return res.status(400).json({ error: 'Voter account is required' });
    }

    if (!proposalId) {
      return res.status(400).json({ error: 'Proposal ID is required' });
    }

    if (!vote || !['yes', 'no', 'abstain'].includes(vote)) {
      return res.status(400).json({ error: 'Valid vote (yes/no/abstain) is required' });
    }

    // Create a vote submission transaction (using Payment as placeholder)
    const transactionData = {
      TransactionType: 'Payment', // Using Payment as a placeholder - in a real implementation this would be a custom transaction
      Account: voter,
      Destination: 'rP9gFJbJF8D8HcHFvHRD5GkViqLzXp2T4M', // Placeholder destination
      Amount: '1000000', // 1 XRP in drops for voting fee
      Memos: [
        {
          Memo: {
            MemoType: Buffer.from('GovernanceVote').toString('hex'),
            MemoData: Buffer.from(`ProposalId:${proposalId}|Vote:${vote}`).toString('hex')
          }
        }
      ]
    };

    // Create the payload using the Xumm SDK
    console.log('Creating vote submission payload with data:', transactionData);
    const payload = await xumm.payload.create(transactionData, true); // true = return to app after signing
    
    console.log('Vote submission payload created successfully:', payload.uuid);
    console.log('Payload details:', payload);
    
    // Return the payload data to the frontend
    const response = {
      success: true,
      uuid: payload.uuid,
      txJson: transactionData,
      explorerUrl: payload.next.always, // URL to view the payload
      qrCodeUrl: payload.refs.qr_png // QR code for mobile signing
    };
    
    console.log('Sending response:', response);
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Vote submission error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to submit vote' 
    });
  }
});

// Generate report endpoint
app.post('/api/generate-report', async (req, res) => {
  try {
    const { requester, reportType, reportPeriod } = req.body;

    if (!requester) {
      return res.status(400).json({ error: 'Requester account is required' });
    }

    if (!reportType) {
      return res.status(400).json({ error: 'Report type is required' });
    }

    // Create a report generation transaction (using Payment as placeholder)
    const transactionData = {
      TransactionType: 'Payment', // Using Payment as a placeholder - in a real implementation this would be a custom transaction
      Account: requester,
      Destination: 'rP9gFJbJF8D8HcHFvHRD5GkViqLzXp2T4M', // Placeholder destination
      Amount: '1000000', // 1 XRP in drops for report generation fee
      Memos: [
        {
          Memo: {
            MemoType: Buffer.from('ReportGeneration').toString('hex'),
            MemoData: Buffer.from(`ReportType:${reportType}|ReportPeriod:${reportPeriod}`).toString('hex')
          }
        }
      ]
    };

    // Create the payload using the Xumm SDK
    console.log('Creating report generation payload with data:', transactionData);
    const payload = await xumm.payload.create(transactionData, true); // true = return to app after signing
    
    console.log('Report generation payload created successfully:', payload.uuid);
    console.log('Payload details:', payload);
    
    // Return the payload data to the frontend
    const response = {
      success: true,
      uuid: payload.uuid,
      txJson: transactionData,
      explorerUrl: payload.next.always, // URL to view the payload
      qrCodeUrl: payload.refs.qr_png // QR code for mobile signing
    };
    
    console.log('Sending response:', response);
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Report generation error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to generate report' 
    });
  }
});

// Download report endpoint
app.get('/api/download-report/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Report ID is required' });
    }

    // In a real implementation, we would:
    // 1. Verify the report exists and the user has access to it
    // 2. Retrieve the report from storage
    // 3. Return the report as a downloadable file
    
    // For now, we'll simulate a successful report download by returning mock data
    // In a real implementation, this would return a PDF or other file format
    
    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="report-${id}.pdf"`);
    
    // Return mock PDF content (in a real implementation, this would be the actual report)
    const mockPdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj
4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(Report ${id}) Tj
ET
endstream
endobj
5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000163 00000 n 
0000000347 00000 n 
0000000444 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
543
%%EOF`;

    // Convert string to buffer and send
    const buffer = Buffer.from(mockPdfContent, 'binary');
    res.send(buffer);
    
  } catch (error) {
    console.error('Report download error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to download report' 
    });
  }
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Add 404 handler
app.use((req, res) => {
  console.log('404 - Not found:', req.url);
  res.status(404).json({ error: 'Not found' });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Xaman payload server running at http://0.0.0.0:${port}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  process.exit(0);
});

export default app;