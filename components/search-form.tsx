"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchFormProps {
  onSearch: (username: string) => Promise<void>;
  loading: boolean;
  error?: string;
}

export function SearchForm({ onSearch, loading, error }: SearchFormProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) onSearch(username);
  };

  return (
    <div className="max-w-xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button type="submit" disabled={loading || !username}>
          {loading ? (
            "Analyzing..."
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Analyze
            </>
          )}
        </Button>
      </form>
      {error && <p className="text-destructive mt-2 text-sm">{error}</p>}
    </div>
  );
}