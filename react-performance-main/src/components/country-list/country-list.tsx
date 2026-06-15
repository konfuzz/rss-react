import { memo, useMemo } from 'react';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';

import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = memo(({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {

  const currentYearCountries = useMemo(() => countries.map((country) => {
    const yearData = country.data.filter((d) => d.year === selectedYear);
    return { ...country, data: yearData };
  }), [countries, selectedYear]);

  const filteredCountries = useMemo(() => currentYearCountries
    .filter((c) => {
      const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      }

      const populationA = a.data[0]?.population ?? 0;
      const populationB = b.data[0]?.population ?? 0;

      return sortOrder === 'asc' ? populationA - populationB : populationB - populationA;
    }), [currentYearCountries, searchQuery, selectedRegion, sortField, sortOrder]);

  return (
    <div className={styles.countryList}>
      {filteredCountries.map((country) => (
        <CountryCard
          key={country.iso_code ?? country.id}
          country={country}
          selectedYear={selectedYear}
          selectedColumns={selectedColumns}
        />
      ))}
    </div>
  );
});
