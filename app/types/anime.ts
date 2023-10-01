export type anime = {
  list_status: {
    status: string;
    score: number;
    num_episodes_watched: number;
    num_times_rewatched: 0;
    priority: number;
    rewatch_value: number;
    tags: [];
    updated_at: string;
  };
  node: {
    id: number;
    main_picture: {
      medium: string;
      large: string;
    };
    media_type: string;
    num_episodes: number;
    start_date: string;
    end_date: string;
    title: string;
  };
};
