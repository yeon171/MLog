'use client'

import { useFormState } from 'react-dom';
import { login } from '../actions';
import styles from './login.module.css';

export default function LoginPage() {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <div className={styles.container}>
      <form action={formAction} className={styles.form} noValidate>
        <h1>관리자 로그인</h1>
        <input
          type="text"
          name="adminId"
          placeholder="아이디"
          required
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          required
          autoComplete="off"
        />
        <button type="submit">로그인</button>
        {state?.error && <p className={styles.error}>{state.error}</p>}
      </form>
    </div>
  );
}
