import clsx from 'clsx';
import { UserProfile } from 'features/auth/auth-types';
import './avatar.scss';

interface Props {
  className?: string;
  profile?: UserProfile;
}

export default function Avatar({ className, profile }: Props) {
  return (
    <div
      className={clsx(className, 'avatar')}
      data-name-starts-with={profile?.fullName?.charAt(0)}
    />
  );
}
