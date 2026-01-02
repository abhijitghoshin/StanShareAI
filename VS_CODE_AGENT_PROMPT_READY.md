╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║         READY FOR VS CODE AGENT - FUND TABLE IMPLEMENTATION                  ║
║                                                                               ║
║  Complete code for: https://github.com/abhijitghoshin/StanShareAIData        ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝


═══════════════════════════════════════════════════════════════════════════════
PASTE THIS TO YOUR VS CODE AGENT (Claude, Copilot, etc)
═══════════════════════════════════════════════════════════════════════════════

"I need to create a fund database page for my React app. This should display 
all funds from my Supabase 'funds_sec' table with the following columns:

Fund Name, Fund ID, Share Class, Country, Currency, CUSIP, ISIN, Ticker, 
SEDOL, AUM, Manager, Fund Type

Features:
- Search by fund name, ID, manager, country, currency, or any identifier
- Pagination (20 funds per page)
- Click to copy identifiers (CUSIP, ISIN, Ticker, SEDOL)
- Country with emoji icon
- Currency in highlighted badge
- Dark Starlink-inspired design (blue/cyan theme)
- Starlink animated background
- Responsive table with horizontal scrolling

Here is the complete component code:

---START CODE---

import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { logoutUser } from '../services/firebase';
import { supabase } from '../services/supabase';
import { LogOut, Database, RefreshCw, AlertCircle, Search, ChevronLeft, ChevronRight, Copy, Check, Globe, DollarSign } from 'lucide-react';

interface Fund {
  id: string;
  fund_name: string;
  stanshare_fundid: string;
  stanshare_shareclass: string;
  cusip: string;
  isin: string;
  ticker: string;
  sedol: string;
  currency_name: string;
  country_name: string;
  funds_under_management: number;
  asset_manager_name: string;
  fund_type: string;
}

export function DataManagementFundTable() {
  const { user } = useAuth();
  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  useEffect(() => {
    fetchFunds();
  }, [currentPage, searchTerm]);

  const fetchFunds = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('funds_sec')
        .select(
          'id, fund_name, stanshare_fundid, stanshare_shareclass, cusip, isin, ticker, sedol, currency_name, country_name, funds_under_management, asset_manager_name, fund_type',
          { count: 'exact' }
        );

      if (searchTerm.trim()) {
        query = query.or(
          \`fund_name.ilike.%\${searchTerm}%,stanshare_fundid.ilike.%\${searchTerm}%,asset_manager_name.ilike.%\${searchTerm}%,cusip.ilike.%\${searchTerm}%,isin.ilike.%\${searchTerm}%,ticker.ilike.%\${searchTerm}%,currency_name.ilike.%\${searchTerm}%,country_name.ilike.%\${searchTerm}%\`
        );
      }

      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, error: supabaseError, count } = await query.range(from, to);

      if (supabaseError) {
        setError(supabaseError.message);
        setFunds([]);
      } else {
        setFunds(data || []);
        setTotalCount(count || 0);
      }
    } catch (err) {
      console.error('Error fetching funds:', err);
      setError('Failed to fetch funds');
      setFunds([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCurrentPage(1);
    await fetchFunds();
    setSyncing(false);
  };

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = '/login';
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
      {/* Animated background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-800 backdrop-blur-md bg-slate-950/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-75"></div>
                    <div className="relative bg-slate-950 rounded-lg p-2">
                      <Database className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                  <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Fund Data
                  </h1>
                </div>
                <p className="text-slate-400 text-sm font-light tracking-wide">
                  Complete fund database with identifiers, countries & currencies • {totalCount.toLocaleString()} total records
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefresh}
                  disabled={syncing}
                  className="group relative px-6 py-3 font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-slate-900 rounded-lg px-6 py-2 flex items-center gap-2 group-hover:bg-slate-800/50 transition">
                    <RefreshCw className={`w-4 h-4 \${syncing ? 'animate-spin' : ''}`} />
                    <span className="text-sm">{syncing ? 'Syncing' : 'Refresh'}</span>
                  </div>
                </button>

                <button
                  onClick={handleLogout}
                  className="group relative px-6 py-3 font-semibold text-white transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-slate-900 rounded-lg px-6 py-2 flex items-center gap-2 group-hover:bg-slate-800/50 transition">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {error ? (
            <div className="bg-gradient-to-br from-red-950/50 to-red-900/20 border border-red-800/50 rounded-xl p-12 text-center backdrop-blur">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-red-100 mb-3">Error</h2>
              <p className="text-red-300 mb-8">{error}</p>
              <button
                onClick={handleRefresh}
                className="group relative px-8 py-3 font-semibold text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-slate-900 rounded-lg px-8 py-2 group-hover:bg-slate-800/50 transition">
                  Try Again
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>

                <div className="relative bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur border border-slate-800 rounded-xl p-6 group-hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-center gap-3 bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 focus-within:border-cyan-500 transition-colors">
                    <Search className="w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search by fund name, ID, manager, country, currency, CUSIP, ISIN, or Ticker..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full bg-transparent outline-none text-white placeholder-slate-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur border border-slate-800 rounded-xl overflow-hidden">
                  <div className="px-8 py-6 border-b border-slate-800 bg-slate-950/50">
                    <h2 className="text-2xl font-bold text-white mb-1">Fund Database</h2>
                    <p className="text-slate-400 text-sm">
                      Showing {funds.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount.toLocaleString()} funds
                    </p>
                  </div>

                  {loading ? (
                    <div className="flex items-center justify-center py-24">
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-75 blur animate-pulse"></div>
                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-blue-400 animate-spin"></div>
                      </div>
                    </div>
                  ) : funds.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <p className="text-sm">No funds found. Try adjusting your search.</p>
                    </div>
                  ) : (
                    <>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-950/50 border-b border-slate-800 sticky top-0">
                            <tr>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Fund Name</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Fund ID</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Share Class</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                                <div className="flex items-center gap-1">
                                  <Globe className="w-4 h-4" />
                                  Country
                                </div>
                              </th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  Currency
                                </div>
                              </th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">CUSIP</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">ISIN</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Ticker</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">SEDOL</th>
                              <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">AUM</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Manager</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Type</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800">
                            {funds.map((fund) => (
                              <tr
                                key={fund.id}
                                className="hover:bg-slate-900/50 transition-colors"
                              >
                                <td className="px-6 py-4">
                                  <p className="font-bold text-white text-sm">{fund.fund_name}</p>
                                </td>
                                <td className="px-6 py-4">
                                  <p className="text-cyan-300 text-sm font-mono">{fund.stanshare_fundid}</p>
                                </td>
                                <td className="px-6 py-4">
                                  <p className="text-slate-300 text-sm">{fund.stanshare_shareclass || '-'}</p>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl">🌍</span>
                                    <span className="text-slate-300 text-sm font-medium">{fund.country_name || '-'}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-lg px-3 py-2 inline-block">
                                    <p className="text-cyan-300 text-sm font-bold">{fund.currency_name || '-'}</p>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  {fund.cusip ? (
                                    <button
                                      onClick={() => copyToClipboard(fund.cusip, \`cusip-\${fund.id}\`)}
                                      className="group/copy flex items-center gap-2 text-cyan-300 text-sm hover:text-cyan-200 transition-colors"
                                      title="Click to copy"
                                    >
                                      <span className="font-mono">{fund.cusip}</span>
                                      {copiedId === \`cusip-\${fund.id}\` ? (
                                        <Check className="w-4 h-4 text-green-400" />
                                      ) : (
                                        <Copy className="w-4 h-4 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                                      )}
                                    </button>
                                  ) : (
                                    <p className="text-slate-500 text-sm">-</p>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  {fund.isin ? (
                                    <button
                                      onClick={() => copyToClipboard(fund.isin, \`isin-\${fund.id}\`)}
                                      className="group/copy flex items-center gap-2 text-cyan-300 text-sm hover:text-cyan-200 transition-colors"
                                      title="Click to copy"
                                    >
                                      <span className="font-mono">{fund.isin}</span>
                                      {copiedId === \`isin-\${fund.id}\` ? (
                                        <Check className="w-4 h-4 text-green-400" />
                                      ) : (
                                        <Copy className="w-4 h-4 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                                      )}
                                    </button>
                                  ) : (
                                    <p className="text-slate-500 text-sm">-</p>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  {fund.ticker ? (
                                    <button
                                      onClick={() => copyToClipboard(fund.ticker, \`ticker-\${fund.id}\`)}
                                      className="group/copy flex items-center gap-2 text-cyan-300 text-sm hover:text-cyan-200 transition-colors"
                                      title="Click to copy"
                                    >
                                      <span className="font-mono font-bold">{fund.ticker}</span>
                                      {copiedId === \`ticker-\${fund.id}\` ? (
                                        <Check className="w-4 h-4 text-green-400" />
                                      ) : (
                                        <Copy className="w-4 h-4 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                                      )}
                                    </button>
                                  ) : (
                                    <p className="text-slate-500 text-sm">-</p>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  {fund.sedol ? (
                                    <button
                                      onClick={() => copyToClipboard(fund.sedol, \`sedol-\${fund.id}\`)}
                                      className="group/copy flex items-center gap-2 text-cyan-300 text-sm hover:text-cyan-200 transition-colors"
                                      title="Click to copy"
                                    >
                                      <span className="font-mono">{fund.sedol}</span>
                                      {copiedId === \`sedol-\${fund.id}\` ? (
                                        <Check className="w-4 h-4 text-green-400" />
                                      ) : (
                                        <Copy className="w-4 h-4 opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                                      )}
                                    </button>
                                  ) : (
                                    <p className="text-slate-500 text-sm">-</p>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <p className="text-cyan-300 text-sm font-bold">
                                    {fund.funds_under_management 
                                      ? \`$\${(fund.funds_under_management / 1e9).toFixed(2)}B\`
                                      : '-'}
                                  </p>
                                </td>
                                <td className="px-6 py-4">
                                  <p className="text-slate-300 text-sm">{fund.asset_manager_name || '-'}</p>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 whitespace-nowrap">
                                    {fund.fund_type || '-'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="px-8 py-6 border-t border-slate-800 bg-slate-950/50 flex justify-between items-center">
                        <p className="text-sm text-slate-400">
                          Page <span className="text-cyan-300 font-bold">{currentPage}</span> of <span className="text-cyan-300 font-bold">{totalPages}</span>
                        </p>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="group relative px-4 py-2 font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0"></div>
                            <div className="relative bg-slate-800 rounded-lg px-4 py-2 flex items-center gap-2 group-hover:bg-slate-700 transition text-sm">
                              <ChevronLeft className="w-4 h-4" />
                              Previous
                            </div>
                          </button>

                          <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="group relative px-4 py-2 font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-0"></div>
                            <div className="relative bg-slate-800 rounded-lg px-4 py-2 flex items-center gap-2 group-hover:bg-slate-700 transition text-sm">
                              Next
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-xl blur-lg opacity-50"></div>
                <div className="relative bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    💡 <span className="text-cyan-300">Tips:</span> 
                    <br/>• Click on CUSIP, ISIN, Ticker, or SEDOL to copy them
                    <br/>• Search by country name or currency code
                    <br/>• Country & Currency columns positioned early for easy viewing
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Connected as: <span className="text-cyan-300 font-medium">{user?.email}</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

---END CODE---

Please:
1. Create the file: src/pages/DataManagementFundTable.tsx
2. Paste this exact code
3. Update src/App.tsx to import and add the route
4. Test at /fund-data-table endpoint"

═══════════════════════════════════════════════════════════════════════════════
THEN PASTE THIS FOR APP.TSX UPDATES
═══════════════════════════════════════════════════════════════════════════════

"Now update my App.tsx file:

1. Add this import at the top:
   import { DataManagementFundTable } from './pages/DataManagementFundTable';

2. Add this route in the <Routes> section (inside ProtectedRoute):
   <Route
     path="/fund-data-table"
     element={
       <ProtectedRoute>
         <DataManagementFundTable />
       </ProtectedRoute>
     }
   />"

═══════════════════════════════════════════════════════════════════════════════
THEN PASTE THIS FOR NAVIGATION UPDATES
═══════════════════════════════════════════════════════════════════════════════

"Finally, add this link to my Header/Navigation component:

<Link 
  to="/fund-data-table" 
  className="px-4 py-2 text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium"
>
  Funds
</Link>

Make sure this is imported from react-router-dom:
import { Link } from 'react-router-dom';"

═══════════════════════════════════════════════════════════════════════════════
GITHUB REPOSITORY INFO
═══════════════════════════════════════════════════════════════════════════════

GitHub Repo: https://github.com/abhijitghoshin/StanShareAIData

The new page will be at:
https://yoursite.com/fund-data-table (local: localhost:3000/fund-data-table)

File locations in your repo:
- src/pages/DataManagementFundTable.tsx (NEW FILE)
- src/App.tsx (UPDATE: Add import + route)
- src/components/Header.tsx (UPDATE: Add navigation link)

═══════════════════════════════════════════════════════════════════════════════
WHAT YOU'RE GETTING
═══════════════════════════════════════════════════════════════════════════════

✅ Complete fund database page
✅ All columns: Name, ID, Class, Country, Currency, CUSIP, ISIN, Ticker, SEDOL, AUM, Manager, Type
✅ Search functionality (by any field)
✅ Pagination (20 per page)
✅ Click-to-copy identifiers
✅ Dark Starlink-inspired design
✅ Animated background
✅ Real Supabase data
✅ TypeScript support
✅ Responsive design

═══════════════════════════════════════════════════════════════════════════════
