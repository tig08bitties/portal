import { NextRequest, NextResponse } from 'next/server';
import { WaybackSearch } from '@/lib/wayback-search';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'magic';

  try {
    const searcher = new WaybackSearch();
    let results;

    switch (type) {
      case 'magic':
        results = await searcher.searchMagicGameCode();
        break;
      case 'dnd':
        results = await searcher.searchDnDGameCode();
        break;
      case 'diablo2':
        results = await searcher.searchDiablo2Mechanics();
        break;
      default:
        results = await searcher.searchMagicGameCode();
    }

    return NextResponse.json({
      success: true,
      type,
      results,
      message: 'Searching Wayback Machine for classic game code...',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        results: [],
      },
      { status: 500 }
    );
  }
}
