import type { FilterData, Post } from '../types/post';
import { dateToAgo } from '../utils/date';
import FilterIndicator from './FilterIndicator';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
export function LiveFeed({
  trash,
  trashDelete,
  cache,
  cacheDelete,
  restore,
}: {
  trash: (Post & FilterData)[];
  trashDelete: (id: string) => void;
  cache: (Post & FilterData)[];
  cacheDelete: (id: string) => void;
  restore: (id: string) => void;
}) {
  return (
    <div className='bg-white border-y w-full'>
      <div className='grid grid-cols-2 h-full divide-x'>
        <Table title='Queue' posts={cache}></Table>
        <Table title='Trash' posts={trash}></Table>
      </div>
    </div>
  );
}

function Table({
  title,
  posts,
  children,
}: {
  title: string;
  posts: (Post & FilterData)[];
  children?: React.ReactNode;
}) {
  return (
    <div>
      <h3 className='leading-6 flex items-center justify-center text-gray-900 bg-white p-5 font-semibold text-2xl'>
        {title}
      </h3>
      <div className='flex flex-col gap-2 h-[60vh] overflow-y-auto'>
        <div className='inline-block min-w-full align-middle'>
          <table className='min-w-full border-separate bg-blue-500' style={{ borderSpacing: 0 }}>
            <thead className='bg-white'>
              <tr>
                <th
                  scope='col'
                  className='sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-sm font-semibold text-end text-gray-900 backdrop-blur backdrop-filter lg:table-cell'
                >
                  Timestamp
                </th>
                <th
                  scope='col'
                  className='sticky top-0 z-10 border-b hidden sm:table-cell border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8'
                >
                  Author
                </th>
                <th
                  scope='col'
                  className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter'
                >
                  Message
                </th>
                <th
                  scope='col'
                  className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8 text-right'
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className=''>
              {posts.map((post, index) => (
                <tr
                  key={post.id}
                  className='group hover:bg-blue-50 hover:text-blue-700 hover:-translate-x-2 transition-all cursor-pointer bg-white'
                >
                  <td
                    className={classNames(
                      index !== posts.length - 1 ? 'border-b border-gray-200' : '',
                      'whitespace-nowrap px-2 py-3 text-sm hidden text-end lg:table-cell',
                    )}
                  >
                    {dateToAgo(post.filterDate)}
                  </td>
                  <td
                    className={classNames(
                      index !== posts.length - 1 ? 'border-b border-gray-200' : '',
                      'whitespace-nowrap hidden sm:table-cell py-3 pl-3 pr-2 text-sm font-medium sm:pl-6 lg:pl-8',
                    )}
                  >
                    {post.author.name}
                  </td>
                  <td
                    className={classNames(
                      index !== posts.length - 1 ? 'border-b border-gray-200' : '',
                      'pl-2 mr-5 py-3 whitespace-nowrap max-w-xs overflow-hidden text-sm',
                    )}
                  >
                    {post.content.text}
                  </td>

                  <td
                    className={classNames(
                      index !== posts.length - 1 ? 'border-b border-gray-200' : '',
                      'relative whitespace-nowrap py-3 pr-3 pl-2 text-right text-sm font-medium sm:pr-6 lg:pr-8',
                    )}
                  >
                    <div className='flex justify-end items-center gap-1'>
                      <FilterIndicator
                        passed={post.passedSentiment}
                        descPassed='This post is not negative'
                        descRejected='This post is negative'
                      />
                      <FilterIndicator
                        passed={post.passedBanwords}
                        descPassed='This post does not contain banwords'
                        descRejected='This post contains banwords'
                      />
                      <FilterIndicator
                        passed={post.passedImages}
                        descPassed='This post does not contain images'
                        descRejected='This post contains images'
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
