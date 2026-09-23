import React from 'react';
import { MapPin, Building2, ExternalLink, Users, ArrowUpRight } from 'lucide-react';
import { Listing } from '../../types';
import { STATE_CITIES } from '../../lib/constants';

interface AdminHubsTabProps {
  listings: Listing[];
  onFilterByCity: (city: string) => void;
}

export const AdminHubsTab: React.FC<AdminHubsTabProps> = ({
  listings,
  onFilterByCity,
}) => {
  const hubs = [
    { name: 'Kota', state: 'Rajasthan', description: 'Major coaching cluster for JEE & NEET aspirants', topAreas: 'Indraprastha, Vigyan Nagar, Talwandi, Landmark City' },
    { name: 'Patna', state: 'Bihar', description: 'Primary hub for BPSC, SSC, Railway & state entrance tests', topAreas: 'Boring Road, Kankarbagh, Bazar Samiti, Musallahpur' },
    { name: 'Delhi', state: 'Delhi NCR', description: 'UPSC Civil Services, SSC, DU college PG corridors', topAreas: 'Old Rajinder Nagar, Mukherjee Nagar, Laxmi Nagar, GTB Nagar' },
    { name: 'Sikar', state: 'Rajasthan', description: 'Rapidly emerging coaching capital for medical & defense', topAreas: 'Piprali Road, Nawalgarh Road, Palwas Road' },
    { name: 'Bengaluru', state: 'Karnataka', description: 'Engineering, coding bootcamps & tech coaching academies', topAreas: 'Koramangala, BTM Layout, HSR Layout, Marathahalli' },
    { name: 'Lucknow', state: 'Uttar Pradesh', description: 'UPPCS, Defence, Medical & Banking exam centers', topAreas: 'Aliganj, Gomti Nagar, Hazratganj, Kapoorthala' },
    { name: 'Prayagraj', state: 'Uttar Pradesh', description: 'Historic center for Judicial services, UPSC & State PCS', topAreas: 'Civil Lines, Katra, Salori, Teliyarganj' },
    { name: 'Jaipur', state: 'Rajasthan', description: 'Rajasthan Administrative Services, CA & Govt Exam hub', topAreas: 'Gopalpura Bypass, Tonk Phatak, Lal Kothi, Malviya Nagar' },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#00E5FF]" />
            Educational Hubs & Geographic Coverage
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Operational hubs where students search for PGs, libraries, and food services.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {hubs.map((hub) => {
          const cityListings = listings.filter(l => l.city?.toLowerCase() === hub.name.toLowerCase());
          const pgCount = cityListings.filter(l => l.category?.toLowerCase().includes('pg') || l.category?.toLowerCase().includes('hostel')).length;
          const messCount = cityListings.filter(l => l.category?.toLowerCase().includes('mess') || l.category?.toLowerCase().includes('tiffin')).length;
          const libCount = cityListings.filter(l => l.category?.toLowerCase().includes('library')).length;

          return (
            <div
              key={hub.name}
              className="p-5 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#00E5FF]/40 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-base font-extrabold text-white group-hover:text-[#00E5FF] transition-colors">
                      {hub.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 font-semibold">{hub.state}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                    {cityListings.length} Services
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {hub.description}
                </p>

                <div className="p-3 rounded-2xl bg-black/30 border border-white/5 space-y-1.5 text-[11px] mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">PGs & Hostels:</span>
                    <span className="text-white font-bold">{pgCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mess & Food:</span>
                    <span className="text-white font-bold">{messCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Study Libraries:</span>
                    <span className="text-white font-bold">{libCount}</span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-500 line-clamp-1">
                  Key areas: {hub.topAreas}
                </p>
              </div>

              <button
                onClick={() => onFilterByCity(hub.name)}
                className="mt-4 w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-[#00E5FF]/15 text-gray-300 hover:text-[#00E5FF] border border-white/10 hover:border-[#00E5FF]/30 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Filter Listings</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
