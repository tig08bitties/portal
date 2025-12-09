'use client';

import { useState, useEffect } from 'react';
import { BridgeworldGame, Character, Dungeon, Item } from '@/lib/diablo2-game';

export default function Diablo2Game() {
  const [game] = useState(() => new BridgeworldGame());
  const [character, setCharacter] = useState<Character | null>(null);
  const [dungeon, setDungeon] = useState<Dungeon | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [combatLog, setCombatLog] = useState<string[]>([]);

  const createCharacter = (name: string, characterClass: any) => {
    const newChar = game.createCharacter(name, characterClass);
    setCharacter(newChar);
    const newDungeon = game.generateDungeon(1, 'normal');
    setDungeon(newDungeon);
    game.enterDungeon(newChar.id, newDungeon.id);
    addLog(`Character "${name}" created as ${characterClass}!`);
  };

  const enterDungeon = () => {
    if (!character) return;
    const newDungeon = game.generateDungeon(character.level, 'normal');
    setDungeon(newDungeon);
    game.enterDungeon(character.id, newDungeon.id);
    addLog(`Entered ${newDungeon.name} (Level ${newDungeon.level})`);
  };

  const fightMonster = () => {
    if (!character || !dungeon) return;
    const area = dungeon.areas[0];
    if (area.monsters.length === 0) {
      addLog('No monsters in this area!');
      return;
    }

    const monster = area.monsters[0];
    const result = game.combat(character.id, monster.id);

    addLog(`⚔️ Attacked ${monster.name}!`);
    addLog(`   Damage dealt: ${result.characterDamage}`);
    addLog(`   Damage taken: ${result.monsterDamage}`);

    if (result.monsterKilled) {
      addLog(`✨ ${monster.name} defeated! +${monster.experience} XP`);
      area.monsters.shift();
      setCharacter({ ...character });
      setDungeon({ ...dungeon });
    }

    if (result.characterDied) {
      addLog('💀 You died! Resurrecting...');
      character.stats.life = character.stats.vitality * 2 + 20;
      setCharacter({ ...character });
    }
  };

  const addLog = (message: string) => {
    setCombatLog(prev => [...prev.slice(-9), message]);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setShowGame(!showGame)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
      >
        <span>⚔️</span>
        <span>Diablo 2 LOD Game</span>
      </button>

      {showGame && (
        <div className="absolute bottom-full left-0 mb-2 w-[500px] bg-slate-900 border-2 border-red-500 rounded-lg p-4 shadow-2xl max-h-[700px] overflow-y-auto">
          <h3 className="text-xl font-bold text-red-300 mb-4">
            🎮 Bridgeworld - Diablo 2 LOD Style
          </h3>

          {!character ? (
            <div className="space-y-4">
              <p className="text-gray-300 mb-4">
                Create a character to begin your adventure!
              </p>
              <div className="grid grid-cols-2 gap-2">
                {['Legion', 'Assassin', 'Ranger', 'Spellcaster', 'Fighter', 'Riverman', 'Reaper'].map(cls => (
                  <button
                    key={cls}
                    onClick={() => createCharacter(`Hero_${Date.now()}`, cls)}
                    className="p-3 bg-slate-800 hover:bg-slate-700 rounded border border-red-500/30 text-white"
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Character Info */}
              <div className="bg-slate-800 p-3 rounded border border-red-500/30">
                <h4 className="font-semibold text-red-300 mb-2">{character.name}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Level: <span className="text-yellow-300">{character.level}</span></div>
                  <div>Class: <span className="text-blue-300">{character.class}</span></div>
                  <div>XP: <span className="text-green-300">{character.experience}</span></div>
                  <div>Life: <span className="text-red-300">{character.stats.life}</span></div>
                  <div>Mana: <span className="text-blue-300">{character.stats.mana}</span></div>
                  <div>STR: <span className="text-orange-300">{character.stats.strength}</span></div>
                  <div>DEX: <span className="text-green-300">{character.stats.dexterity}</span></div>
                  <div>VIT: <span className="text-red-300">{character.stats.vitality}</span></div>
                </div>
              </div>

              {/* Dungeon Info */}
              {dungeon && (
                <div className="bg-slate-800 p-3 rounded border border-purple-500/30">
                  <h4 className="font-semibold text-purple-300 mb-2">{dungeon.name}</h4>
                  <div className="text-sm text-gray-300">
                    <div>Level: {dungeon.level}</div>
                    <div>Difficulty: {dungeon.difficulty}</div>
                    <div>Areas: {dungeon.areas.length}</div>
                    {dungeon.areas[0] && (
                      <div>Monsters: {dungeon.areas[0].monsters.length}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={enterDungeon}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded"
                >
                  Enter Dungeon
                </button>
                <button
                  onClick={fightMonster}
                  disabled={!dungeon || !dungeon.areas[0]?.monsters.length}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded disabled:opacity-50"
                >
                  Fight Monster
                </button>
              </div>

              {/* Combat Log */}
              <div className="bg-black p-3 rounded border border-gray-700 h-48 overflow-y-auto">
                <div className="text-xs text-green-400 font-mono space-y-1">
                  {combatLog.length === 0 ? (
                    <div className="text-gray-500">Combat log will appear here...</div>
                  ) : (
                    combatLog.map((log, idx) => (
                      <div key={idx}>{log}</div>
                    ))
                  )}
                </div>
              </div>

              {/* Inventory */}
              {character.inventory.length > 0 && (
                <div className="bg-slate-800 p-3 rounded border border-yellow-500/30">
                  <h4 className="font-semibold text-yellow-300 mb-2">Inventory</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {character.inventory.slice(0, 8).map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-slate-700 rounded text-xs text-center border border-yellow-500/20"
                        title={item.name}
                      >
                        {item.type[0].toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setCharacter(null);
                  setDungeon(null);
                  setCombatLog([]);
                }}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
              >
                New Character
              </button>
            </div>
          )}

          <button
            onClick={() => setShowGame(false)}
            className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
