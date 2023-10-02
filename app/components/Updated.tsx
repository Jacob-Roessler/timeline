import { useState, useEffect } from 'react';
import { anime } from '../types/anime';

export default function Updated({ animeList }: { animeList: anime[] }) {
  const [filterType, setFilterType] = useState({ watching: true, on_hold: true });
  const [search, setSearch] = useState('');

  const color_codes = {
    watching: 'text-green-500',
    completed: 'text-blue-500',
    plan_to_watch: 'text-slate-500',
    on_hold: 'text-yellow-500',
    dropped: 'text-red-500',
  };

  const handleChange = (event: { target: { checked: boolean; value: string } }) => {
    console.log(filterType);
    if (event.target.checked) {
      setFilterType({ ...filterType, [event.target.value]: true });
    } else {
      setFilterType({ ...filterType, [event.target.value]: false });
    }
  };

  return (
    <div>
      <div className="p-2 bg-slate-800 mb-4">
        Filter:{' '}
        <input
          className="bg-slate-600 outline-none pl-2 text-xl"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(search);
          }}
        ></input>
        <div className="flex flex-wrap gap-2">
          <span className="p-1 text-green-500">
            watching
            <input
              defaultChecked={true}
              type="checkbox"
              name="watching"
              value="watching"
              onChange={handleChange}
              className="mx-2"
            />
          </span>
          <span className="p-1 text-yellow-500">
            on hold
            <input
              defaultChecked={true}
              type="checkbox"
              name="on_hold"
              value="on_hold"
              onChange={handleChange}
              className="mx-2"
            />
          </span>
          <span className="p-1 text-blue-500">
            completed
            <input
              type="checkbox"
              name="completed"
              value="completed"
              onChange={handleChange}
              className="mx-2"
            />
          </span>
          <span className="p-1 text-red-500">
            dropped
            <input
              type="checkbox"
              name="dropped"
              value="dropped"
              onChange={handleChange}
              className="mx-2"
            />
          </span>
          <span className="p-1 text-slate-500">
            plan to watch
            <input
              type="checkbox"
              name="plan_to_watch"
              value="plan_to_watch"
              onChange={handleChange}
              className="mx-2"
            />
          </span>
        </div>
      </div>
      <div className="flex flex-wrap">
        {animeList
          .filter(
            (anime) =>
              anime.node.title.toLowerCase().includes(search) &&
              filterType[anime.list_status.status as keyof typeof filterType]
          )
          .sort(
            (a, b) =>
              new Date(b.list_status.updated_at).getTime() -
              new Date(a.list_status.updated_at).getTime()
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
                    loading="lazy"
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
