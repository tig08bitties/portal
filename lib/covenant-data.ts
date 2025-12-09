/**
 * Complete Covenant Data Integration
 * Consolidated from /home/tig0_0bitties/covenant directory
 */

export interface Guardian {
  path: number;
  hebrew: string;
  hebrewLetter: string;
  gematria: number;
  address: string;
  bip44Path: string;
  isRegistered: boolean;
  bridgeworldMapping: string;
  questMultiplier?: number; // 419x (THEOS)
  harvesterBoost?: number; // 369x (EL)
}

export interface CovenantConstants {
  theos: number; // 419 - Quest multiplier
  el: number; // 369 - Harvester boost
  torahPages: number; // 1798 - Quest completion milestone
  resonance: number; // 687 Hz - Quest duration, mining frequency
  hebrewPaths: number; // 22 - Total guardians
}

export interface CovenantAddress {
  address: string;
  chain: 'ethereum' | 'polygon' | 'arbitrum';
  chainId: string;
  name: string;
  official: boolean;
  immutable: boolean;
}

export interface OracleContract {
  address: string;
  network: 'arbitrum';
  chainId: number;
  explorer: string;
  deployer: string;
  block: number;
}

export interface CovenantIntegration {
  constants: CovenantConstants;
  oracle: OracleContract;
  guardians: Guardian[];
  covenantAddresses: CovenantAddress[];
  gameMechanics: {
    questMultipliersActive: boolean;
    harvesterBoostsActive: boolean;
    guardiansRegistered: number;
    totalGuardians: number;
  };
  bridgeworldContracts: {
    magicToken: string;
    legionsContract: string;
    legionsGenesis: string;
    treasuresContract: string;
  };
}

/**
 * Complete Covenant Data
 * Source: /home/tig0_0bitties/covenant/bridgeworld_deployment_full/
 */
export const COVENANT_DATA: CovenantIntegration = {
  constants: {
    theos: 419,
    el: 369,
    torahPages: 1798,
    resonance: 687,
    hebrewPaths: 22,
  },

  oracle: {
    address: '0xfa05997C66437dCCAe860af334b30d69E0De24DC',
    network: 'arbitrum',
    chainId: 42161,
    explorer: 'https://arbiscan.io/address/0xfa05997C66437dCCAe860af334b30d69E0De24DC',
    deployer: '0x3BBa654A3816A228284E3e0401Cff4EA6dFc5cea',
    block: 400276786,
  },

  guardians: [
    {
      path: 1,
      hebrew: 'Aleph',
      hebrewLetter: 'א',
      gematria: 1,
      address: '0xB3dAD41d61FC5B978F182438044C470CdAa5D0E0',
      bip44Path: "m/44'/60'/0'/0/1",
      isRegistered: true,
      bridgeworldMapping: 'Genesis Legion',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 2,
      hebrew: 'Bet',
      hebrewLetter: 'ב',
      gematria: 2,
      address: '0xc2F2e839e6dD776060C5b6664A001B8Acf8Db0e1',
      bip44Path: "m/44'/60'/0'/0/2",
      isRegistered: true,
      bridgeworldMapping: 'Auxiliary Legion',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 3,
      hebrew: 'Gimel',
      hebrewLetter: 'ג',
      gematria: 3,
      address: '0x6bb55E90ef32f9F736147b78C5E3581440a3cA0D',
      bip44Path: "m/44'/60'/0'/0/3",
      isRegistered: true,
      bridgeworldMapping: 'Auxiliary Legion',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 4,
      hebrew: 'Dalet',
      hebrewLetter: 'ד',
      gematria: 4,
      address: '0x4cf60c8Fdf04D7eE09DA41DB296F283fEbdF1CaB',
      bip44Path: "m/44'/60'/0'/0/4",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Recruit Legion',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 5,
      hebrew: 'He',
      hebrewLetter: 'ה',
      gematria: 5,
      address: '0x0d36EbBf7A9e8Bb5342E9d498306b44b30F4e66a',
      bip44Path: "m/44'/60'/0'/0/5",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Spellcaster',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 6,
      hebrew: 'Vav',
      hebrewLetter: 'ו',
      gematria: 6,
      address: '0x791Ef9Fe3a4195Dd11ff8cCd7b76FE5036f3504d',
      bip44Path: "m/44'/60'/0'/0/6",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Ranger',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 7,
      hebrew: 'Zayin',
      hebrewLetter: 'ז',
      gematria: 7,
      address: '0x91D45Dc85Cb1E0B078aeE2055b3413B7E384e0E2',
      bip44Path: "m/44'/60'/0'/0/7",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Assassin',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 8,
      hebrew: 'Het',
      hebrewLetter: 'ח',
      gematria: 8,
      address: '0xb51ec3D2903BE84B4D041139Da2609Ead1383E06',
      bip44Path: "m/44'/60'/0'/0/8",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Siege',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 9,
      hebrew: 'Tet',
      hebrewLetter: 'ט',
      gematria: 9,
      address: '0x6656B629B4eA27Ee7142436c0657a2E4c251CE69',
      bip44Path: "m/44'/60'/0'/0/9",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Fighter',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 10,
      hebrew: 'Yod',
      hebrewLetter: 'י',
      gematria: 10,
      address: '0x483D4dB32124Ed6F9e05EC64b5AE51aD77EF885e',
      bip44Path: "m/44'/60'/0'/0/10",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Riverman',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 11,
      hebrew: 'Kaf',
      hebrewLetter: 'כ',
      gematria: 20,
      address: '0xbaFF14f07aD84C72A56d60a9231CBfdc30d2f8fE',
      bip44Path: "m/44'/60'/0'/0/11",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Numeraire',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 12,
      hebrew: 'Lamed',
      hebrewLetter: 'ל',
      gematria: 30,
      address: '0x52eCF45F2C09f6a75E04425E3F5C9940E3d85Fe6',
      bip44Path: "m/44'/60'/0'/0/12",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Executioner',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 13,
      hebrew: 'Mem',
      hebrewLetter: 'מ',
      gematria: 40,
      address: '0xDA3F760520198848E5cc959FA90a11836c9852D3',
      bip44Path: "m/44'/60'/0'/0/13",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Reaper',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 14,
      hebrew: 'Nun',
      hebrewLetter: 'נ',
      gematria: 50,
      address: '0xec60716877C617430408317326462a937db61558',
      bip44Path: "m/44'/60'/0'/0/14",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Shadowguard',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 15,
      hebrew: 'Samekh',
      hebrewLetter: 'ס',
      gematria: 60,
      address: '0x34f3b5C2dc6903D3BF905333636fB3E8856B875d',
      bip44Path: "m/44'/60'/0'/0/15",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Ashen Kingsguard',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 16,
      hebrew: 'Ayin',
      hebrewLetter: 'ע',
      gematria: 70,
      address: '0x00f82d9aA3Cfd93CaD26923507E9B9185afDfD61',
      bip44Path: "m/44'/60'/0'/0/16",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Clockwork Marine',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 17,
      hebrew: 'Pe',
      hebrewLetter: 'פ',
      gematria: 80,
      address: '0x20EA9de2492Ce383aF0A1F201918123D722840aF',
      bip44Path: "m/44'/60'/0'/0/17",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Origin Legion',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 18,
      hebrew: 'Tsadi',
      hebrewLetter: 'צ',
      gematria: 90,
      address: '0xD0Ebeb2C04fA8662E182F0e604a92ad4e79d2be7',
      bip44Path: "m/44'/60'/0'/0/18",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Rare Legion',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 19,
      hebrew: 'Qof',
      hebrewLetter: 'ק',
      gematria: 100,
      address: '0xb681953fd702954eb1566E99b6f73f807a84d591',
      bip44Path: "m/44'/60'/0'/0/19",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Legendary Legion',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 20,
      hebrew: 'Resh',
      hebrewLetter: 'ר',
      gematria: 200,
      address: '0x01573bB86357ceaC67c5d5aB8eA498B55F96405C',
      bip44Path: "m/44'/60'/0'/0/20",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Genesis All-Class',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 21,
      hebrew: 'Shin',
      hebrewLetter: 'ש',
      gematria: 300,
      address: '0x8dbcc7dA0B1FBfd797d4c283878578198d751E29',
      bip44Path: "m/44'/60'/0'/0/21",
      isRegistered: true, // All 22 guardians registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Special Legion',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
    {
      path: 22,
      hebrew: 'Tav',
      hebrewLetter: 'ת',
      gematria: 400,
      address: '0x66C218cbdfA8888364F646b57E9443f726788Ba0',
      bip44Path: "m/44'/60'/0'/0/22",
      isRegistered: true, // Path 22 registered per PATH_22_REGISTRATION_COMPLETE.md
      bridgeworldMapping: 'Seal Legion',
      questMultiplier: 419,
      harvesterBoost: 369,
    },
  ],

  covenantAddresses: [
    {
      address: '0x3bba654a3816a228284e3e0401cff4ea6dfc5cea',
      chain: 'ethereum',
      chainId: '1',
      name: 'Covenant Address #1 - Ethereum Mainnet',
      official: true,
      immutable: true,
    },
    {
      address: '0x0c4e50157a6e82f5330b721544ce440cb0c6768f',
      chain: 'polygon',
      chainId: '137',
      name: 'Covenant Address #2 - Polygon (MATIC)',
      official: true,
      immutable: true,
    },
    {
      address: '0x3df07977140ad97465075129c37aec7237d74415',
      chain: 'arbitrum',
      chainId: '42161',
      name: 'Covenant Address #3 - Arbitrum',
      official: true,
      immutable: true,
    },
  ],

  gameMechanics: {
    questMultipliersActive: true,
    harvesterBoostsActive: true,
    guardiansRegistered: 22,
    totalGuardians: 22,
  },

  bridgeworldContracts: {
    magicToken: '0x539bdE0d7Dbd336b79148AA742883198BBF60342',
    legionsContract: '0x658365026D06F00965B5bb570727100E821e6508',
    legionsGenesis: '0xE83c0200E93Cb1496054e387BDdaE590C07f0194',
    treasuresContract: '0xEBba467eCB6b21239178033189CeAE27CA12EaDf',
  },
};

/**
 * Get guardian by path number
 */
export function getGuardianByPath(path: number): Guardian | undefined {
  return COVENANT_DATA.guardians.find(g => g.path === path);
}

/**
 * Get guardian by address
 */
export function getGuardianByAddress(address: string): Guardian | undefined {
  const normalized = address.toLowerCase();
  return COVENANT_DATA.guardians.find(
    g => g.address.toLowerCase() === normalized
  );
}

/**
 * Get all registered guardians
 */
export function getRegisteredGuardians(): Guardian[] {
  return COVENANT_DATA.guardians.filter(g => g.isRegistered);
}

/**
 * Check if address is a covenant guardian
 */
export function isCovenantGuardian(address: string): boolean {
  return getGuardianByAddress(address) !== undefined;
}

/**
 * Get covenant address by chain
 */
export function getCovenantAddressByChain(
  chain: 'ethereum' | 'polygon' | 'arbitrum'
): CovenantAddress | undefined {
  return COVENANT_DATA.covenantAddresses.find(addr => addr.chain === chain);
}

/**
 * Verify if address is official covenant address
 */
export function isOfficialCovenantAddress(address: string): boolean {
  const normalized = address.toLowerCase();
  return COVENANT_DATA.covenantAddresses.some(
    addr => addr.address.toLowerCase() === normalized && addr.official
  );
}
