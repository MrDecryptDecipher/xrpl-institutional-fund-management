"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Ticket } from "lucide-react";
import { Client, Wallet } from "xrpl";
import { formatXRPLError } from "@/lib/xrplErrors";

const XRPL_NETWORKS = {
  testnet: "wss://s.altnet.rippletest.net:51233",
};

interface TicketManagementProps {
  xrplAccount: string;
}

export default function TicketManagement({ xrplAccount }: TicketManagementProps) {
  const [ticketCount, setTicketCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTickets, setCurrentTickets] = useState<number>(0);

  const handleCreateTickets = async () => {
    if (!xrplAccount) {
      toast.error("Please connect your XRPL wallet first");
      return;
    }

    if (!ticketCount) {
      toast.error("Ticket count is required");
      return;
    }

    const count = parseInt(ticketCount);
    if (count < 1 || count > 250) {
      toast.error("Ticket count must be between 1 and 250");
      return;
    }

    if (currentTickets + count > 250) {
      toast.error(`Would exceed 250 ticket limit (current: ${currentTickets})`);
      return;
    }

    setLoading(true);
    const client = new Client(XRPL_NETWORKS.testnet);

    try {
      await client.connect();
      toast.info("Connected to XRPL Testnet");

      const ticketTx: any = {
        TransactionType: "TicketCreate",
        Account: xrplAccount,
        TicketCount: count
      };

      toast.info(`Creating ${count} ticket(s)...`);

      const prepared = await client.autofill(ticketTx);
      const wallet = Wallet.fromSeed(process.env.NEXT_PUBLIC_XRPL_SEED || "");
      const signed = wallet.sign(prepared);
      
      const result = await client.submitAndWait(signed.tx_blob);

      if (result.result.meta && typeof result.result.meta === 'object' && 'TransactionResult' in result.result.meta) {
        const txResult = result.result.meta.TransactionResult;
        
        if (txResult === "tesSUCCESS") {
          toast.success(`Successfully created ${count} ticket(s)!`);
          setTicketCount("");
          // Refresh ticket count
          await fetchTicketCount(client);
        } else {
          toast.error(formatXRPLError(txResult));
        }
      }

    } catch (error: any) {
      console.error("TicketCreate error:", error);
      toast.error(error.message || "Failed to create tickets");
    } finally {
      await client.disconnect();
      setLoading(false);
    }
  };

  const fetchTicketCount = async (client?: Client) => {
    if (!xrplAccount) return;

    const shouldDisconnect = !client;
    if (!client) {
      client = new Client(XRPL_NETWORKS.testnet);
      await client.connect();
    }

    try {
      const response = await client.request({
        command: "account_info",
        account: xrplAccount,
        ledger_index: "validated"
      });

      const ticketCount = response.result.account_data.TicketCount || 0;
      setCurrentTickets(ticketCount);
    } catch (error) {
      console.error("Failed to fetch ticket count:", error);
    } finally {
      if (shouldDisconnect && client) {
        await client.disconnect();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Ticket className="h-8 w-8 text-amber-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ticket Management</h2>
          <p className="text-sm text-gray-600">Pre-allocate sequence numbers for flexible transaction ordering</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Tickets</CardTitle>
          <CardDescription>
            Set aside sequence numbers as tickets (max 250 total)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription className="text-sm">
              <strong>Current Tickets:</strong> {currentTickets} / 250
              <Button
                size="sm"
                variant="outline"
                onClick={() => fetchTicketCount()}
                className="ml-2"
              >
                Refresh
              </Button>
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>Number of Tickets to Create *</Label>
            <Input
              type="number"
              min="1"
              max="250"
              placeholder="1-250"
              value={ticketCount}
              onChange={(e) => setTicketCount(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Available: {250 - currentTickets} tickets
            </p>
          </div>

          <Alert className="border-blue-200 bg-blue-50">
            <AlertDescription className="text-sm text-blue-800">
              <strong>How Tickets Work:</strong>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Tickets allow out-of-order transaction submission</li>
                <li>Each ticket uses one sequence number</li>
                <li>Useful for parallel transaction processing</li>
                <li>This transaction increases sequence by 1 + TicketCount</li>
                <li>Requires owner reserve (2 XRP per ticket)</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Alert className="border-orange-200 bg-orange-50">
            <AlertDescription className="text-sm text-orange-800">
              <strong>Error Cases:</strong>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li><strong>temINVALID_COUNT:</strong> Count must be 1-250</li>
                <li><strong>tecDIR_FULL:</strong> Would exceed 250 ticket limit</li>
                <li><strong>tecINSUFFICIENT_RESERVE:</strong> Not enough XRP for reserve</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Button
            onClick={handleCreateTickets}
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700"
          >
            {loading ? "Creating Tickets..." : "Create Tickets"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

