import { NextResponse } from 'next/server';
import Statistics from '@/models/Statistics';
import Withdrawal from '@/models/Withdrawal';
import connectDB from '@/dbConfig';

const RATES_DATA = [
    { "country": "United States", "rate_per_1000_views": 22.00 },
    { "country": "United Kingdom", "rate_per_1000_views": 21.00 },
    { "country": "Germany", "rate_per_1000_views": 20.00 },
    { "country": "Australia", "rate_per_1000_views": 18.00 },
    { "country": "Canada", "rate_per_1000_views": 17.00 },
    { "country": "France", "rate_per_1000_views": 16.00 },
    { "country": "Sweden", "rate_per_1000_views": 15.00 },
    { "country": "Netherlands", "rate_per_1000_views": 14.00 },
    { "country": "India", "rate_per_1000_views": 10.00 },
    { "country": "Rest of World", "rate_per_1000_views": 5.00 }
];

export async function POST(request) {
    try {
        await connectDB();

        const { userEmail, location = 'Rest of World', is_proper_view = false } = await request.json();

        let statistics = await Statistics.findOne({ userEmail });

        if (!statistics) {
            statistics = await Statistics.create({ userEmail });
        }

        const locationKey = location.split('/')[0] || 'Rest of World';
        const rateEntry = RATES_DATA.find(rate => rate.country.includes(locationKey)) || RATES_DATA.find(rate => rate.country === 'Rest of World');

        const cpm = rateEntry.rate_per_1000_views;

        statistics.totalImpressions += 1;

        if (is_proper_view) {
            statistics.totalProperViews += 1;
            const earnings = cpm / 1000;
            statistics.totalEarnings += earnings;

            // Calculate average CPM based on total earnings and proper views
            statistics.averageCPM = statistics.totalProperViews > 0 ?
                (statistics.totalEarnings / statistics.totalProperViews) * 1000 : 0;

            // Also update available balance in Withdrawal model
            let withdrawal = await Withdrawal.findOne({ userEmail });
            if (!withdrawal) {
                withdrawal = await Withdrawal.create({ userEmail });
            }
            withdrawal.availableBalance += earnings;
            await withdrawal.save();
        }

        await statistics.save();

        return NextResponse.json({ statistics }, { status: 200 });
    } catch (error) {
        console.error('Error processing update-statistics request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
