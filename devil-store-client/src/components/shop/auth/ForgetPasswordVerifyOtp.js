import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Container, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { otpVerification } from './fetchApi';


export const ForgetPasswordVerifyOtp = () => {
  const history = useHistory();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await otpVerification(otp);
      setLoading(false);
      if (response.message) {
        history.push('/reset-password/reset-password');
      }
      else {
        setError(response.error);
      }
    } catch (err) {
      setError(err);
    }
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={verifyOtp}>
        <Container>
          <div className='d-flex justify-content-center' style={{ marginTop: "150px" }}>
            <Card className='shadow-lg' style={{ width: '30rem', border: 'none' }}>
              <h2 className='d-flex justify-content-center text-black text-success mt-4 mb-4'> OTP Verification   </h2>
              <Card.Body>
                <Card.Title>Enter OTP : </Card.Title>
                <Form.Control className='d-flex justify-content-center'
                  type="text"
                  value={otp}
                  maxLength={6}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <br />
                <Button className='bg-black' variant="success" style={{ width: "100%" }} type='submit'>Verify OTP</Button>
                {error && <p className="text-danger mt-3">{error}</p>}
              </Card.Body>
            </Card>
          </div>
        </Container>
      </form>

    </>
  )
}
