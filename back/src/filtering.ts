import configManager from './config';
import { FilterData, Post } from './post';

const filterApiURL = 'http://filter-processor:5000/filter';

export async function filterPost(post: Post) {
  const message = {
    post: post,
    filter_config: configManager.config.filter,
  };
  try {
    return await fetch(filterApiURL, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    }).then((res) => res.json() as Promise<FilterData>);
  } catch (e) {
    console.log(e);
    return {
      filterDate: new Date(),
    };
  }
}
