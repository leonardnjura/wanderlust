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
    <section className="my-page">
      <div className="my-card">
        <img
          src={avatar}
          alt="card__image"
          className="max-w-full h-auto rounded-md mx-auto shadow-lg"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {firstName}
            {lastName}
          </div>
          <p className="">{notes}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {hashtags?.map((tag, idx) => (
            <span key={idx} className="my-popsicle">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserCard;
