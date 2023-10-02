import { useState, useEffect } from 'react';
import { anime } from '../types/anime';

export default function Timeline({ animeList }: { animeList: anime[] }) {
  const [filterType, setFilterType] = useState('all');

  const color_codes = {
    watching: 'text-green-500',
    completed: 'text-blue-500',
    plan_to_watch: 'text-slate-500',
    on_hold: 'text-yellow-500',
    dropped: 'text-red-500',
  };

  let years: { [key: string]: any[] } = {};
  animeList.forEach((anime: any) => {
    if (filterType == 'all' || anime.node.media_type === filterType) {
      let year = anime.node.start_date;
      if (year) {
        year = year.slice(0, 7);
      }
      years[year as keyof typeof years]
        ? years[year as keyof typeof years].push(anime)
        : (years[year as keyof typeof years] = [anime]);
    }
  });

  return (
    <div>
      Timeline
      <div>
        {Object.keys(years)
          .sort()
          .map((year, index) => {
            return (
              <div key={year + index}>
                {year}
                <div>
                  {years[year].map((anime, index) => {
                    return (
                      <div
                        className={`ml-8 ${
                          color_codes[anime.list_status.status as keyof typeof color_codes]
                        }`}
                        key={index}
                      >
                        <a href={`https://myanimelist.net/anime/${anime.node.id}`}>
                          {(
                            (anime.list_status.num_episodes_watched / anime.node.num_episodes) *
                            100
                          )
                            .toFixed(0)
                            .padStart(3, '-')}
                          % {anime.node.title}
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
