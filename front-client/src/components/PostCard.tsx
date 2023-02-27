import { Post, ApiName } from '../types/post';
import MdiTwitter from './icons/MdiTwitter';

export const PostCard = ({ post, className }: { post: Post; className?: string }) => {
  if (post.api === ApiName.TWITTER) return <TwitterPostCard post={post} className={className} />;
  else return <p>Social network not supported yet ({post.api})</p>;
};

const TwitterPostCard = ({ post, className }: { post: Post; className?: string }) => {
  let authorImage = post.author.image;
  if (authorImage === undefined)
    authorImage = 'https://i.pravatar.cc/300';

  const containImage: boolean = post.content.images != undefined

  const time: string = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date(post.date));
  const date: string = new Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(post.date),
  );

  const retweets = Math.round(Math.random() * 10000);
  const quoteTweets = Math.round(Math.random() * 1000);
  const likes = Math.round(Math.random() * 1000);

  return (
    <div className={`flex flex-col bg-white text-black p-7 shadow-xl gap-4 overflow-hidden relative ${className}`}>
      <MdiTwitter className='h-8 w-8 text-blue-500 absolute top-7 right-7' />
      <div className='flex gap-4'>
        <div className='h-12 w-12 shrink-0 rounded-full overflow-hidden'>
          <img src={authorImage} alt='avatar' />
        </div>
        <div className='flex flex-col justify-center'>
          <p className='font-bold leading-4'>{post.author.name}</p>
          <p className='text-gray-600'>{post.author.username}</p>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <p className='text-2xl'>{post.content.text}</p>
        <img src={post.content.images?.at(0)} alt='image' className='square bg-primary rounded' style={{height:"20%", width:"20%"}}/>
        {/* <div className='square bg-primary rounded'>
          <img src={post.content.images?.at(0)?.url} alt='image'/>
        </div> */}
        <div className='text-gray-600 text-lg'>{time + ' · ' + date}</div>
        <div className='flex gap-5 border-t flex-wrap pt-4'>
          <p>
            <span className='font-bold'>{retweets.toLocaleString()}</span> Retweets
          </p>
          <p>
            <span className='font-bold'>{quoteTweets.toLocaleString()}</span> Quote Tweets
          </p>
          <p>
            <span className='font-bold'>{likes.toLocaleString()}</span> Likes
          </p>
        </div>
      </div>
    </div>
  );
};
