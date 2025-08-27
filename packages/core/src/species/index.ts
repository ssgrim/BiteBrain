import largemouthData from './largemouth.json';

export interface SpeciesData {
  name: string;
  spawnTempMin: number;
  spawnTempMax: number;
  seasonalNotes: Record<string, string>;
  colorRules: Record<string, string[]>;
}

export const speciesData: Record<string, SpeciesData> = {
  largemouth: largemouthData as SpeciesData,
};

export default speciesData;
