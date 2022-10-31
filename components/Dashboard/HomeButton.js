import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

function MenuButton() {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push('/')}
            className="tw-fixed tw-bottom-5 tw-right-5 tw-z-50 tw-flex tw-h-3 tw-w-3 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-bg-gray-400 tw-p-8 tw-text-gray-100 tw-shadow-lg tw-duration-200 hover:tw-bg-black"
        >
            <FontAwesomeIcon icon={faHouse} />
        </button>
    );
}

export default MenuButton;
