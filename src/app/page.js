import * as React from 'react';
import Image from "next/image";
import styles from "./page.module.css";

import { FORM_TYPES } from '../../formTypes';
import { Login } from './Login';

export default function LoginPage({ searchParams }) {
  const { magicLink, passwordRecovery } = React.use(searchParams);
  const wantsMagicLink = magicLink === 'yes';
  const isPasswordRecovery = passwordRecovery === 'yes';

  let formType = FORM_TYPES.PASSWORD_LOGIN;

  if (wantsMagicLink) {
    formType = FORM_TYPES.MAGIC_LINK;
  } else if (isPasswordRecovery) {
    formType = FORM_TYPES.PASSWORD_RECOVERY;
  }
  return (
    <Login formType={formType} />
  );
}
