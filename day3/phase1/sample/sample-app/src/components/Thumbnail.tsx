import './Thumbnail.css';

type Props = {
    srcUrl: string;
    title: string;
    description: string;
}

export default function Thumbnail({ srcUrl, title, description }: Props) {
    return (
        <div className='thumbnail'>
        <img src={srcUrl}></img>
        <div className='inner'>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
}