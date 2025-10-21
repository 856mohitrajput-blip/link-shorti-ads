import { NextResponse } from 'next/server';
import connectDB from '@/dbConfig'; 
import Links from '@/models/Links';

export async function POST(request) {
    try {
        await connectDB();

        // Parse JSON body from the incoming request
        const { shortUrl } = await request.json();

        if (!shortUrl) {
            return NextResponse.json({ error: 'Short URL required' }, { status: 400 });
        }

        // 1. Find the link in the database
        const linkDetails = await Links.findOne({ shortUrl });

        if (!linkDetails) {
            return NextResponse.json({ error: 'Link not found' }, { status: 404 });
        }

        // 2. Increment the click count
        const updatedLink = await Links.findOneAndUpdate(
            { shortUrl },
            { $inc: { clicks: 1 } },
            { new: true }
        );

        const userEmail = updatedLink.userEmail;

        // 3. Return the original URL to the client
        return NextResponse.json({ originalUrl: updatedLink.originalUrl, userEmail }, { status: 200 });

    } catch (error) {
        console.error('Error processing get-link-details request:', error); 
        
        // Handle common parsing errors
        if (error.name === 'SyntaxError' || error.message.includes('JSON')) {
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
