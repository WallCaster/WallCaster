import { Post, ApiName } from '../types/post';
import { formatTwitterToHtml } from '../utils/formatHelper';
import MdiTwitter from './icons/MdiTwitter';

export const PostCard = ({ post, className }: { post: Post; className?: string }) => {
  if (post.api === ApiName.TWITTER) {
    if (post.content.images?.length === 0) return <TwitterPostCard post={post} className={className} />;
    else if (post.content.images != undefined) return <TwitterPostWithImagesCard post={post} className={className} />;
  }

  return <p>Social network not supported yet ({post.api})</p>;
};

const TwitterPostCard = ({ post, className }: { post: Post; className?: string }) => {
  let authorImage = post.author.image;
  if (authorImage === undefined) authorImage = 'https://i.pravatar.cc/300';

  const time: string = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date(post.date));
  const date: string = new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(post.date),
  );

  return (
    <div
      className={`flex flex-col bg-white text-black p-7 shadow-xl gap-4 overflow-hidden relative ${className}`}
      style={{ maxHeight: '90vh', maxWidth: '90vw' }}
    >
      <MdiTwitter className='h-8 w-8 text-blue-500 absolute top-7 right-7' />
      <div className='flex gap-4'>
        <div className='h-12 w-12 shrink-0 rounded-full overflow-hidden bg-amber-200'>
          <img src={authorImage} alt='avatar' className='' />
        </div>
        <div className='flex flex-col justify-center'>
          <p className='font-bold leading-4'>{post.author.name}</p>
          <p className='text-gray-600'>{post.author.username}</p>
        </div>
      </div>
      <div className='flex flex-col gap-4 h-full'>
        <p
          className='text-2xl whitespace-pre-wrap'
          dangerouslySetInnerHTML={{ __html: formatTwitterToHtml(post.content.text) }}
        ></p>
        <div className='text-gray-600 text-lg'>{time + ' · ' + date}</div>
      </div>
    </div>
  );
};

const TwitterPostWithImagesCard = ({ post, className }: { post: Post; className?: string }) => {
  let authorImage = post.author.image;
  if (authorImage === undefined) authorImage = 'https://i.pravatar.cc/300';

  const time: string = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date(post.date));
  const date: string = new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(post.date),
  );

  let images = post.content.images!;

  return (
    <div
      className={`flex bg-white text-black shadow-xl gap-4 overflow-hidden relative ${className}`}
      style={{ height: '90vh', width: '90vw' }}
    >
      <MdiTwitter className='h-16 w-17 text-blue-500 absolute top-0 bg-white p-4 right-0 rounded-bl-2xl' />
      <div className='flex flex-col gap-4 p-7 max-w-[40rem]'>
        <div className='flex gap-4 items-center h-fit '>
          <div className='h-12 w-12 shrink-0 rounded-full overflow-hidden bg-amber-200'>
            <img src={authorImage} alt='avatar' className='' />
          </div>
          <div className='flex flex-col justify-center'>
            <p className='font-bold leading-4'>{post.author.name}</p>
            <p className='text-gray-600'>{post.author.username}</p>
          </div>
        </div>
        <p
          className='text-2xl whitespace-pre-wrap'
          dangerouslySetInnerHTML={{ __html: formatTwitterToHtml(post.content.text) }}
        ></p>
        <div className='m-auto shrink'></div>
        <div className='text-gray-600 text-lg shrink-0'>{time + ' · ' + date}</div>
      </div>
      <div className={`grow grid justify-center grid-cols-2 overflow-hidden m-5 ml-0 rounded-lg`}>
        {images.map((image, index) => {
          let className = ``;
          if (images.length === 1) className = `col-span-2 row-span-2`;
          if (images.length === 2) className = `row-span-2`;
          if (images.length === 3 && index === 2) className = `col-span-2`;
          return (
            <img
              key={index}
              src={image}
              alt={`image ${index + 1}`}
              className={`object-cover h-full w-full ${className}`}
            />
          );
        })}
      </div>
    </div>
  );
};
