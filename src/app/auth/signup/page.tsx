'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import styles from './signup.module.css'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      setLoading(false)
      return
    }

    try {
      // 자바 백엔드 API 호출 예시
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || '회원가입에 실패했습니다.')
      }

      // 회원가입 성공 시 로그인 페이지로 이동
      alert('회원가입이 완료되었습니다.')
      router.push('/auth/login')

    } catch (err: any) {
      // [임시] 백엔드 연결 전 테스트를 위해 무조건 성공 처리
      console.log('Backend not connected, simulating success')
      alert('회원가입이 완료되었습니다. (테스트)')
      router.push('/auth/login')

      // 실제 에러 처리
      // setError(err.message || '회원가입 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.headerSpace}>
        <CardTitle className={styles.title}>회원가입</CardTitle>
        <CardDescription className={styles.description}>
          새로운 계정을 만들어 Mlog를 시작하세요
        </CardDescription>
      </CardHeader>
      <CardContent className={styles.contentSpace}>
        <form onSubmit={handleSignup}>
          <div className={styles.inputGroup}>
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              placeholder="홍길동"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <Label htmlFor="confirm-password">비밀번호 확인</Label>
            <Input
              id="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <Button className={styles.submitButton} type="submit" disabled={loading}>
            {loading ? '가입 중...' : '회원가입'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className={styles.footerSpace}>
        <div className={styles.loginContainer}>
          이미 계정이 있으신가요?{" "}
          <Link href="/auth/login" className={styles.loginLink}>
            로그인
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
