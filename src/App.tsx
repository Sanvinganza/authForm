import React, { useEffect, useState } from 'react';
import { SignupForm } from './componets/SignUpForm';
import './App.css';
import { Profile } from './componets/Profile';
import { useCookies } from 'react-cookie';
import { IProfileData } from './componets/Profile';

// interface IProfileAuthUser {
//   date: {
//     tokenType?: string;
//     espiresAt?: string;
//     accessToken?: string;
//     refreshToken?: string;
//   },
// };

export default () => {
  const [state, setState] = useState<IProfileData>();
  const [cookies] = useCookies(['data']);

  async function GET() {
    try {
      const response = await fetch('https://tager.dev.ozitag.com/api/tager/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies['data'].accessToken}`
        }
      });

      if (response.ok) {
        let responseJson = await response.json()
        setState(responseJson.data);
      }
      else alert('Email or password entered incorrectly ')
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!cookies.data) {
      setState(undefined);
    } else {
      GET();
    }
  }, [cookies]);

  return (
    <div className="App">
      {!state?<SignupForm /> : 
      <Profile email={state?.email} name={state?.name} />}
    </div>
  );
}