import { NextRequest, NextResponse } from 'next/server';
import { endOfWeek, subDays, subYears } from 'date-fns';
import type { Activity } from 'react-github-calendar';
import { ErrorCause, GitHubProperties } from 'types/types';

export const maxDuration = 60;
export const revalidate = 0;
export const dynamic = 'force-dynamic';

const today = new Date();
const endOfLastWeek = endOfWeek(subDays(today, 7));
const startDate = subDays(endOfLastWeek, 182);
const oneYearAgo = subYears(today, 1);

type DataType = { total: { [year: string]: number }; contributions: Activity[] };

export const GET = async (req: NextRequest): Promise<Response> => {
  const searchParams = req.nextUrl.searchParams;
  const year = Number(searchParams.get('year')) || '';
  try {
    const response = await fetch(`https://github-contributions-api.jogruber.de/v4/braswelljr?year=${year}`, {
      method: 'GET',
      mode: 'cors'
    });
    const data: DataType = await response.json();

    const content: GitHubProperties = {
      data: data.contributions.filter((activity) => {
        const activityDate = new Date(activity.date);

        return activityDate <= endOfLastWeek && activityDate >= startDate;
      }),
      total: data.contributions.reduce((total, { date, count }) => (new Date(date) >= oneYearAgo ? total + count : total), 0)
    };

    return NextResponse.json({ message: 'successfully retrieved github contributions', data: content }, { status: 200 });
  } catch (error) {
    let err: ErrorCause;

    if (error instanceof Error) {
      err = error as ErrorCause;
    } else {
      err = new Error('Unknown error', { cause: { error } }) as ErrorCause;
    }
    return NextResponse.json(
      { message: err.cause?.response?.statusText || 'Something happened', data: null },
      { status: err.cause?.response?.status ?? 500 }
    );
  }
};
