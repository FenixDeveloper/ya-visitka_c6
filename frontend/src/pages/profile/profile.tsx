import { useContext, useEffect, useState } from 'react';
import { ProfileForm } from '../../components/profileForm/profileForm';

import { getFile, getProfile } from '../../utils/api';
import { AppContext } from '../../utils/AppContext';
import { IProfileInfo } from '../../utils/types';

export const Profile = () => {

  const { state, dispatch } = useContext(AppContext);
  const user: any = state.data;

  const [userId, setUserId] = useState<string>('');
  const [profileInfo, setProfile] = useState<IProfileInfo>();


  const [avatar, setAvatar] = useState<any>();

  useEffect(() => {
    if (user) {
      setUserId(user.user._id)
      const getUserProfile = async () => {
        getProfile(user.user._id).then(async userInfo => {
          if(userInfo.profile.photo) {
            await getFile(userInfo.profile.photo).then(imageBlob => setAvatar(URL.createObjectURL(imageBlob)))
          }

          setProfile({ "profile": userInfo.profile, "info": userInfo.info })
        })
      }
      getUserProfile()
    }

  }, [user])

  if (!profileInfo){
    return <></>
  }

    return (
      <ProfileForm
        userId={userId}
        profile={profileInfo?.profile}
        info={profileInfo?.info}
        avatar={avatar}
      />
    )

};
