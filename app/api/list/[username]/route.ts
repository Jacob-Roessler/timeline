import { NextResponse } from 'next/server';

async function fetchData(username: string, url: string, data: object[]) {
  try {
    let req = await fetch(url, {
      method: 'get',
      headers: new Headers({
        Authorization: process.env.MAL_TOKEN!,
        'Content-Type': 'application/json',
      }),
      next: { revalidate: 360 },
    });
    let response = await req.json();
    data = [...data, ...response.data];
    if (response?.paging?.next) {
      return fetchData(username, response.paging.next, [...data]);
    } else {
      return data;
    }
  } catch (e) {
    return [];
  }
}

export async function GET(request: Request) {
  const username = request.url.slice(request.url.lastIndexOf('/') + 1);
  let data: Object[] = await fetchData(
    username,
    `https://api.myanimelist.net/v2/users/${username}/animelist?fields=list_status{priority,num_times_rewatched,rewatch_value,tags,comments},start_date,end_date,media_type,num_episodes&limit=1000&nsfw=true`,
    []
  );

  return NextResponse.json(data);
}
