import { internalAction } from "../_generated/server";
import { v } from "convex/values";
import { Client, Wallet } from 'xrpl';

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
  devnet: "wss://s.devnet.rippletest.net:51233"
};

export const createCredential = internalAction({
  args: {
    issuerSeed: v.string(),
    subject: v.string(),
    credentialType: v.string(),
    network: v.optional(v.string())
  },
  returns: v.object({
    success: v.boolean(),
    credentialId: v.optional(v.string()),
    error: v.optional(v.string())
  }),
  handler: async (ctx, args) => {
    try {
      const client = new Client(XRPL_NETWORKS[args.network as keyof typeof XRPL_NETWORKS] || XRPL_NETWORKS.testnet);
      await client.connect();

      try {
        const wallet = Wallet.fromSeed(args.issuerSeed);

        // Convert credential type to hex if needed
        let credentialType = args.credentialType;
        if (!/^[0-9A-F]+$/i.test(credentialType)) {
          let hex = '';
          for (let i = 0; i < credentialType.length; i++) {
            const charCode = credentialType.charCodeAt(i);
            const hexCharCode = charCode.toString(16).padStart(2, '0');
            hex += hexCharCode;
          }
          credentialType = hex.toUpperCase();
        }

        // Create credential transaction
        const credentialTx = {
          "TransactionType": "CredentialCreate",
          "Account": wallet.address,
          "Subject": args.subject,
          "CredentialType": credentialType
        };

        const prepared = await client.autofill(credentialTx);
        const signed = wallet.sign(prepared);
        const result = await client.submitAndWait(signed.tx_blob);

        await client.disconnect();

        if (result.result.meta.TransactionResult === "tesSUCCESS") {
          // Parse for credential info
          const parsedResponse = JSON.parse(JSON.stringify(result.result.meta.AffectedNodes, null, 2));
          const credentialInfo = parsedResponse.find((node: any) => 
            node.CreatedNode && node.CreatedNode.LedgerEntryType === "Credential"
          );
          
          return {
            success: true,
            credentialId: credentialInfo?.CreatedNode?.index
          };
        } else {
          return {
            success: false,
            error: `Transaction failed: ${result.result.meta.TransactionResult}`
          };
        }
      } catch (error) {
        await client.disconnect();
        throw error;
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
});

export const createPermissionedDomain = internalAction({
  args: {
    issuerSeed: v.string(),
    credentialType: v.string(),
    domainId: v.optional(v.string()),
    network: v.optional(v.string())
  },
  returns: v.object({
    success: v.boolean(),
    domainId: v.optional(v.string()),
    error: v.optional(v.string())
  }),
  handler: async (ctx, args) => {
    try {
      const client = new Client(XRPL_NETWORKS[args.network as keyof typeof XRPL_NETWORKS] || XRPL_NETWORKS.testnet);
      await client.connect();

      try {
        const wallet = Wallet.fromSeed(args.issuerSeed);

        // Convert credential type to hex if needed
        let credentialType = args.credentialType;
        if (!/^[0-9A-F]+$/i.test(credentialType)) {
          let hex = '';
          for (let i = 0; i < credentialType.length; i++) {
            const charCode = credentialType.charCodeAt(i);
            const hexCharCode = charCode.toString(16).padStart(2, '0');
            hex += hexCharCode;
          }
          credentialType = hex.toUpperCase();
        }

        // Create permissioned domain transaction
        const domainTx = {
          "TransactionType": "PermissionedDomainSet",
          "Account": wallet.address,
          "AcceptedCredentials": [
            {
              "Credential": {
                "Issuer": wallet.address,
                "CredentialType": credentialType
              }
            }
          ]
        };

        if (args.domainId) {
          domainTx.DomainID = args.domainId;
        }

        const prepared = await client.autofill(domainTx);
        const signed = wallet.sign(prepared);
        const result = await client.submitAndWait(signed.tx_blob);

        await client.disconnect();

        if (result.result.meta.TransactionResult === "tesSUCCESS") {
          let domainId;
          if (args.domainId) {
            domainId = args.domainId;
          } else {
            // Parse for domain info
            const parsedResponse = JSON.parse(JSON.stringify(result.result.meta.AffectedNodes, null, 2));
            const domainInfo = parsedResponse.find((node: any) => 
              node.CreatedNode && node.CreatedNode.LedgerEntryType === "PermissionedDomain"
            );
            domainId = domainInfo?.CreatedNode?.index;
          }
          
          return {
            success: true,
            domainId: domainId
          };
        } else {
          return {
            success: false,
            error: `Transaction failed: ${result.result.meta.TransactionResult}`
          };
        }
      } catch (error) {
        await client.disconnect();
        throw error;
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
});

