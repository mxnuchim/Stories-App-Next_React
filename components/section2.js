import Link from 'next/link';
import Image from 'next/image';
import Author from './_child/author';
import Spinner from './_child/spinner';
import Error from './_child/error';
import { storiesData } from '../utils/data';
import { useEffect, useState } from 'react';
import { fetchStories } from '../lib/fetcher';
import { formatDate } from '../lib/helper';

export default function Section2() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchStories();

      setData(response);

      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isError) return <Error></Error>;

  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-4xl py-12 text-center">Latest Posts</h1>

      {/* grid columns */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          {data?.map((value, index) => (
            <Post data={value} key={index}></Post>
          ))}
        </div>
      )}
    </section>
  );
}

function Post({ data }) {
  const {
    title,
    section,
    url,
    multimedia,
    abstract,
    subsection,
    published_date,
  } = data;

  const image = multimedia?.length ? multimedia[0].url : '';
  return (
    <div className="item">
      <div className="images">
        <Link href={url}>
          <a>
            <Image src={image} className="rounded" width={500} height={350} />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link href={url}>
            <a className="text-orange-600 capitalize hover:text-orange-800">
              {section ?? subsection}{' '}
            </a>
          </Link>
          <a className="text-gray-800 hover:text-gray-600">
            - {formatDate(published_date)}
          </a>
        </div>
        <div className="title">
          <Link href={url}>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {title}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">{abstract}</p>
      </div>
    </div>
  );
}
