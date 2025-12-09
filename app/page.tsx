'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import PortalExperience from '@/components/PortalExperience';
import KeyMapOverlay from '@/components/KeyMapOverlay';
import CovenantGlass from '@/components/CovenantGlass';
import TreasureInfo from '@/components/TreasureInfo';
import MagicTimeInfo from '@/components/MagicTimeInfo';
import Diablo2Game from '@/components/Diablo2Game';
import WaybackSearch from '@/components/WaybackSearch';
import JumperBridge from '@/components/JumperBridge';
import MetaMaskWallet from '@/components/MetaMaskWallet';
import GuardianBots from '@/components/GuardianBots';
import TelegramBot from '@/components/TelegramBot';
import SiteStatus from '@/components/SiteStatus';
import BridgeworldDevlogs from '@/components/BridgeworldDevlogs';
import CovenantAddresses from '@/components/CovenantAddresses';
import { CovenantIntegration } from '@/components/covenant-integration';
import Chainlist from '@/components/Chainlist';
import BytecodeDB from '@/components/BytecodeDB';
import Chainscout from '@/components/Chainscout';
import Chainlink from '@/components/Chainlink';
import TreasureAgent from '@/components/TreasureAgent';
import TreasureBridge from '@/components/TreasureBridge';
import TreasureProject from '@/components/TreasureProject';
import MagicEden from '@/components/MagicEden';
import OpenSea from '@/components/OpenSea';
import AIIO from '@/components/AIIO';
import Scattering from '@/components/Scattering';
import Blockscout from '@/components/Blockscout';
import DeBank from '@/components/DeBank';
import MetaMaskApp from '@/components/MetaMaskApp';
import Tenderly from '@/components/Tenderly';

export default function Home() {
  const [portalActive, setPortalActive] = useState(false);
  const [keyPosition, setKeyPosition] = useState({ x: 0, y: 0 });
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [piecesAligned, setPiecesAligned] = useState(false);
  const [isDragging, setIsDragging] = useState<'key' | 'map' | null>(null);
  const keyRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if pieces are aligned based on their screen positions
    const checkAlignment = () => {
      if (!keyRef.current || !mapRef.current) return;
      
      const keyRect = keyRef.current.getBoundingClientRect();
      const mapRect = mapRef.current.getBoundingClientRect();
      
      // Calculate centers
      const keyCenterX = keyRect.left + keyRect.width / 2;
      const keyCenterY = keyRect.top + keyRect.height / 2;
      const mapCenterX = mapRect.left + mapRect.width / 2;
      const mapCenterY = mapRect.top + mapRect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(keyCenterX - mapCenterX, 2) + 
        Math.pow(keyCenterY - mapCenterY, 2)
      );
      
      // If pieces are within 200px of each other, consider them aligned
      if (distance < 200 && !piecesAligned) {
        setPiecesAligned(true);
        setPortalActive(true);
      } else if (distance >= 200 && piecesAligned) {
        setPiecesAligned(false);
        setPortalActive(false);
      }
    };

    const interval = setInterval(checkAlignment, 100);
    return () => clearInterval(interval);
  }, [keyPosition, mapPosition, piecesAligned]);

  const handleMouseDown = (piece: 'key' | 'map', e: React.MouseEvent) => {
    if (piecesAligned) return;
    e.preventDefault();
    setIsDragging(piece);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || piecesAligned) return;
      
      const container = document.querySelector('.interactive-area');
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 4;
      const y = e.clientY - rect.top - rect.height / 4;
      
      if (isDragging === 'key') {
        setKeyPosition({ x, y });
      } else {
        setMapPosition({ x, y });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, piecesAligned]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Bridgeworld
          </h1>
          <p className="text-xl text-gray-300 mb-2">The Atlas Mines</p>
          <p className="text-sm text-gray-400">
            Align the Key and Map to unlock the portal
          </p>
        </header>

        <div className="relative w-full max-w-6xl mx-auto">
          {/* Atlas Mines Background */}
          <div className="relative w-full aspect-[3/2] mb-8 rounded-lg overflow-hidden border-2 border-purple-500/30">
            <Image
              src="/Atlas.png"
              alt="Atlas Mines"
              fill
              className="object-cover"
              priority
            />
            {portalActive && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="portal-ring w-64 h-64"></div>
                <div className="portal-ring w-96 h-96" style={{ animationDelay: '0.5s' }}></div>
                <div className="portal-ring w-[28rem] h-[28rem]" style={{ animationDelay: '1s' }}></div>
              </div>
            )}
          </div>

          {/* Interactive Area */}
          <div className="interactive-area relative min-h-[600px] mb-8">
            {/* Key Component */}
            <div 
              ref={keyRef}
              className={`absolute w-64 h-64 cursor-move border-2 border-blue-500/50 rounded-lg overflow-hidden bg-slate-800/80 z-10 ${
                piecesAligned ? 'pointer-events-none' : ''
              }`}
              style={{
                left: `calc(25% + ${keyPosition.x}px)`,
                top: `calc(25% + ${keyPosition.y}px)`,
                transform: piecesAligned ? 'scale(1.1)' : 'scale(1)',
                transition: piecesAligned ? 'all 0.5s ease-out' : 'none',
              }}
              onMouseDown={(e) => handleMouseDown('key', e)}
            >
              <Image
                src="/Key.png"
                alt="Key"
                fill
                className={`object-contain ${piecesAligned ? 'animate-key-rotate' : ''}`}
                draggable={false}
              />
              {piecesAligned && (
                <div className="absolute inset-0 bg-blue-500/20 animate-portal-glow"></div>
              )}
            </div>

            {/* Map Component */}
            <div 
              ref={mapRef}
              className={`absolute w-64 h-96 cursor-move border-2 border-purple-500/50 rounded-lg overflow-hidden bg-slate-800/80 z-10 ${
                piecesAligned ? 'pointer-events-none' : ''
              }`}
              style={{
                left: `calc(75% + ${mapPosition.x}px)`,
                top: `calc(25% + ${mapPosition.y}px)`,
                transform: piecesAligned ? 'scale(1.1)' : 'scale(1)',
                transition: piecesAligned ? 'all 0.5s ease-out' : 'none',
              }}
              onMouseDown={(e) => handleMouseDown('map', e)}
            >
              <Image
                src="/Map.png"
                alt="Map"
                fill
                className="object-contain"
                draggable={false}
              />
              {piecesAligned && (
                <div className="absolute inset-0 bg-purple-500/20 animate-portal-glow"></div>
              )}
            </div>

            {/* Labels */}
            <div className="absolute top-0 left-1/4 transform -translate-x-1/2 text-center">
              <h2 className="text-xl font-semibold text-blue-300">The Key</h2>
            </div>
            <div className="absolute top-0 right-1/4 transform translate-x-1/2 text-center">
              <h2 className="text-xl font-semibold text-purple-300">The Map</h2>
            </div>
          </div>

          {/* Coordinate Overlay Component */}
          <KeyMapOverlay active={piecesAligned} />

          {/* Portal Experience */}
          {portalActive && <PortalExperience />}

          {/* Instructions */}
          <div className="mt-8 p-6 bg-slate-800/50 rounded-lg border border-purple-500/30">
            <h3 className="text-xl font-semibold mb-3 text-purple-300">Lore & Current State</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Deep within the Atlas Mines, ancient energies await activation. The Key and Map,
              when brought together in harmony, reveal a portal to realms unknown. The coordinates
              encoded within these artifacts hold the secret to unlocking the gateway. When the
              pieces align, the portal awakens, pulsing with magical energy that bridges worlds.
            </p>
            <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded">
              <p className="text-sm text-yellow-200 mb-2">
                <strong>Note:</strong> The Atlas Mine was discontinued in April 2025 as part of TreasureDAO's restructuring.
                This portal represents the legacy and lore of Bridgeworld. Current TreasureDAO products:
              </p>
              <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                <li><a href="https://trove.treasure.lol" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Trove Marketplace</a> - NFT marketplace</li>
                <li><a href="https://bridgeworld.treasure.lol" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Bridgeworld</a> - Flagship game with Canopy</li>
                <li><a href="https://treasure.lol" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Smolworld & AI Agents</a> - AI agent technology</li>
              </ul>
            </div>
            <div className="mt-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded">
              <h4 className="text-sm font-semibold text-purple-300 mb-2">⏰ MAGIC & Time Machine Connection</h4>
              <p className="text-xs text-gray-300 mb-2">
                MAGIC is the "substance of the metaverse" - growth in MAGIC liquidity creates "time shifts" 
                that unlock new time periods. The portal represents a temporal gateway where MAGIC flows through 
                sacred coordinates (the 22 Hebrew Paths), connecting past, present, and future.
              </p>
              <p className="text-xs text-purple-200 mt-2">
                <strong>Time Shift:</strong> When Key and Map align, MAGIC energy flows through the covenant constants 
                (419, 369, 1798, 687, 22), creating a temporal bridge between the legacy Atlas Mine and the current 
                AI-driven ecosystem.
              </p>
            </div>
            {!piecesAligned && (
              <p className="mt-4 text-yellow-300 text-sm">
                💡 Click and drag the Key and Map to align them and unlock the portal
              </p>
            )}
            {piecesAligned && (
              <p className="mt-4 text-green-300 text-sm font-semibold animate-pulse">
                ✨ Portal Activated! The gateway to Bridgeworld is open!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Covenant Looking Glass */}
      <CovenantGlass />

      {/* TreasureDAO Info */}
      <TreasureInfo />

      {/* MAGIC & Time Info */}
      <MagicTimeInfo />

      {/* Diablo 2 LOD Style Game */}
      <Diablo2Game />

      {/* Wayback Machine Search */}
      <WaybackSearch />

      {/* Jumper Exchange Bridge */}
      <JumperBridge />

      {/* MetaMask Wallet */}
      <MetaMaskWallet />

      {/* 22 Guardian Bots */}
      <GuardianBots />

      {/* Telegram Bot */}
      <TelegramBot />

      {/* Site Status Check */}
      <SiteStatus />

      {/* Bridgeworld Devlogs */}
      <BridgeworldDevlogs />

      {/* Covenant Addresses */}
      <CovenantAddresses />

      {/* Complete Covenant Integration */}
      <CovenantIntegration />

      {/* Chainlist Integration */}
      <Chainlist />

      {/* Bytecode Database Integration */}
      <BytecodeDB />

      {/* Chainscout Integration */}
      <Chainscout />

      {/* Chainlink Integration */}
      <Chainlink />

      {/* TreasureDAO AI Agent */}
      <TreasureAgent />

      {/* Treasure Bridge */}
      <TreasureBridge />

      {/* TreasureProject GitHub */}
      <TreasureProject />

      {/* Magic Eden - Smol Brains */}
      <MagicEden />

      {/* OpenSea Integration */}
      <OpenSea />

      {/* AI.io Integration */}
      <AIIO />

      {/* Scattering.io Integration */}
      <Scattering />

      {/* Blockscout Explorer */}
      <Blockscout />

      {/* DeBank Portfolio */}
      <DeBank />

      {/* MetaMask App */}
      <MetaMaskApp />

      {/* Tenderly Explorer */}
      <Tenderly />
    </main>
  );
}
