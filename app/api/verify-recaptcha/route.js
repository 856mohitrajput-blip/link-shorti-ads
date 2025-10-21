import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { token } = await request.json();
        
        if (!token) {
            return NextResponse.json(
                { success: false, error: 'No reCAPTCHA token provided' },
                { status: 400 }
            );
        }

        // Verify reCAPTCHA with Google
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
        
        const recaptchaResponse = await fetch(verifyUrl, {
            method: 'POST',
        });
        
        const recaptchaData = await recaptchaResponse.json();
        
        if (recaptchaData.success) {
            return NextResponse.json({
                success: true,
                message: 'reCAPTCHA verification successful'
            });
        } else {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'reCAPTCHA verification failed',
                    details: recaptchaData['error-codes'] || []
                },
                { status: 400 }
            );
        }
        
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}