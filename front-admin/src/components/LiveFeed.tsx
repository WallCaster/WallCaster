import type { FilterData, Post } from '../types/post';
import CacheCard from './CacheCard';
const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
export function LiveFeed({
  trash,
  trashDelete,
  cache,
  cacheDelete,
}: {
  trash: (Post & FilterData)[];
  trashDelete: (id: string) => void;
  cache: (Post & FilterData)[];
  cacheDelete: (id: string) => void;
}) {
  return (
    <div className='bg-white h-[60vh]'>
      <div className='grid grid-cols-2'>
        <div>
          <h3 className='text-lg leading-6 flex items-center justify-center font-medium text-gray-900'>Queue</h3>
          <div className='flex flex-col gap-2 max-h-80 overflow-y-auto'>
            <div className='inline-block min-w-full py-2 align-middle'>
              <div className='shadow-sm ring-1 ring-black ring-opacity-5'>
                <table className='min-w-full border-separate' style={{ borderSpacing: 0 }}>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8'
                      >
                        Name
                      </th>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell'
                      >
                        Title
                      </th>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell'
                      >
                        Email
                      </th>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter'
                      >
                        Role
                      </th>
                      <th
                        scope='col'
                        className='sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8'
                      >
                        <span className='sr-only'>Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white'>
                    {people.map((person, personIdx) => (
                      <tr key={person.email}>
                        <td
                          className={classNames(
                            personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
                          )}
                        >
                          {person.name}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell',
                          )}
                        >
                          {person.title}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell',
                          )}
                        >
                          {person.email}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
                          )}
                        >
                          {person.role}
                        </td>
                        <td
                          className={classNames(
                            personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                            'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8',
                          )}
                        >
                          <a href='#' className='text-indigo-600 hover:text-indigo-900'>
                            Edit<span className='sr-only'>, {person.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* {cache.map((post) => (
              <CacheCard key={post.id} post={post} cacheDelete={cacheDelete} />
            ))} */}
          </div>
        </div>
        <div>
          <h3 className='text-lg leading-6 flex items-center justify-center font-medium text-gray-900'>Trash</h3>
          <div className='flex flex-col gap-2 max-h-80 overflow-y-auto'>
            {trash.map((post) => (
              <CacheCard key={post.id} post={post} cacheDelete={trashDelete} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
