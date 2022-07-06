import Image from 'next/image';
import { IUserData } from '../../../data/types';

const UserCard: React.FC<IUserData> = ({
  hashtags,
  email,
  firstName,
  lastName,
  notes,
  avatar,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-r from-slate-50 to-slate-50">
      <Image
        src={avatar}
        alt="card__image"
        width={256 * 1.5}
        height={235 * 1.5}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {firstName}
          {lastName}
        </div>
        <p className="text-gray-700 text-base">
          {notes} A gente precisa de {email?.split('@')[0]}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {hashtags?.map((tag, idx) => (
          <span
            key={idx}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
