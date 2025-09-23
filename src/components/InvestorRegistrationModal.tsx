import { useState } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { X } from "lucide-react";
import { toast } from "sonner";

interface InvestorRegistrationModalProps {
  onClose: () => void;
}

export function InvestorRegistrationModal({ onClose }: InvestorRegistrationModalProps) {
  const [formData, setFormData] = useState({
    jurisdiction: "US",
    accreditationStatus: "retail" as const,
    xrplAccount: "",
    didDocument: ""
  });

  const registerInvestor = useMutation(api.investors.management.registerInvestor);
  const createXRPLAccount = useAction(api.xrpl.client.createXRPLAccount);
  const createDID = useAction(api.xrpl.did.createDID);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Create XRPL account for the investor
      const accountResult = await createXRPLAccount({ fundWallet: true });
      
      if (!accountResult.success) {
        throw new Error("Failed to create XRPL account");
      }

      // 2. Create DID document
      const didDocument = {
        id: `did:xrpl:${accountResult.account?.address || ""}`,
        publicKey: [{
          id: `did:xrpl:${accountResult.account?.address || ""}#keys-1`,
          type: "Ed25519VerificationKey2018",
          controller: `did:xrpl:${accountResult.account?.address || ""}`,
          publicKeyHex: accountResult.account?.publicKey || ""
        }],
        authentication: [`did:xrpl:${accountResult.account?.address || ""}#keys-1`],
        service: [{
          id: `did:xrpl:${accountResult.account?.address || ""}#xrpl-service`,
          type: "XRPLService",
          serviceEndpoint: `xrpl:${accountResult.account?.address || ""}`
        }]
      };

      const didResult = await createDID({
        ownerPrivateKey: accountResult.account?.privateKey || "",
        didDocument: didDocument
      });

      if (!didResult.success) {
        throw new Error("Failed to create DID");
      }

      // 3. Register investor
      await registerInvestor({
        didDocument: JSON.stringify(didDocument),
        xrplAccount: accountResult.account?.address || "",
        jurisdiction: formData.jurisdiction,
        accreditationStatus: formData.accreditationStatus
      });

      toast.success("Investor registration completed successfully!");
      onClose();
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Investor Registration</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jurisdiction *
            </label>
            <select
              value={formData.jurisdiction}
              onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="US">United States</option>
              <option value="EU">European Union</option>
              <option value="UK">United Kingdom</option>
              <option value="SG">Singapore</option>
              <option value="HK">Hong Kong</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Investor Type *
            </label>
            <select
              value={formData.accreditationStatus}
              onChange={(e) => setFormData({ ...formData, accreditationStatus: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="retail">Retail Investor</option>
              <option value="accredited">Accredited Investor</option>
              <option value="institutional">Institutional Investor</option>
            </select>
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="text-sm font-medium text-blue-900 mb-2">What happens next:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• XRPL account will be created automatically</li>
              <li>• Decentralized Identity (DID) will be established</li>
              <li>• KYC/AML verification may be required for some funds</li>
              <li>• You'll be able to invest in compliant funds</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
