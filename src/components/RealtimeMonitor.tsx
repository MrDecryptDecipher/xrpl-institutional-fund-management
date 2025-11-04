/**
 * Real-Time XRPL Monitoring Component
 * WebSocket-based live data streaming with comprehensive subscription management
 */

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Activity, Wifi, WifiOff, Trash2, Play, Pause } from "lucide-react";
import WebSocketManager, { StreamType, BookSubscription } from "@/lib/WebSocketManager";

interface RealtimeMonitorProps {
  xrplAccount: string;
}

interface Message {
  id: string;
  type: string;
  timestamp: Date;
  data: any;
}

const RealtimeMonitor: React.FC<RealtimeMonitorProps> = ({ xrplAccount }) => {
  const [wsManager] = useState(() => new WebSocketManager("testnet"));
  const [isConnected, setIsConnected] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [maxMessages, setMaxMessages] = useState(100);

  // Stream subscriptions
  const [selectedStreams, setSelectedStreams] = useState<StreamType[]>([]);
  
  // Account subscriptions
  const [accountToWatch, setAccountToWatch] = useState("");
  const [watchedAccounts, setWatchedAccounts] = useState<string[]>([]);
  
  // Book subscriptions
  const [bookTakerGetsCurrency, setBookTakerGetsCurrency] = useState("XRP");
  const [bookTakerGetsIssuer, setBookTakerGetsIssuer] = useState("");
  const [bookTakerPaysCurrency, setBookTakerPaysCurrency] = useState("USD");
  const [bookTakerPaysIssuer, setBookTakerPaysIssuer] = useState("");
  const [watchedBooks, setWatchedBooks] = useState<BookSubscription[]>([]);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initWebSocket = async () => {
      try {
        await wsManager.connect();
        setIsConnected(true);
        toast.success("WebSocket connected");

        // Setup message handlers
        wsManager.on("ledger", handleLedgerMessage);
        wsManager.on("transaction", handleTransactionMessage);
        wsManager.on("validation", handleValidationMessage);
        wsManager.on("consensus", handleConsensusMessage);
        wsManager.on("peerStatus", handlePeerStatusMessage);
        wsManager.on("bookChanges", handleBookChangesMessage);

      } catch (error: any) {
        toast.error(`Connection failed: ${error.message}`);
        setIsConnected(false);
      }
    };

    initWebSocket();

    return () => {
      wsManager.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isPaused) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isPaused]);

  const addMessage = (type: string, data: any) => {
    if (isPaused) return;

    const newMessage: Message = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      timestamp: new Date(),
      data
    };

    setMessages(prev => {
      const updated = [newMessage, ...prev];
      return updated.slice(0, maxMessages);
    });
  };

  const handleLedgerMessage = (ledger: any) => {
    addMessage("ledger", ledger);
  };

  const handleTransactionMessage = (tx: any) => {
    addMessage("transaction", tx);
  };

  const handleValidationMessage = (validation: any) => {
    addMessage("validation", validation);
  };

  const handleConsensusMessage = (consensus: any) => {
    addMessage("consensus", consensus);
  };

  const handlePeerStatusMessage = (status: any) => {
    addMessage("peerStatus", status);
  };

  const handleBookChangesMessage = (changes: any) => {
    addMessage("bookChanges", changes);
  };

  const handleStreamToggle = async (stream: StreamType) => {
    try {
      if (selectedStreams.includes(stream)) {
        await wsManager.unsubscribe({ streams: [stream] });
        setSelectedStreams(prev => prev.filter(s => s !== stream));
        toast.success(`Unsubscribed from ${stream}`);
      } else {
        await wsManager.subscribe({ streams: [stream] });
        setSelectedStreams(prev => [...prev, stream]);
        toast.success(`Subscribed to ${stream}`);
      }
    } catch (error: any) {
      toast.error(`Stream toggle failed: ${error.message}`);
    }
  };

  const handleAddAccount = async () => {
    if (!accountToWatch.trim()) {
      toast.error("Please enter an account address");
      return;
    }

    try {
      await wsManager.subscribe({ accounts: [accountToWatch] });
      setWatchedAccounts(prev => [...prev, accountToWatch]);
      setAccountToWatch("");
      toast.success(`Watching account: ${accountToWatch}`);
    } catch (error: any) {
      toast.error(`Failed to watch account: ${error.message}`);
    }
  };

  const handleRemoveAccount = async (account: string) => {
    try {
      await wsManager.unsubscribe({ accounts: [account] });
      setWatchedAccounts(prev => prev.filter(a => a !== account));
      toast.success(`Stopped watching: ${account}`);
    } catch (error: any) {
      toast.error(`Failed to remove account: ${error.message}`);
    }
  };

  const handleAddBook = async () => {
    if (!bookTakerGetsCurrency || !bookTakerPaysCurrency) {
      toast.error("Please specify both currencies");
      return;
    }

    const book: BookSubscription = {
      taker_gets: {
        currency: bookTakerGetsCurrency,
        ...(bookTakerGetsIssuer && { issuer: bookTakerGetsIssuer })
      },
      taker_pays: {
        currency: bookTakerPaysCurrency,
        ...(bookTakerPaysIssuer && { issuer: bookTakerPaysIssuer })
      },
      both: true,
      snapshot: true
    };

    try {
      await wsManager.subscribe({ books: [book] });
      setWatchedBooks(prev => [...prev, book]);
      toast.success("Subscribed to order book");
      
      // Reset form
      setBookTakerGetsCurrency("XRP");
      setBookTakerGetsIssuer("");
      setBookTakerPaysCurrency("USD");
      setBookTakerPaysIssuer("");
    } catch (error: any) {
      toast.error(`Failed to subscribe to book: ${error.message}`);
    }
  };

  const handleRemoveBook = async (index: number) => {
    const book = watchedBooks[index];
    try {
      await wsManager.unsubscribe({ books: [book] });
      setWatchedBooks(prev => prev.filter((_, i) => i !== index));
      toast.success("Unsubscribed from order book");
    } catch (error: any) {
      toast.error(`Failed to unsubscribe: ${error.message}`);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    toast.success("Messages cleared");
  };

  const availableStreams: StreamType[] = [
    "ledger",
    "transactions",
    "transactions_proposed",
    "validations",
    "consensus",
    "server",
    "book_changes"
  ];

  const getMessageColor = (type: string): string => {
    switch (type) {
      case "ledger": return "bg-blue-500";
      case "transaction": return "bg-green-500";
      case "validation": return "bg-purple-500";
      case "consensus": return "bg-yellow-500";
      case "peerStatus": return "bg-orange-500";
      case "bookChanges": return "bg-pink-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
      <CardHeader className="border-b-2 border-cyan-200 bg-gradient-to-r from-cyan-100 to-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-cyan-600" />
            <div>
              <CardTitle className="text-2xl text-cyan-900">Real-Time Monitor</CardTitle>
              <CardDescription className="text-cyan-700">
                WebSocket subscriptions for live XRPL data
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <Badge className="bg-green-500 flex items-center gap-1">
                <Wifi className="h-3 w-3" />
                Connected
              </Badge>
            ) : (
              <Badge variant="destructive" className="flex items-center gap-1">
                <WifiOff className="h-3 w-3" />
                Disconnected
              </Badge>
            )}
            <Button
              variant={isPaused ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={clearMessages}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs defaultValue="streams" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="streams">Streams</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="books">Order Books</TabsTrigger>
            <TabsTrigger value="messages">Messages ({messages.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="streams" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {availableStreams.map(stream => (
                <Button
                  key={stream}
                  variant={selectedStreams.includes(stream) ? "default" : "outline"}
                  onClick={() => handleStreamToggle(stream)}
                  className="justify-start"
                >
                  {stream}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <Label>Account Address</Label>
                <Input
                  value={accountToWatch}
                  onChange={(e) => setAccountToWatch(e.target.value)}
                  placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddAccount} className="w-full">
                  Watch Account
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Watched Accounts ({watchedAccounts.length})</Label>
              <div className="h-[200px] border overflow-y-auto rounded-md p-2">
                {watchedAccounts.map((account, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                    <span className="font-mono text-sm">{account}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAccount(account)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="books" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Taker Gets Currency</Label>
                <Input
                  value={bookTakerGetsCurrency}
                  onChange={(e) => setBookTakerGetsCurrency(e.target.value)}
                  placeholder="XRP or USD"
                />
              </div>
              <div>
                <Label>Taker Gets Issuer (optional)</Label>
                <Input
                  value={bookTakerGetsIssuer}
                  onChange={(e) => setBookTakerGetsIssuer(e.target.value)}
                  placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                />
              </div>
              <div>
                <Label>Taker Pays Currency</Label>
                <Input
                  value={bookTakerPaysCurrency}
                  onChange={(e) => setBookTakerPaysCurrency(e.target.value)}
                  placeholder="USD or EUR"
                />
              </div>
              <div>
                <Label>Taker Pays Issuer (optional)</Label>
                <Input
                  value={bookTakerPaysIssuer}
                  onChange={(e) => setBookTakerPaysIssuer(e.target.value)}
                  placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                />
              </div>
            </div>
            <Button onClick={handleAddBook} className="w-full">
              Subscribe to Order Book
            </Button>

            <div className="space-y-2">
              <Label>Subscribed Books ({watchedBooks.length})</Label>
              <div className="h-[150px] border overflow-y-auto rounded-md p-2">
                {watchedBooks.map((book, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                    <span className="text-sm">
                      {book.taker_gets.currency} → {book.taker_pays.currency}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveBook(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Max Messages: {maxMessages}</Label>
              <Input
                type="number"
                value={maxMessages}
                onChange={(e) => setMaxMessages(parseInt(e.target.value) || 100)}
                className="w-24"
                min="10"
                max="1000"
              />
            </div>

            <div className="h-[400px] border overflow-y-auto rounded-md p-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No messages yet. Subscribe to streams to see live data.
                </div>
              ) : (
                <div className="space-y-2">
                  {messages.map((msg) => (
                    <div key={msg.id} className="border rounded-lg p-3 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getMessageColor(msg.type)}>
                          {msg.type}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <pre className="text-xs overflow-x-auto bg-gray-50 p-2 rounded">
                        {JSON.stringify(msg.data, null, 2)}
                      </pre>
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RealtimeMonitor;

