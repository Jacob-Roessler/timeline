import { useState, useEffect } from 'react';
import { anime } from '../types/anime';

export default function Updated({ animeList }: { animeList: anime[] }) {
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');

  const color_codes = {
    watching: 'text-green-500',
    completed: 'text-blue-500',
    plan_to_watch: 'text-slate-500',
    on_hold: 'text-yellow-500',
    dropped: 'text-red-500',
  };

  return (
    <div>
      <div className="mb-4">
        Filter:{' '}
        <input
          className="bg-slate-600 outline-none pl-2 text-xl"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(search);
          }}
        ></input>
      </div>
      <div className="flex flex-wrap">
        {animeList
          .sort((a, b) => {
            return new Date(b.list_status.updated_at) - new Date(a.list_status.updated_at);
          })
          .filter(
            (anime) =>
              anime.list_status.status !== 'completed' &&
              anime.node.title.toLowerCase().includes(search)
          )
          .map((anime, index) => {
            return (
              <div
                className={`ml-8 max-w-[321px]  ${
                  color_codes[anime.list_status.status as keyof typeof color_codes]
                }`}
                key={index}
              >
                <a
                  className=""
                  target="blank"
                  href={`https://myanimelist.net/anime/${anime.node.id}`}
                >
                  <img
                    src={anime.node.main_picture.medium}
                    className="w-[225px] h-[321px] hover:opacity-50 "
                  ></img>

                  <div className="relative max-w-[321px] ">
                    <span className="block ">
                      {((anime.list_status.num_episodes_watched / anime.node.num_episodes) * 100)
                        .toFixed(0)
                        .replace('Infinity', '??')}
                      % | {anime.list_status.num_episodes_watched}/
                      {anime.node.num_episodes ? anime.node.num_episodes : '??'}話 |{' '}
                      {anime.list_status.updated_at.slice(0, 10)}
                    </span>
                    <span className="absolute bottom-full break-words bg-slate-700 opacity-90 w-full ">
                      {anime.node.title}
                    </span>
                  </div>
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}
