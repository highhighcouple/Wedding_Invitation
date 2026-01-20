
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WeddingData, EffectStyle } from '../types';
import { saveWeddingData, getRSVPs, getGuestbook } from '../dataStore';

interface Props {
  data: WeddingData;
  onUpdate: (data: WeddingData) => void;
}

const Backend: React.FC<Props> = ({ data, onUpdate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  const rsvps = getRSVPs();
  const guestbook = getGuestbook();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === data.adminPassword) {
      setIsLoggedIn(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const handleSave = () => {
    saveWeddingData(data);
    alert("데이터가 저장되었습니다.");
  };

  const updateField = (path: string, value: any) => {
    const newData = { ...data };
    const keys = path.split('.');
    let current: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    onUpdate(newData);
  };

  const toggleSectionVisibility = (id: string) => {
    const newData = { ...data };
    const section = newData.sections.find(s => s.id === id);
    if (section) section.isVisible = !section.isVisible;
    onUpdate(newData);
  };

  const moveSection = (id: string, dir: 'up' | 'down') => {
    const newData = { ...data };
    const index = newData.sections.findIndex(s => s.id === id);
    if (index === -1) return;
    const newIndex = dir === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newData.sections.length) return;
    
    const temp = newData.sections[index];
    newData.sections[index] = newData.sections[newIndex];
    newData.sections[newIndex] = temp;
    
    // 순서 값 재조정
    newData.sections.forEach((s, i) => s.order = i);
    onUpdate(newData);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#1b2838] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#2a475e] p-8 rounded shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Wedding Admin Panel</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sky-400 text-xs font-bold uppercase mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#171a21] border border-transparent focus:border-sky-500 text-white p-3 rounded outline-none transition-all"
                placeholder="Enter admin password"
              />
            </div>
            <button className="w-full bg-gradient-to-r from-sky-600 to-sky-400 hover:from-sky-500 hover:to-sky-300 text-white font-bold py-3 rounded transition-all shadow-lg">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1b2838] flex flex-col">
      {/* Header */}
      <header className="bg-[#171a21] p-4 flex justify-between items-center border-b border-sky-900/30">
        <div className="flex items-center gap-4">
          <div className="text-sky-400 font-black text-xl tracking-tighter">WEDDING PROJECT v1.0</div>
          <div className="text-gray-500 text-xs">Status: <span className="text-green-500">READY TO PUBLISH</span></div>
        </div>
        <div className="flex gap-4">
          <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold px-6 py-2 rounded">SAVE CHANGES</button>
          <a href="/" className="bg-[#2a475e] hover:bg-[#3d6c8d] text-white text-xs font-bold px-6 py-2 rounded">LIVE PREVIEW</a>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-64 bg-[#171a21] p-4 space-y-2 overflow-y-auto">
          <div className="text-gray-600 text-[10px] font-bold uppercase mb-4 tracking-widest">Library Categories</div>
          {[
            { id: 'general', name: 'General Information', icon: '📝' },
            { id: 'visuals', name: 'Images & Visuals', icon: '🖼️' },
            { id: 'sections', name: 'Section Order', icon: '↕️' },
            { id: 'rsvp', name: 'RSVP List', icon: '👥' },
            { id: 'guestbook', name: 'Guestbook Management', icon: '💬' },
            { id: 'settings', name: 'System Settings', icon: '⚙️' }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left p-3 rounded text-sm transition-all flex items-center gap-3 ${activeTab === item.id ? 'bg-sky-600/20 text-sky-400 border-l-4 border-sky-400' : 'text-gray-400 hover:bg-[#2a475e] hover:text-white'}`}
            >
              <span>{item.icon}</span> {item.name}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-[#2a475e] to-[#1b2838]">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {activeTab === 'general' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <h2 className="text-3xl font-black text-white">General Information</h2>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4 bg-[#171a21] p-6 rounded">
                    <h3 className="text-sky-400 text-xs font-bold uppercase">Groom's Side</h3>
                    <input type="text" value={data.groom.name} onChange={e => updateField('groom.name', e.target.value)} className="w-full bg-[#2a475e] text-white p-2 rounded text-sm" placeholder="Groom Name" />
                    <input type="text" value={data.groom.father} onChange={e => updateField('groom.father', e.target.value)} className="w-full bg-[#2a475e] text-white p-2 rounded text-sm" placeholder="Father" />
                    <input type="text" value={data.groom.mother} onChange={e => updateField('groom.mother', e.target.value)} className="w-full bg-[#2a475e] text-white p-2 rounded text-sm" placeholder="Mother" />
                    <input type="text" value={data.groom.phone} onChange={e => updateField('groom.phone', e.target.value)} className="w-full bg-[#2a475e] text-white p-2 rounded text-sm" placeholder="Phone" />
                  </div>
                  <div className="space-y-4 bg-[#171a21] p-6 rounded">
                    <h3 className="text-sky-400 text-xs font-bold uppercase">Bride's Side</h3>
                    <input type="text" value={data.bride.name} onChange={e => updateField('bride.name', e.target.value)} className="w-full bg-[#2a475e] text-white p-2 rounded text-sm" placeholder="Bride Name" />
                    <input type="text" value={data.bride.father} onChange={e => updateField('bride.father', e.target.value)} className="w-full bg-[#2a475e] text-white p-2 rounded text-sm" placeholder="Father" />
                    <input type="text" value={data.bride.mother} onChange={e => updateField('bride.mother', e.target.value)} className="w-full bg-[#2a475e] text-white p-2 rounded text-sm" placeholder="Mother" />
                    <input type="text" value={data.bride.phone} onChange={e => updateField('bride.phone', e.target.value)} className="w-full bg-[#2a475e] text-white p-2 rounded text-sm" placeholder="Phone" />
                  </div>
                </div>
                <div className="bg-[#171a21] p-6 rounded space-y-4">
                  <h3 className="text-sky-400 text-xs font-bold uppercase">Wedding Content</h3>
                  <textarea value={data.mainText} onChange={e => updateField('mainText', e.target.value)} className="w-full h-40 bg-[#2a475e] text-white p-2 rounded text-sm" />
                </div>
              </motion.div>
            )}

            {activeTab === 'sections' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <h2 className="text-3xl font-black text-white">Section Management</h2>
                <div className="space-y-2">
                  {data.sections.map((section, idx) => (
                    <div key={section.id} className="flex items-center gap-4 bg-[#171a21] p-4 rounded group">
                      <div className="flex flex-col gap-1">
                        <button onClick={() => moveSection(section.id, 'up')} className="text-gray-500 hover:text-white disabled:opacity-0" disabled={idx === 0}>▲</button>
                        <button onClick={() => moveSection(section.id, 'down')} className="text-gray-500 hover:text-white disabled:opacity-0" disabled={idx === data.sections.length - 1}>▼</button>
                      </div>
                      <div className="flex-1">
                        <span className="text-white font-bold">{section.id.toUpperCase()}</span>
                        <span className="text-gray-500 text-xs ml-4">Order: {idx + 1}</span>
                      </div>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-xs text-gray-400">
                          <input type="checkbox" checked={section.isFolded} onChange={() => {
                            const newData = {...data};
                            const s = newData.sections.find(sec => sec.id === section.id);
                            if(s) s.isFolded = !s.isFolded;
                            onUpdate(newData);
                          }} /> Fold by Default
                        </label>
                        <button 
                          onClick={() => toggleSectionVisibility(section.id)}
                          className={`text-xs px-3 py-1 rounded font-bold ${section.isVisible ? 'bg-sky-600 text-white' : 'bg-red-900/40 text-red-500'}`}
                        >
                          {section.isVisible ? 'VISIBLE' : 'HIDDEN'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'rsvp' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <h2 className="text-3xl font-black text-white">RSVP List ({rsvps.length})</h2>
                <div className="overflow-hidden rounded bg-[#171a21]">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#2a475e] text-sky-400 font-bold">
                      <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Side</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Count</th>
                        <th className="p-4">Dining</th>
                        <th className="p-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="text-white divide-y divide-[#2a475e]">
                      {rsvps.map(r => (
                        <tr key={r.id} className="hover:bg-[#2a475e]/30">
                          <td className="p-4 font-bold">{r.name}</td>
                          <td className="p-4">{r.side === 'groom' ? '신랑측' : '신부측'}</td>
                          <td className="p-4">{r.phone}</td>
                          <td className="p-4">{r.count}명</td>
                          <td className="p-4">{r.willEat ? '예정' : '안함'}</td>
                          <td className="p-4 text-xs text-gray-500">{new Date(r.date).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 나머지 탭 생략 (구현 방식은 동일함) */}
            {activeTab === 'guestbook' && (
              <div className="text-center py-20 bg-[#171a21] rounded">
                <p className="text-gray-500">방명록 관리는 실시간 데이터베이스 연동 시 활성화됩니다.</p>
                <div className="mt-4 flex flex-col gap-2 max-w-md mx-auto">
                  {guestbook.map(g => (
                    <div key={g.id} className="text-left bg-[#2a475e] p-3 rounded text-white text-xs">
                      <span className="font-bold text-sky-400">{g.name}</span>: {g.content}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default Backend;
