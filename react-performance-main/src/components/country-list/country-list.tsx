import { memo, useMemo } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
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

  const virtualizer = useWindowVirtualizer({
    count: filteredCountries.length,
    estimateSize: () => 296,
    overscan: 5,
  });

  return (
    <div className={styles.countryList}>
      <div
        className={styles.virtualContainer}
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const country = filteredCountries[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              className={styles.virtualItem}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <CountryCard
                country={country}
                selectedYear={selectedYear}
                selectedColumns={selectedColumns}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});
