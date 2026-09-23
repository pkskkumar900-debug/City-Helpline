import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Building2, LogOut, PlusCircle, User, ShieldCheck, Search, Home, ShoppingBag, Calculator } from 'lucide-react';
import { LiquidButton } from '../ui/LiquidButton';
import { isSuperAdminEmail } from '../../types';

export function Navbar() {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;
  const isDefaultAdmin = isSuperAdminEmail(currentUser?.email);
  const isAdmin = userProfile?.role === 'admin' || isDefaultAdmin;

  return (
    <nav className="sticky top-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <div className="p-1.5 sm:p-2 rounded-xl bg-[rgba(255,255,255,0.06)] border border-white/10 group-hover:border-[#00E5FF]/50 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.1)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-[#00E5FF]" />
              </div>
              <span className="text-base sm:text-xl font-black text-white tracking-wide whitespace-nowrap">City Helpline</span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_12px_rgba(0,229,255,0.25)] select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                BETA
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-5">
            <Link
              to="/"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive('/') ? 'text-[#00E5FF]' : 'text-gray-400 hover:text-white'}`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/search"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive('/search') ? 'text-[#00E5FF]' : 'text-gray-400 hover:text-white'}`}
            >
              <Search className="h-4 w-4" />
              <span>Services</span>
            </Link>
            <Link
              to="/marketplace"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors relative ${isActive('/marketplace') ? 'text-[#00E5FF]' : 'text-gray-400 hover:text-white'}`}
            >
              <ShoppingBag className="h-4 w-4 text-[#00E5FF]" />
              <span>Marketplace</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-gradient-to-r from-rose-500 to-amber-500 text-white uppercase tracking-wider shadow-sm">
                New
              </span>
            </Link>
            <Link
              to="/budget"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive('/budget') || isActive('/budget-calculator') ? 'text-[#00E5FF]' : 'text-gray-400 hover:text-white'}`}
            >
              <Calculator className="h-4 w-4" />
              <span>Budget</span>
            </Link>

            {/* Always visible List Service button on Desktop */}
            <Link
              to="/add-listing"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-bold ${
                isActive('/add-listing')
                  ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                  : 'bg-white/[0.05] border-white/15 text-white hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/10'
              }`}
            >
              <PlusCircle className="h-4 w-4 text-[#00E5FF]" />
              <span>+ List Service</span>
            </Link>

            {currentUser ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => {
                      localStorage.setItem('admin_view_mode', 'admin');
                      window.dispatchEvent(new Event('admin_mode_change'));
                    }}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive('/admin') ? 'text-[#00E5FF]' : 'text-gray-400 hover:text-white'}`}
                  >
                    <ShieldCheck className="h-5 w-5" />
                    <span className="hidden sm:inline">Admin Console</span>
                  </Link>
                )}

                <div className="flex items-center gap-3 ml-2 pl-6 border-l border-white/10">
                  <Link to="/profile" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline font-medium">{userProfile?.name || 'Profile'}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-[#FF3B3B] transition-colors rounded-full hover:bg-[rgba(255,255,255,0.06)]"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="golden-wrapper">
                  <Link
                    to="/login"
                    className="golden-button flex items-center justify-center"
                  >
                    LOGIN
                  </Link>
                </div>
                <div className="golden-wrapper">
                  <Link
                    to="/signup"
                    className="golden-button flex items-center justify-center"
                  >
                    SIGN UP
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Right Action */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/add-listing"
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-black rounded-xl bg-gradient-to-r from-[#00E5FF]/20 to-[#8A2BE2]/20 border border-[#00E5FF]/40 text-[#00E5FF] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_10px_rgba(0,229,255,0.2)]"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>+ List</span>
            </Link>

            {currentUser ? (
              <Link 
                to="/profile" 
                className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-[#00E5FF]/40 transition-colors"
                title="Profile"
              >
                <User className="h-5 w-5 text-[#00E5FF]" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-[rgba(255,255,255,0.06)] border border-white/10 text-white hover:border-[#00E5FF]/40 transition-colors"
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
