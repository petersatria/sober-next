import ReactPlayer from 'react-player';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.DEV_URL
        : process.env.NEXT_PUBLIC_CLIENT_HOST;

function Video() {
    return (
        <div className="tw-mt-16 tw-mb-10 tw-flex tw-flex-wrap tw-justify-center tw-gap-10 tw-px-5 sm:tw-mt-20 sm:tw-gap-x-8 md:tw-flex-nowrap xl:tw-my-24">
            <div className="tw-aspect-video  tw-w-full tw-self-start xl:tw-h-[360px] xl:tw-w-[640px]">
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=sqt0k-A6ZT4?origin=${host}`}
                    playing
                    controls
                    loop
                    muted
                    width="100%"
                    height="100%"
                    style={{
                        position: 'relative',
                        display: 'block',
                    }}
                />
            </div>

            <figure className=" tw-self-end tw-text-center md:tw-w-96 xl:tw-w-1/3">
                <blockquote className="tw-text-md xl:tw-text-xl xl:tw-leading-10 xl:tw-tracking-wide">
                    <span className="tw-text-3xl tw-text-soberred">"</span>{' '}
                    <span className="tw-text-soberred">Fashion</span> is not something
                    that exists in <span className="tw-text-soberred">dresses</span> only.
                    Fashion is in the sky, in the street. Fashion has to do with{' '}
                    <span className="tw-text-soberred">ideas</span>, the way we{' '}
                    <span className="tw-text-soberred">live</span>, what is happening{' '}
                    <span className="tw-text-3xl tw-text-soberred ">"</span>
                </blockquote>
                <figcaption className="tw-font-semibold tw-text-soberred">
                    —Coco Chanel
                </figcaption>
            </figure>
        </div>
    );
}

export default Video;
